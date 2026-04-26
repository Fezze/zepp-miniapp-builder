#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const skillPath = path.join(repoRoot, 'SKILL.md');
const docsIndexPath = path.join(repoRoot, 'references', 'docs-index.md');
const docsMappingPath = path.join(repoRoot, 'references', 'docs-mapping-register.md');
const agentsYamlPath = path.join(repoRoot, 'agents', 'openai.yaml');
const duplicateRootYamlPath = path.join(repoRoot, 'openai.yaml');

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function walkFiles(dirPath, predicate, result = []) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, predicate, result);
      continue;
    }

    if (predicate(fullPath)) {
      result.push(fullPath);
    }
  }

  return result;
}

function parseScalar(rawValue) {
  if (rawValue === 'true') {
    return true;
  }

  if (rawValue === 'false') {
    return false;
  }

  if ((rawValue.startsWith('"') && rawValue.endsWith('"')) || (rawValue.startsWith("'") && rawValue.endsWith("'"))) {
    return rawValue.slice(1, -1);
  }

  if (/^-?\d+(?:\.\d+)?$/.test(rawValue)) {
    return Number(rawValue);
  }

  return rawValue;
}

function parseSimpleYaml(filePath) {
  const source = readText(filePath);
  const root = {};
  const stack = [{ indent: -1, value: root }];
  const lines = source.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const indent = line.length - line.trimStart().length;
    if (indent % 2 !== 0) {
      throw new Error(`${path.relative(repoRoot, filePath)}:${index + 1} uses odd indentation; expected multiples of two spaces`);
    }

    const match = trimmed.match(/^([A-Za-z0-9_]+):(.*)$/);
    if (!match) {
      throw new Error(`${path.relative(repoRoot, filePath)}:${index + 1} is not valid simple YAML mapping syntax`);
    }

    const key = match[1];
    const valueText = match[2].trim();

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const current = stack[stack.length - 1];
    if (valueText === '>' || valueText === '|') {
      const blockLines = [];
      const blockIndent = indent + 2;

      for (let nextIndex = index + 1; nextIndex < lines.length; nextIndex += 1) {
        const nextLine = lines[nextIndex];
        const nextTrimmed = nextLine.trim();
        const nextIndent = nextLine.length - nextLine.trimStart().length;

        if (!nextTrimmed) {
          blockLines.push('');
          index = nextIndex;
          continue;
        }

        if (nextIndent < blockIndent) {
          break;
        }

        blockLines.push(nextLine.slice(blockIndent));
        index = nextIndex;
      }

      current.value[key] = valueText === '>'
        ? blockLines.map((blockLine) => blockLine.trim()).join(' ').trim()
        : blockLines.join('\n');
      continue;
    }

    if (valueText === '') {
      current.value[key] = {};
      stack.push({ indent, value: current.value[key] });
      continue;
    }

    current.value[key] = parseScalar(valueText);
  }

  return root;
}

function parseFrontmatter(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`missing file ${path.relative(repoRoot, filePath)}`);
  }

  const source = readText(filePath);
  if (!source.startsWith('---\n') && !source.startsWith('---\r\n')) {
    throw new Error('missing opening frontmatter delimiter ---');
  }

  const lines = source.split(/\r?\n/);
  let closingIndex = -1;

  for (let index = 1; index < lines.length; index += 1) {
    if (lines[index] === '---') {
      closingIndex = index;
      break;
    }
  }

  if (closingIndex === -1) {
    throw new Error('missing closing frontmatter delimiter ---');
  }

  const frontmatter = lines.slice(1, closingIndex).join('\n');
  const tempPath = path.join(repoRoot, '.skill-frontmatter.validation.tmp.yaml');

  try {
    fs.writeFileSync(tempPath, frontmatter, 'utf8');
    return parseSimpleYaml(tempPath);
  } finally {
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
}

