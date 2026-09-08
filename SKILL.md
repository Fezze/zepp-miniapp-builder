---
name: zepp-miniapp-builder
description: >
  Use for Zepp OS mini-app development when working with app.json,
  API_LEVEL compatibility, @zos APIs, storage, crypto, hmUI widgets, Zeus CLI,
  app-side/settings/app-service/data-widget surfaces, store submission,
  or version-aware migration/debugging.
---

# Zepp Miniapp Builder

## Overview

Use this skill for Zepp OS mini-app work that touches:

- `app.json` and compatibility decisions
- `page/`, `data-widget/`, `app-side/`, `setting/`, or `app-service/`
- official Zepp design-system / Figma templates, component libraries, or exported assets
- `@zeppos/zml` wrappers such as `BaseApp`, `BasePage`, or `BaseSideService`
- `@silver-zepp/easy-storage` models such as `EasyStorageAsync`, `EasyFlashStorage`, or `EasyTSDB`
- `@silver-zepp/vis-log` overlays or `setting` / `app-side` relay debugging
- `@silver-zepp/easy-ble` wrappers around watch-side BLE master flows
- `@silver-zepp/polyglot` runtime localization and translation-generation workflow
- `@silver-zepp/easy-media` playback or recording wrappers over `@zos/media`
- official `@zos/storage`, `@zos/share-storage`, and `@zos/crypto` APIs
- `@zos/*` modules, `hmUI`, widgets, sensors, or device interactions
- Zeus CLI workflow, simulator, preview, bridge, build, and device validation
- Zepp Developer Console release, store listing assets, privacy statement, and submission readiness
- i18n, storage, phone-to-watch sync, or version-aware feature selection
- skill-maintenance work that reviews sibling repos and updates only this skill repo

Prefer official Zepp docs for capability checks and use this skill's references as the routing layer.

## Version Routing First

Always start with version routing before proposing implementation details.

1. Open `app.json`.
2. Read `configVersion`.
3. Read `runtime.apiVersion.target`; if missing, fall back to `compatible`, then `minVersion`.
4. Compare API levels numerically as `major.minor`, not as strings.
5. Choose one profile:
   - `legacy` for API level below `4.0`
   - `v4` for `4.x`
   - `forward` for major version above `4`

Key rule:

- `configVersion` controls manifest format and packaging shape.
- `runtime.apiVersion` controls runtime/API compatibility.
- In current docs, it is valid to have `configVersion: "v3"` together with `runtime.apiVersion.target: "4.0"` or `4.2`.

Read [references/00-version-routing.md](references/00-version-routing.md) first on every task.

## Working Rules

