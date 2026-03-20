---
name: zepp-miniapp-builder
description: Build, debug, and evolve version-aware Zepp OS mini-apps, including Device App pages, Workout Extension surfaces, Settings App surfaces, Side Service code, App Service workflows, ZML-based wrappers, easy-storage persistence models, visual logger relay patterns, easy-ble master patterns, sensor-driven apps, and games. Use this skill when a task involves Zepp app.json/runtime compatibility, `data-widget` or workout extension work, `@zeppos/zml` wrapper patterns, `@silver-zepp/easy-storage` persistence choices, `@silver-zepp/vis-log` debugging overlays, `@silver-zepp/easy-ble` BLE-master flows, @zos APIs, hmUI widgets, Zeus CLI workflow, watch/phone data flow, simulator or real-device debugging, or adapting code to legacy, v4, or future API_LEVEL targets.
---

# Zepp Miniapp Builder

## Overview

Use this skill for Zepp OS mini-app work that touches:

- `app.json` and compatibility decisions
- `page/`, `data-widget/`, `app-side/`, `setting/`, or `app-service/`
- `@zeppos/zml` wrappers such as `BaseApp`, `BasePage`, or `BaseSideService`
- `@silver-zepp/easy-storage` models such as `EasyStorageAsync`, `EasyFlashStorage`, or `EasyTSDB`
- `@silver-zepp/vis-log` overlays or `setting` / `app-side` relay debugging
- `@silver-zepp/easy-ble` wrappers around watch-side BLE master flows
- `@zos/*` modules, `hmUI`, widgets, sensors, or device interactions
- Zeus CLI workflow, simulator, preview, bridge, build, and device validation
- i18n, storage, phone-to-watch sync, or version-aware feature selection

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
- When a repo uses `@zeppos/zml`, treat it as a wrapper over normal Zepp surfaces rather than a separate runtime model.
- When a repo uses `@silver-zepp/easy-storage`, treat it as a library over `@zos/fs`; keep storage-model choice, lifecycle flushes, and `device:os.local_storage` requirements explicit.
- When a repo uses `@silver-zepp/vis-log`, treat it as a debug overlay and relay helper, not as an official logging surface; keep `page`, `app-side`, and `setting` wiring explicit.
- When a repo uses `@silver-zepp/easy-ble`, treat it as a wrapper over `@zos/ble`; keep `device:os.ble`, callback-backed queue behavior, and teardown via `quit()` explicit.
- Verify API support on the official page for the specific widget or module, especially for `API_LEVEL 4.0+` additions.
- Validate types and enum names against local `@zeppos/device-types` when available.
- For unstable or future-facing features, confirm docs before coding.
- Treat simulator validation, `zeus build`, and real-device checks as separate layers, not substitutes.
- Do not assume digital crown availability unless the target hardware guarantees it.
- When adding or remapping knowledge from official Zepp docs, update both `references/docs-index.md` and `references/docs-mapping-register.md`.
- If the user says `update`, `refresh`, `sync docs`, or asks to incorporate newly discovered Zepp information, run the skill-maintenance workflow in [references/common/11-skill-maintenance-and-update.md](references/common/11-skill-maintenance-and-update.md).
- If a Zepp task reveals new verified information that changes the skill guidance, update the skill before finishing when the skill repo or installed copy is writable.

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
- [references/common/05-settings-sync-and-storage.md](references/common/05-settings-sync-and-storage.md): storage ownership and phone-to-watch sync patterns
- [references/common/06-testing-validation.md](references/common/06-testing-validation.md): tests, mocks, simulator, device validation
- [references/common/07-i18n-config-and-assets.md](references/common/07-i18n-config-and-assets.md): i18n, locales, icons, assets
- [references/common/08-runtime-gotchas.md](references/common/08-runtime-gotchas.md): official warnings and verified field notes
- [references/common/09-lifecycle-registration-and-state.md](references/common/09-lifecycle-registration-and-state.md): `App`, `Page`, `AppService`, storage lifetimes, and runtime state sharing
- [references/common/10-secondary-widgets-and-shortcuts.md](references/common/10-secondary-widgets-and-shortcuts.md): `SecondaryWidget`, `AppWidget`, widget/card constraints, and cross-surface communication
- [references/common/11-skill-maintenance-and-update.md](references/common/11-skill-maintenance-and-update.md): self-update workflow for docs refresh and newly discovered Zepp information
- [references/common/12-workout-extension.md](references/common/12-workout-extension.md): `data-widget`, `DataWidget`, `SPORT_DATA`, and workout-extension constraints
- [references/common/13-zml-library-patterns.md](references/common/13-zml-library-patterns.md): `@zeppos/zml` wrappers, plugin-composed transport, settings and file-transfer helpers, and doc-quality caveats
- [references/common/14-easy-storage-library-patterns.md](references/common/14-easy-storage-library-patterns.md): `@silver-zepp/easy-storage` model selection, lifecycle guardrails, and source-level cautions
- [references/common/15-visual-logger-library-patterns.md](references/common/15-visual-logger-library-patterns.md): `@silver-zepp/vis-log` overlays, AppSide and AppSettings relay wiring, and placement caveats
- [references/common/16-easy-ble-library-patterns.md](references/common/16-easy-ble-library-patterns.md): `@silver-zepp/easy-ble` master-flow routing, queue contracts, permission hygiene, and backend caveats

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
  Read `04-ui-sensors-interactions`; add `v4/02-v4-ui-and-layout` when API level is `4.x`.