function slugifyHeading(heading) {
  return heading
    .replace(/`/g, '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function collectMarkdownAnchors(filePath) {
  const anchors = new Set();
  const source = readText(filePath);

  for (const line of source.split(/\r?\n/)) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (!match) {
      continue;
    }

    anchors.add(slugifyHeading(match[2]));
  }

  return anchors;
}

function normalizeLinkTarget(rawTarget) {
  const target = rawTarget.trim();
  if (!target) {
    return '';
  }

  if (target.startsWith('<') && target.endsWith('>')) {
    return target.slice(1, -1);
  }

  const firstWhitespace = target.search(/\s/);
  return firstWhitespace === -1 ? target : target.slice(0, firstWhitespace);
}

function validateAgentsYaml(errors) {
  if (!fs.existsSync(agentsYamlPath)) {
    errors.push('Missing required metadata file: agents/openai.yaml');
    return;
  }

  let parsed;
  try {
    parsed = parseSimpleYaml(agentsYamlPath);
  } catch (error) {
    errors.push(`Invalid YAML in agents/openai.yaml: ${error.message}`);
    return;
  }

  if (!parsed.interface || typeof parsed.interface !== 'object') {
    errors.push('Invalid YAML in agents/openai.yaml: missing interface mapping');
  }

  if (!parsed.policy || typeof parsed.policy !== 'object') {
    errors.push('Invalid YAML in agents/openai.yaml: missing policy mapping');
  }

  if (typeof parsed.interface?.display_name !== 'string' || !parsed.interface.display_name) {
    errors.push('Invalid YAML in agents/openai.yaml: missing non-empty interface.display_name');
  }

  if (typeof parsed.interface?.short_description !== 'string' || !parsed.interface.short_description) {
    errors.push('Invalid YAML in agents/openai.yaml: missing non-empty interface.short_description');
  }

  if (typeof parsed.interface?.default_prompt !== 'string' || !parsed.interface.default_prompt) {
    errors.push('Invalid YAML in agents/openai.yaml: missing non-empty interface.default_prompt');
  }

  if (typeof parsed.policy?.allow_implicit_invocation !== 'boolean') {
    errors.push('Invalid YAML in agents/openai.yaml: policy.allow_implicit_invocation must be a boolean');
  }

  if (fs.existsSync(duplicateRootYamlPath)) {
    errors.push('Unexpected duplicate metadata file present at openai.yaml; agents/openai.yaml must remain the single source of truth');
  }
}

function validateSkillFrontmatter(errors) {
  if (!fs.existsSync(skillPath)) {
    errors.push('Invalid SKILL.md: missing file');
    return;
  }

  let parsed;
  try {
    parsed = parseFrontmatter(skillPath);
  } catch (error) {
    errors.push(`Invalid SKILL.md: ${error.message}`);
    return;
  }

  if (!Object.prototype.hasOwnProperty.call(parsed, 'name')) {
    errors.push('Invalid SKILL.md: missing required name');
  } else if (parsed.name !== 'zepp-miniapp-builder') {
    errors.push('Invalid SKILL.md: expected name to be zepp-miniapp-builder');
  }

  if (typeof parsed.description !== 'string' || !parsed.description.trim()) {
    errors.push('Invalid SKILL.md: missing non-empty description');
  } else if (parsed.description.length > 1024) {
    errors.push('Invalid SKILL.md: description exceeds 1024 characters');
  }
}

function validateMarkdownLinks(errors) {
  const markdownFiles = walkFiles(repoRoot, (filePath) => filePath.endsWith('.md'));
  const anchorCache = new Map();

  for (const markdownFile of markdownFiles) {
    const source = readText(markdownFile);
    const linkPattern = /!?\[[^\]]*\]\(([^)]+)\)/g;
    let match;

    while ((match = linkPattern.exec(source)) !== null) {
      const normalizedTarget = normalizeLinkTarget(match[1]);
      if (!normalizedTarget) {
        continue;
      }

      if (/^[a-z][a-z0-9+.-]*:/i.test(normalizedTarget)) {
        continue;
      }

      const [rawTargetPath, rawAnchor] = normalizedTarget.split('#');
      const anchor = rawAnchor ? decodeURIComponent(rawAnchor) : '';

      let targetPath;
      if (!rawTargetPath) {
        targetPath = markdownFile;
      } else {
        const decodedPath = decodeURIComponent(rawTargetPath);
        targetPath = path.resolve(path.dirname(markdownFile), decodedPath);
      }

      if (!targetPath.startsWith(repoRoot)) {
        errors.push(`Broken relative link in ${path.relative(repoRoot, markdownFile)}: ${normalizedTarget} points outside the repo`);
        continue;
      }

      if (!fs.existsSync(targetPath)) {
        errors.push(`Broken relative link in ${path.relative(repoRoot, markdownFile)}: ${normalizedTarget} does not exist`);
        continue;
      }

      if (!anchor) {
        continue;
      }

      if (path.extname(targetPath).toLowerCase() !== '.md') {
        continue;
      }

      if (!anchorCache.has(targetPath)) {
        anchorCache.set(targetPath, collectMarkdownAnchors(targetPath));
      }

      if (!anchorCache.get(targetPath).has(anchor)) {
        errors.push(`Broken anchor in ${path.relative(repoRoot, markdownFile)}: ${normalizedTarget} does not match a heading in ${path.relative(repoRoot, targetPath)}`);
      }
    }
  }
}

function extractZeppUrls(filePath) {
  const source = readText(filePath);
  const matches = source.match(/https:\/\/docs\.zepp\.com\/[A-Za-z0-9_./?%#=:-]*/g) || [];
  return new Set(matches);
}

function validateDocsMapping(errors) {
  const docsIndexUrls = extractZeppUrls(docsIndexPath);
  const docsMappingUrls = extractZeppUrls(docsMappingPath);

  for (const url of docsIndexUrls) {
    if (!docsMappingUrls.has(url)) {
      errors.push(`Docs mapping drift: ${url} exists in references/docs-index.md but is missing from references/docs-mapping-register.md`);
    }
  }
}

function main() {
  const errors = [];

  validateSkillFrontmatter(errors);
  validateAgentsYaml(errors);
  validateMarkdownLinks(errors);
  validateDocsMapping(errors);

  if (errors.length > 0) {
    console.error('Skill validation failed:\n');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log('Skill validation passed.');
}

main();