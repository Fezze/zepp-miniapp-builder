# Skill Maintenance and Update

## When to use this file

Load this file when:

- the user says `update`
- the user asks to refresh the skill from current Zepp docs
- the user asks to sync or extend the skill after documentation research
- a Zepp task reveals new verified information that should become part of the skill

## Update triggers

Treat all of these as skill-maintenance triggers:

- `update`
- `refresh`
- `sync docs`
- `update the skill`
- `add this discovery to the skill`
- `incorporate newly discovered Zepp behavior`

## Default maintenance workflow

1. Identify the changed or newly relevant Zepp topic.
2. Check the official Zepp docs for that topic first.
3. Determine whether the information is:
   - official documented behavior
   - verified field note from real behavior or project verification
4. Update the smallest set of affected files:
   - topic-specific reference file under `references/common/`, `references/v4/`, `references/legacy/`, or `references/forward/`
   - [../docs-index.md](../docs-index.md)
   - [../docs-mapping-register.md](../docs-mapping-register.md)
5. If the new information changes routing or trigger behavior, update [../../SKILL.md](../../SKILL.md).
6. If the skill is maintained as its own repo, update `README.md` when installation, maintenance, or structure guidance changes.

## Auto-update rule during normal work

If a Zepp task uncovers new verified information that materially improves the skill:

- do not leave it only in the answer
- patch the skill before finishing, when the skill repo or installed copy is writable
- keep the update scoped to the affected topic
- add traceability in `docs-mapping-register.md`

Examples:

- a newly confirmed `API_LEVEL` requirement
- a newly documented Zepp CLI workflow change
- an official new widget or layout behavior
- a validated runtime caveat that belongs in `08-runtime-gotchas.md`
- a new App Service or companion-widget limitation

## Source classification

### Official documentation

If the discovery comes from official Zepp docs:

- add the link to `docs-index.md` if it is not already present
- add a mapping entry to `docs-mapping-register.md`
- update the relevant topic file with concise guidance

### Verified field note

If the discovery comes from observed Zepp behavior rather than docs:

- add it only to the most relevant topic file
- label it clearly as a verified field note
- do not add it to `docs-mapping-register.md` unless it also maps to an official doc link

## Decision rules

- Prefer editing an existing reference file over creating a new one.
- Create a new reference file only when a topic becomes large enough to deserve its own routing entry.
- Keep `SKILL.md` lightweight; move detailed material into references.
- Do not duplicate the same guidance across multiple files unless the duplication prevents a likely routing mistake.

## Repo synchronization rule

When both of these exist:

- a source repo for the skill
- an installed global copy under `$CODEX_HOME/skills/`

Treat the source repo as the preferred source of truth.

If you are editing only the installed copy during a task:

- make the necessary fix there if that is the writable target
- then recommend syncing the change back to the source repo

If you are editing the source repo:

- prefer syncing the installed copy after the update so other projects use the refreshed skill

## Minimum expected output after an update task

After running a maintenance update, report:

- which Zepp docs or verified discoveries were incorporated
- which skill files changed
- whether the installed copy also needs syncing