- Sensor or game controls:
  Read `04-ui-sensors-interactions` and `08-runtime-gotchas`.
- Settings, side service, or sync:
  Read `02-device-phone-architecture` and `05-settings-sync-and-storage`.
- Testing or debugging:
  Read `03-dev-build-preview-bridge`, `06-testing-validation`, and `08-runtime-gotchas`.
- i18n or app metadata:
  Read `07-i18n-config-and-assets`.
- App, page, service lifecycle, or state-sharing work:
  Read `01-project-basics`, `02-device-phone-architecture`, and `09-lifecycle-registration-and-state`.
- Companion widgets or shortcut cards:
  Read `10-secondary-widgets-and-shortcuts` before proposing UI or BLE behavior.
- Workout Extension or `data-widget` work:
  Read `12-workout-extension`; add `05-settings-sync-and-storage` when `app-side` sync is involved.
- ZML-based app structure or messaging helpers:
  Read `13-zml-library-patterns`; add `02-device-phone-architecture` when phone or side-service responsibilities matter.
- `@silver-zepp/easy-storage` or storage-model selection work:
  Read `14-easy-storage-library-patterns`; add `05-settings-sync-and-storage` when deciding what should stay in RAM, filesystem storage, or phone-owned sync state.
- `@silver-zepp/vis-log` or on-device debug overlay work:
  Read `15-visual-logger-library-patterns`; add `08-runtime-gotchas` when the real problem is missing `setting/` visibility or relay-based debugging on hardware.
- `@silver-zepp/easy-ble` or watch-side BLE master work:
  Read `16-easy-ble-library-patterns`; add `04-ui-sensors-interactions` for page and BLE context, and `10-secondary-widgets-and-shortcuts` before promising BLE behavior from widget or card surfaces.
- Skill maintenance, docs refresh, or newly discovered Zepp behavior:
  Read `11-skill-maintenance-and-update`, then update the affected reference files, `docs-index.md`, and `docs-mapping-register.md`.
- Legacy support:
  Read `legacy/01-legacy-compatibility` and `legacy/02-migration-notes`.
- Future API level:
  Read `forward/01-forward-compatibility-workflow` before making any feature choice.

## Deliverable Expectations

When using this skill, prefer output that:

- states the detected API profile explicitly
- names any APIs that require `4.0+` or newer support
- distinguishes simulator-only verification from real-device verification
- includes official doc links for risky or version-sensitive behavior
- records assumptions when `app.json` or target hardware details are missing
