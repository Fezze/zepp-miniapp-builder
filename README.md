# Zepp Miniapp Builder

`zepp-miniapp-builder` is a Codex skill for building, debugging, and evolving version-aware Zepp OS mini-apps.

It is designed for work on:

- Device App pages
- Workout Extension surfaces
- Settings App surfaces
- Side Service code
- App Service workflows
- official Zepp design-system and Figma template handoff
- ZML-based wrappers and messaging helpers
- easy-storage persistence helpers and storage-model tradeoffs
- visual logger overlays and relay-based debugging
- easy-ble master-flow helpers for watch-side BLE communication
- polyglot localization workflows and generated translation assets
- easy-media playback and recorder wrappers over @zos/media
- sensor-driven apps and games
- Zepp API compatibility across `legacy`, `v4`, and `forward` profiles

## What the skill does

The skill starts from `app.json`, separates `configVersion` from `runtime.apiVersion`, and routes guidance by effective API level:

- `legacy` for API levels below `4.0`
- `v4` for `4.x`
- `forward` for major versions above `4`

It then loads targeted references for architecture, Zeus CLI workflow, UI/widgets, sensors, storage, testing, i18n, design handoff, optional library layers, and version-specific APIs.

For the actual routing rules and reference map, see [SKILL.md](SKILL.md).

## Repository structure

- `SKILL.md`: skill entrypoint, routing rules, and reference-loading map.
- `references/00-version-routing.md`: required first read for version detection.
- `references/common/`: shared guidance for architecture, tooling, UI, storage, testing, i18n, and optional library layers.
- `references/v4/`: `4.x`-specific APIs and workflow notes.
- `references/legacy/`: compatibility and migration notes for older Zepp API levels.
- `references/forward/`: workflow for API levels newer than the skill currently knows well.
- `references/docs-index.md`: grouped index of official Zepp docs used by the skill.
- `references/docs-mapping-register.md`: traceability register from official docs into skill files.
- `references/common/11-skill-maintenance-and-update.md`: maintenance workflow for doc refreshes and new verified discoveries.

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

For maintenance prompts and self-update behavior, see `references/common/11-skill-maintenance-and-update.md`.

## Notes

- The skill is English-first for better reuse across projects.
- The current baseline is Zepp API `4.x`, but the routing is version-aware.
- Official Zepp docs are the preferred source for capability checks and version-sensitive behavior.
- Optional library-layer guidance is included for repos that already depend on ZML, easy-storage, visual logger, easy-ble, polyglot, or easy-media.
- Official design-system and Figma guidance is included for repos that start from Zepp design specs or official template handoff.