- Use Zepp APIs, not browser DOM APIs.
- Prefer explicit widget-based UI through `hmUI.createWidget(...)` or `@zos/ui` helpers.
- If a task involves `@zeppos/zml` or any `@silver-zepp/*` package, read [references/vendor-library-confidence.md](references/vendor-library-confidence.md) before proposing installation, migration, or new dependency usage.
- If the repo already depends on `@zeppos/zml` or a `@silver-zepp/*` package, it is safe to inspect and use that dependency in-place.
- If the repo does not already depend on `@zeppos/zml` or a `@silver-zepp/*` package, do not add it without explicit user approval.
- Always verify the installed package version plus local docs, typings, or bundled source when those files are available.
- When a repo uses `@zeppos/zml`, treat it as a wrapper over normal Zepp surfaces rather than a separate runtime model.
- When a repo uses `@silver-zepp/easy-storage`, treat it as a library over `@zos/fs`; keep storage-model choice, lifecycle flushes, and `device:os.local_storage` requirements explicit.
- When a repo uses `@silver-zepp/vis-log`, treat it as a debug overlay and relay helper, not as an official logging surface; keep `page`, `app-side`, and `setting` wiring explicit.
- When a repo uses `@silver-zepp/easy-ble`, treat it as a wrapper over `@zos/ble`; keep `device:os.ble`, callback-backed queue behavior, and teardown via `quit()` explicit.
- When a repo uses `@silver-zepp/polyglot`, treat it as a combined CLI-plus-runtime localization layer; keep generated asset paths, `device:os.local_storage`, and the no-App-Side limitation explicit.
- When a repo uses `@silver-zepp/easy-media`, treat it as a wrapper over `@zos/media`; keep `3.0+` targeting, full asset paths, page teardown, and source-level API drift explicit.
- For cross-application storage, keep publisher and consumer roles explicit: the provider writes with `ShareLocalStorage` or `ShareTypedStorage` from `@zos/storage`, while another app reads by provider `appId` through read-only classes from `@zos/share-storage`.
- Treat the documented `@zos/crypto` algorithms as `3.0+`; preserve each algorithm's input-size, key, curve, and digest constraints rather than treating the module as a generic Web Crypto replacement.
- When a task starts from official Zepp Figma libraries or templates, treat them as official design-system input; keep screen shape, safe area, text overflow, and accessibility rules explicit instead of copying static mockup coordinates blindly.
- When a task includes a design URL and the environment offers a design connector, MCP server, or similar design-inspection tool, use it for targeted inspection of the relevant page or node before falling back to stored guidance alone.
- Do not block on one specific design tool. If no connector is available, continue with the stored design guidance, exported screenshots, copied measurements, or user-provided details.
- Verify API support on the official page for the specific widget or module, especially for `API_LEVEL 4.0+` additions.
- Validate types and enum names against local `@zeppos/device-types` when available.
- For unstable or future-facing features, confirm docs before coding.
- Treat simulator validation, `zeus build`, and real-device checks as separate layers, not substitutes.
- Do not assume digital crown availability unless the target hardware guarantees it.
- When adding or remapping knowledge from official Zepp docs, update both `references/docs-index.md` and `references/docs-mapping-register.md`.
- If the user explicitly says `update`, `update docs`, `refresh skill`, `refresh`, `sync docs`, `update skill`, or otherwise directly asks to maintain this skill, run the skill-maintenance workflow in [references/common/11-skill-maintenance-and-update.md](references/common/11-skill-maintenance-and-update.md).
- For that workflow, read [maintenance-state.json](maintenance-state.json) before comparing sibling repos so the last reviewed remote hashes are treated as the baseline rather than assuming the skill is already current.
- Default to checking remote `origin` state for sibling repos. Use local clone state only as a clearly labeled fallback when remote inspection is unavailable.
- Treat sibling repos in the workspace as read-only evidence sources during skill maintenance. Update and commit only this `zepp-miniapp-builder` repo.
- If normal Zepp app work reveals new verified information that would improve the skill, mention that a follow-up skill update patch can be prepared, but do not modify the skill unless the user explicitly asks for that maintenance work.

## Reference Map

Load these files directly as needed.

### Core

- [references/00-version-routing.md](references/00-version-routing.md): required first step for every task
- [references/docs-index.md](references/docs-index.md): grouped official documentation index
- [references/docs-mapping-register.md](references/docs-mapping-register.md): traceability register from official Zepp docs into skill files
- [references/common/01-project-basics.md](references/common/01-project-basics.md): manifest, folders, targets, baseline workflow
- [references/common/02-device-phone-architecture.md](references/common/02-device-phone-architecture.md): Device App, Settings App, Side Service, App Service roles
- [references/common/03-dev-build-preview-bridge.md](references/common/03-dev-build-preview-bridge.md): Zeus CLI flow, simulator, preview, bridge, logs, screenshots
- [references/common/04-ui-sensors-interactions.md](references/common/04-ui-sensors-interactions.md): widgets, sensors, gestures, router, media, notifications
- [references/common/05-settings-sync-and-storage.md](references/common/05-settings-sync-and-storage.md): storage ownership, cross-application sharing, crypto, and phone-to-watch sync patterns
- [references/common/06-testing-validation.md](references/common/06-testing-validation.md): tests, mocks, simulator, device validation
- [references/common/07-i18n-config-and-assets.md](references/common/07-i18n-config-and-assets.md): i18n, locales, icons, assets
- [references/common/08-runtime-gotchas.md](references/common/08-runtime-gotchas.md): official warnings and verified field notes
- [references/common/09-lifecycle-registration-and-state.md](references/common/09-lifecycle-registration-and-state.md): `App`, `Page`, `AppService`, storage lifetimes, and runtime state sharing
- [references/common/10-secondary-widgets-and-shortcuts.md](references/common/10-secondary-widgets-and-shortcuts.md): `SecondaryWidget`, `AppWidget`, widget/card constraints, and cross-surface communication
- [references/common/11-skill-maintenance-and-update.md](references/common/11-skill-maintenance-and-update.md): explicit maintenance workflow for docs refresh and newly discovered Zepp information
- [references/common/12-workout-extension.md](references/common/12-workout-extension.md): `data-widget`, `DataWidget`, `SPORT_DATA`, and workout-extension constraints

