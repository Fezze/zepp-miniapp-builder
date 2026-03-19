# Zepp Miniapp Builder

`zepp-miniapp-builder` is a Codex skill for building, debugging, and evolving version-aware Zepp OS mini-apps.

It is designed for work on:

- Device App pages
- Workout Extension surfaces
- Settings App surfaces
- Side Service code
- App Service workflows
- ZML-based wrappers and messaging helpers
- easy-storage persistence helpers and storage-model tradeoffs
- sensor-driven apps and games
- Zepp API compatibility across `legacy`, `v4`, and `forward` profiles

## What the skill does

The skill starts from `app.json`, separates `configVersion` from `runtime.apiVersion`, and routes guidance by effective API level:

- `legacy` for API levels below `4.0`
- `v4` for `4.x`
- `forward` for major versions above `4`

It then loads targeted references for architecture, Zeus CLI workflow, UI/widgets, sensors, storage, testing, i18n, App Service, companion widgets, workout extensions, ZML wrappers, easy-storage patterns, and version-specific APIs.

## Repository structure

- `SKILL.md`
  The skill entrypoint and routing rules.
- `agents/openai.yaml`
  UI-facing skill metadata.
- `references/00-version-routing.md`
  Required first read for version detection.
- `references/docs-index.md`
  Grouped index of official Zepp documentation links.
- `references/docs-mapping-register.md`
  Traceability register showing which official Zepp docs were mapped into which skill files.
- `references/common/`
  Reusable guidance shared by all version profiles.
- `references/common/12-workout-extension.md`
  Workout Extension guidance for `data-widget`, `DataWidget`, and `SPORT_DATA`.
- `references/common/13-zml-library-patterns.md`
  Guidance for ZML-based projects that use `@zeppos/zml` wrappers, side-assisted transport, settings hooks, and file-transfer helpers.
- `references/common/14-easy-storage-library-patterns.md`
  Guidance for projects that use `@silver-zepp/easy-storage` for filesystem-backed storage, async persistence, or time-series data.
- `references/v4/`
  `4.x`-specific APIs and workflow notes.
- `references/legacy/`
  Compatibility and migration notes for older Zepp API levels.
- `references/forward/`
  Rules for working with API levels newer than the skill currently knows well.

## Installation

Copy this folder into your Codex skills directory as:

```text
$CODEX_HOME/skills/zepp-miniapp-builder
```

If you keep this repo separately from your app repos, treat it as the source of truth and sync the installed copy from here.

## Maintenance

When you add new knowledge from official Zepp docs:

1. Update `references/docs-index.md`.
2. Update `references/docs-mapping-register.md`.
3. Update the specific reference files that depend on the new source.
4. Keep `SKILL.md` focused on routing and lightweight guidance, not full documentation dumps.

For skill self-maintenance and refresh behavior, see `references/common/11-skill-maintenance-and-update.md`.

## Updating the skill

The skill supports a maintenance workflow for prompts such as:

- `update`
- `refresh`
- `sync docs`
- `add this discovery to the skill`

When triggered, the intended behavior is:

1. review the relevant official Zepp docs first
2. patch the smallest affected reference files
3. update `references/docs-index.md`
4. update `references/docs-mapping-register.md`
5. update `SKILL.md` only if routing or trigger behavior changed

If a normal Zepp task uncovers new verified information that materially improves the skill, the skill should update itself before finishing whenever the skill repo or installed copy is writable.

Library-specific guidance can live in topic references without being added to the official Zepp docs index, as long as the official-doc traceability files stay reserved for actual Zepp documentation.

## Notes

- The skill is English-first for better reuse across projects.
- The current baseline is Zepp API `4.x`, but the routing is version-aware.
- Official Zepp docs are the preferred source for capability checks and version-sensitive behavior.
- ZML guidance is included as an optional library layer for repos that already depend on `@zeppos/zml`.
- easy-storage guidance is included as an optional library layer for repos that already depend on `@silver-zepp/easy-storage`.
