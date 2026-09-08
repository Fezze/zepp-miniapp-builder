# Skill Maintenance and Update

## When to use this file

Load this file when:

- the user says `update`
- the user says `update docs`
- the user says `refresh skill`
- the user asks to refresh the skill from current Zepp docs
- the user asks to sync or extend the skill after documentation research
- the user says `update skill`
- the user explicitly asks to add a newly verified Zepp finding into this skill

## Update triggers

Treat all of these as skill-maintenance triggers:

- `update`
- `update docs`
- `refresh skill`
- `refresh`
- `sync docs`
- `update the skill`
- `add this discovery to the skill`
- `incorporate newly discovered Zepp behavior`

## Default maintenance workflow

1. Read [../../maintenance-state.json](../../maintenance-state.json) and treat it as the portable source of truth for last-reviewed hashes.
2. Review the tracked sibling repos as read-only sources. Do not modify or commit them as part of this workflow.
3. Check remote `origin` state first and compare it to the recorded baseline. Treat remote inspection as the default path.
4. Only if remote inspection is unavailable, use local clone state as a labeled fallback. Do not imply remote parity from a local-only fallback run.
5. Identify the changed or newly relevant Zepp topic since the recorded baseline.
6. Check the official Zepp docs for that topic first.
   Use `https://docs.zepp.com/llms.txt` as a discovery index when useful, then verify behavior against the targeted official page or fetched docs source before writing guidance.
7. Determine whether the information is:
   - official documented behavior
   - verified field note from real behavior or project verification
8. Update the smallest set of affected files:
   - topic-specific reference file under `references/common/`, `references/v4/`, `references/legacy/`, or `references/forward/`
   - [../docs-index.md](../docs-index.md)
   - [../docs-mapping-register.md](../docs-mapping-register.md)
9. Record `Last verified` dates where practical for newly added or updated sources; treat this as mandatory for community-package entries in [../vendor-library-confidence.md](../vendor-library-confidence.md).
10. If the new information changes routing or trigger behavior, update [../../SKILL.md](../../SKILL.md).
11. If the skill is maintained as its own repo, update `README.md` when installation, maintenance, or structure guidance changes.
12. After the review is complete, refresh `maintenance-state.json` so the next `update docs` task starts from the new baseline.

## Maintenance state rules

- `maintenance-state.json` is versioned in this repo so the review baseline travels across machines.
- Seed the initial state from the last known skill-update commit, but do not treat that seed as proof that sibling repos are current.
- Use a status such as `baseline-known-but-not-currently-verified` until a full review has been completed against the tracked repos.
- Prefer tracking both the last reviewed hash and the last hash whose changes were incorporated into this skill when they differ.
- Keep all tracked sibling repos marked as read-only sources.
- Record remote verification separately from local verification. Remote `origin` is the default source of truth; a local-only review is only a fallback.
- Record the default branch used for each tracked sibling repo so future remote reviews compare against the same branch explicitly.

## Normal-work discovery rule

If a Zepp task uncovers new verified information that materially improves the skill:

- do not modify the skill automatically during normal app work
- mention that a follow-up skill update patch can be prepared
- run this maintenance workflow only when the user explicitly asks for `update`, `refresh`, `sync docs`, `update skill`, or equivalent skill-maintenance intent
- when the user opts in, keep the update scoped to the affected topic and add traceability in `docs-mapping-register.md`

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

## Repo ownership rule

- Commit only in the skill source repo.
- Never commit or patch sibling source repos as part of `update docs`.
- Use sibling repos only to gather evidence, hashes, examples, and docs changes.

## Minimum expected output after an update task

After running a maintenance update, report:

- which Zepp docs or verified discoveries were incorporated
- which sibling repos and baseline hashes were reviewed
- whether the run compared against remote `origin`, and if not, why it had to fall back to local clones
- which skill files changed
- whether the installed copy also needs syncing