### Optional Library and Design Layers

- [references/vendor-library-confidence.md](references/vendor-library-confidence.md): official-versus-community library confidence, freshness, and dependency-approval guardrails
- [references/common/13-zml-library-patterns.md](references/common/13-zml-library-patterns.md): `@zeppos/zml` wrappers and transport helpers
- [references/common/14-easy-storage-library-patterns.md](references/common/14-easy-storage-library-patterns.md): `@silver-zepp/easy-storage` model selection and lifecycle guardrails
- [references/common/15-visual-logger-library-patterns.md](references/common/15-visual-logger-library-patterns.md): `@silver-zepp/vis-log` relay logging and overlay patterns
- [references/common/16-easy-ble-library-patterns.md](references/common/16-easy-ble-library-patterns.md): `@silver-zepp/easy-ble` routing, queue contracts, and backend caveats
- [references/common/17-polyglot-library-patterns.md](references/common/17-polyglot-library-patterns.md): `@silver-zepp/polyglot` CLI and runtime localization behavior
- [references/common/18-easy-media-library-patterns.md](references/common/18-easy-media-library-patterns.md): `@silver-zepp/easy-media` playback and recorder wrappers
- [references/common/19-design-system-and-figma-patterns.md](references/common/19-design-system-and-figma-patterns.md): official Zepp design-system and Figma handoff guidance
- [references/common/20-store-release-and-submission.md](references/common/20-store-release-and-submission.md): Zepp Console release fields, store assets, privacy statement, and review workflow
- [references/common/21-ui-widget-catalog-and-methods.md](references/common/21-ui-widget-catalog-and-methods.md): detailed widget families, form controls, layout widgets, and low-level `@zos/ui` methods

### V4 Profile

- [references/v4/01-api-level-4-basics.md](references/v4/01-api-level-4-basics.md): v4 baseline and supported additions
- [references/v4/02-v4-ui-and-layout.md](references/v4/02-v4-ui-and-layout.md): Flex layout, `VIRTUAL_CONTAINER`, getter/setter, inspector, keyboard
- [references/v4/03-v4-debugging-and-performance.md](references/v4/03-v4-debugging-and-performance.md): performance stats, timers, v4 debugging flow

### Legacy Profile

- [references/legacy/01-legacy-compatibility.md](references/legacy/01-legacy-compatibility.md): compatibility guardrails below `4.0`
- [references/legacy/02-migration-notes.md](references/legacy/02-migration-notes.md): migration guidance for older codebases

### Forward Profile

- [references/forward/01-forward-compatibility-workflow.md](references/forward/01-forward-compatibility-workflow.md): procedure for `5.x+` or otherwise newer-than-known API levels

## Common Task Routing

- New mini-app scaffold or repo review:
  Read `00-version-routing`, `01-project-basics`, and `02-device-phone-architecture`.
- UI/widget work:
  Read `04-ui-sensors-interactions`; add `21-ui-widget-catalog-and-methods` for detailed widget or low-level UI API selection; add `v4/02-v4-ui-and-layout` when API level is `4.x`.
- Sensor or game controls:
  Read `04-ui-sensors-interactions` and `08-runtime-gotchas`.
- Settings, side service, or sync:
  Read `02-device-phone-architecture` and `05-settings-sync-and-storage`.
