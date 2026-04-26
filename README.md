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
- `agents/openai.yaml`: skill metadata used by Codex/OpenAI tooling.
- `maintenance-state.json`: versioned baseline of last-reviewed hashes for sibling source repos.
- `references/00-version-routing.md`: required first read for version detection.
- `references/common/`: shared guidance for architecture, tooling, UI, storage, testing, i18n, and optional library layers.
- `references/v4/`: `4.x`-specific APIs and workflow notes.
- `references/legacy/`: compatibility and migration notes for older Zepp API levels.
- `references/forward/`: workflow for API levels newer than the skill currently knows well.
- `references/docs-index.md`: grouped index of official Zepp docs used by the skill.
- `references/docs-mapping-register.md`: traceability register from official docs into skill files.
- `references/vendor-library-confidence.md`: confidence and approval rules for official vs community npm helper packages.
- `references/common/11-skill-maintenance-and-update.md`: maintenance workflow for doc refreshes and new verified discoveries.
- `scripts/validate-skill.js`: lightweight repository validator for skill metadata, links, and docs mapping consistency.

## Installation

Copy this folder into your Codex skills directory as:

```text
$CODEX_HOME/skills/zepp-miniapp-builder
```

If you keep this repo separately from your app repos, treat it as the source of truth and sync the installed copy from here.

## Validation

Run this before committing skill changes:

```bash
node scripts/validate-skill.js
```

The validator checks:

- `SKILL.md` frontmatter
- `agents/openai.yaml`
- absence of duplicate root `openai.yaml`
- internal Markdown links
- drift between `references/docs-index.md` and `references/docs-mapping-register.md`

## Maintenance

This repo is the only write target for the maintenance workflow. Sibling repos in the workspace are read-only evidence sources even when they are used to decide whether the skill needs an update.

When you use an AI-driven command such as `update docs`, `refresh skill`, or `sync docs`, the expected flow is:

1. Read `maintenance-state.json` to get the last reviewed baseline hashes.
2. Check remote `origin` state for the configured sibling repos and compare it to the recorded baseline.
3. Use local clone state only if remote inspection is unavailable, and record that fallback explicitly.
4. Decide whether those changes affect this skill's routing or guidance.
5. Update only files in this repo.
6. Refresh `maintenance-state.json` after the review is complete so the next machine has the same baseline.

When you add new knowledge from official Zepp docs:

1. Update `references/docs-index.md`.
2. Update `references/docs-mapping-register.md`.
3. Update the specific reference files that depend on the new source.
4. Keep `SKILL.md` focused on routing and lightweight guidance, not full documentation dumps.

For maintenance prompts and the explicit maintenance workflow, see `references/common/11-skill-maintenance-and-update.md`.

## Baseline state

`maintenance-state.json` stores the portable maintenance baseline for this skill. It is intentionally versioned in git so moving to another computer does not reset the review point.

- The current baseline starts from the last known skill update on `main`.
- That baseline is not proof that sibling repos are current until remote `origin` has been checked.
- The first full `update docs` review after cloning or syncing should treat the baseline as historical and only mark repos as verified after review.
- A local-only review is only a fallback and should stay marked as such in `maintenance-state.json`.
- For each tracked sibling repo, store the current default branch together with the reviewed remote commit.

## Notes

- The skill is English-first for better reuse across projects.
- The current baseline is Zepp API `4.x`, but the routing is version-aware.
- Official Zepp docs are the preferred source for capability checks and version-sensitive behavior.
- Optional library-layer guidance is included for repos that already depend on ZML, easy-storage, visual logger, easy-ble, polyglot, or easy-media.
- Official design-system and Figma guidance is included for repos that start from Zepp design specs or official template handoff.