- Testing or debugging:
  Read `03-dev-build-preview-bridge`, `06-testing-validation`, and `08-runtime-gotchas`.
  If the task is mainly visual review, also use a preview screenshot matrix before touching layout code.
- Store release, publish, app-store checklist, or submission readiness:
  Read `20-store-release-and-submission`, then compare the repo against `app.json`, assets, languages, screenshots, privacy text, permissions, and device coverage.
- i18n or app metadata:
  Read `07-i18n-config-and-assets`.
- App, page, service lifecycle, or state-sharing work:
  Read `01-project-basics`, `02-device-phone-architecture`, and `09-lifecycle-registration-and-state`.
- Companion widgets or shortcut cards:
  Read `10-secondary-widgets-and-shortcuts` before proposing UI or BLE behavior.
- Workout Extension or `data-widget` work:
  Read `12-workout-extension`; add `05-settings-sync-and-storage` when `app-side` sync is involved.
- Official watch storage, cross-application sharing, or `@zos/crypto` work:
  Read `05-settings-sync-and-storage`; confirm the effective runtime is `3.0+` before using typed/shared storage or crypto.
- `@zeppos/zml` or any `@silver-zepp/*` dependency decision:
  Read `references/vendor-library-confidence.md` before proposing installation, migration, or new dependency usage.
- ZML-based app structure or messaging helpers:
  Read `13-zml-library-patterns`; add `02-device-phone-architecture` when phone or side-service responsibilities matter.
- `@silver-zepp/easy-storage` or storage-model selection work:
  Read `14-easy-storage-library-patterns`; add `05-settings-sync-and-storage` when deciding what should stay in RAM, filesystem storage, or phone-owned sync state.
- `@silver-zepp/vis-log` or on-device debug overlay work:
  Read `15-visual-logger-library-patterns`; add `08-runtime-gotchas` when the real problem is missing `setting/` visibility or relay-based debugging on hardware.
- `@silver-zepp/easy-ble` or watch-side BLE master work:
  Read `16-easy-ble-library-patterns`; add `04-ui-sensors-interactions` for page and BLE context, and `10-secondary-widgets-and-shortcuts` before promising BLE behavior from widget or card surfaces.
- `@silver-zepp/polyglot`, generated translation assets, or runtime language switching:
  Read `17-polyglot-library-patterns`; add `07-i18n-config-and-assets` for locale and manifest context, and `10-secondary-widgets-and-shortcuts` when translated strings must also work in widget or card surfaces.
- `@silver-zepp/easy-media`, short audio playback, or recorder wrapper work:
  Read `18-easy-media-library-patterns`; add `04-ui-sensors-interactions` for audio context and `08-runtime-gotchas` when speaker availability, media fallback, or device-specific behavior matters.
- Design handoff, official Zepp Figma libraries, or widget/card design review:
  Read `19-design-system-and-figma-patterns`; add `10-secondary-widgets-and-shortcuts` for widget/card surfaces and `07-i18n-config-and-assets` for text, icon, and asset-export rules.
  If a live design connector is available, inspect only the specific design page or node that matters to the task instead of crawling the whole library.
- Skill maintenance, docs refresh, or newly discovered Zepp behavior:
  Read `11-skill-maintenance-and-update` and `maintenance-state.json`, then update the affected reference files, `docs-index.md`, and `docs-mapping-register.md`.
- Legacy support:
  Read `legacy/01-legacy-compatibility` and `legacy/02-migration-notes`.
- Future API level:
  Read `forward/01-forward-compatibility-workflow` before making any feature choice.

## Deliverable Expectations

When using this skill, prefer output that:

- states the detected API profile explicitly
- names any APIs that require `4.0+` or newer support
- distinguishes simulator-only verification from real-device verification
- distinguishes browser preview-harness screenshots from simulator or real-device evidence
- includes official doc links for risky or version-sensitive behavior
- records assumptions when `app.json` or target hardware details are missing
- for `update docs` work, reports which sibling repos were reviewed, what baseline hashes were used, what changed in this skill repo, and whether the installed copy also needs syncing
