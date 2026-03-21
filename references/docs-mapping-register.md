# Zepp Docs Mapping Register

This register tracks how official Zepp documentation has been mapped into the skill.

## Maintenance Rule

Whenever a new official Zepp doc is used to add, revise, or clarify skill guidance:

1. Add or update the link in [docs-index.md](docs-index.md).
2. Add or update the mapping entry in this file.
3. Point the entry to the exact skill reference files that now depend on that source.
4. Keep notes brief and behavior-focused.

This file is for traceability, not for repeating the full content of the documentation.

## Core Platform and Configuration

- `https://docs.zepp.com/docs/intro/`
  Mapped into: [docs-index.md](docs-index.md), [forward/01-forward-compatibility-workflow.md](forward/01-forward-compatibility-workflow.md)
  Notes: platform overview and discovery path for newer-than-known API levels.

- `https://docs.zepp.com/docs/guides/quick-start/`
  Mapped into: [docs-index.md](docs-index.md), [common/01-project-basics.md](common/01-project-basics.md), [common/06-testing-validation.md](common/06-testing-validation.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md)
  Notes: baseline development workflow and non-DOM runtime posture.

- `https://docs.zepp.com/docs/guides/architecture/folder-structure/`
  Mapped into: [docs-index.md](docs-index.md), [common/01-project-basics.md](common/01-project-basics.md), [common/03-dev-build-preview-bridge.md](common/03-dev-build-preview-bridge.md), [common/09-lifecycle-registration-and-state.md](common/09-lifecycle-registration-and-state.md)
  Notes: default file layout such as `setting/index.js`, `app-side/index.js`, and the main project surfaces.

- `https://docs.zepp.com/docs/1.0/guides/framework/device/intro/`
  Mapped into: [docs-index.md](docs-index.md), [common/01-project-basics.md](common/01-project-basics.md), [legacy/01-legacy-compatibility.md](legacy/01-legacy-compatibility.md), [legacy/02-migration-notes.md](legacy/02-migration-notes.md)
  Notes: `1.0`-era global-module model such as `hmUI`, `hmApp`, and `hmBle`.

- `https://docs.zepp.com/docs/1.0/reference/app-json/`
  Mapped into: [docs-index.md](docs-index.md), [common/01-project-basics.md](common/01-project-basics.md), [legacy/01-legacy-compatibility.md](legacy/01-legacy-compatibility.md)
  Notes: older manifest shape and `v2`-era configuration fields.

- `https://docs.zepp.com/docs/reference/app-json/`
  Mapped into: [00-version-routing.md](00-version-routing.md), [docs-index.md](docs-index.md), [common/01-project-basics.md](common/01-project-basics.md), [legacy/01-legacy-compatibility.md](legacy/01-legacy-compatibility.md)
  Notes: `app.vender`, `configVersion`, `runtime.apiVersion`, permissions, targets, target-platform shape keys, and manifest interpretation.

- `https://docs.zepp.com/docs/guides/version-info/new-api/`
  Mapped into: [docs-index.md](docs-index.md), [common/01-project-basics.md](common/01-project-basics.md), [legacy/01-legacy-compatibility.md](legacy/01-legacy-compatibility.md), [legacy/02-migration-notes.md](legacy/02-migration-notes.md)
  Notes: `2.0` API model, ESM module split, and migration framing away from globals.

- `https://docs.zepp.com/docs/v2/guides/framework/device/compatibility/`
  Mapped into: [00-version-routing.md](00-version-routing.md), [docs-index.md](docs-index.md), [v4/01-api-level-4-basics.md](v4/01-api-level-4-basics.md), [legacy/01-legacy-compatibility.md](legacy/01-legacy-compatibility.md), [legacy/02-migration-notes.md](legacy/02-migration-notes.md), [forward/01-forward-compatibility-workflow.md](forward/01-forward-compatibility-workflow.md)
  Notes: API_LEVEL routing and compatibility model.

- `https://docs.zepp.com/docs/v2/guides/version-info/version-choose/`
  Mapped into: [docs-index.md](docs-index.md), [legacy/01-legacy-compatibility.md](legacy/01-legacy-compatibility.md), [legacy/02-migration-notes.md](legacy/02-migration-notes.md)
  Notes: upgrade-versus-compatibility decision support.

- `https://docs.zepp.com/docs/v2/guides/version-info/migration-guide/`
  Mapped into: [docs-index.md](docs-index.md), [legacy/02-migration-notes.md](legacy/02-migration-notes.md), [common/07-i18n-config-and-assets.md](common/07-i18n-config-and-assets.md)
  Notes: migration framing and `gettext -> getText` context.

- `https://docs.zepp.com/docs/guides/best-practice/code-adaptations-for-new-devices/`
  Mapped into: [docs-index.md](docs-index.md), [common/01-project-basics.md](common/01-project-basics.md), [common/03-dev-build-preview-bridge.md](common/03-dev-build-preview-bridge.md)
  Notes: target-key resource folders, per-target asset layout, and official multi-device adaptation examples.

- `https://docs.zepp.com/docs/guides/version-info/new-features/`
  Mapped into: [docs-index.md](docs-index.md), [legacy/01-legacy-compatibility.md](legacy/01-legacy-compatibility.md), [legacy/02-migration-notes.md](legacy/02-migration-notes.md)
  Notes: `2.0` feature wave and the `1.0` to `2.0` compatibility break.

- `https://docs.zepp.com/docs/guides/version-info/new-features-21/`
  Mapped into: [docs-index.md](docs-index.md), [legacy/01-legacy-compatibility.md](legacy/01-legacy-compatibility.md)
  Notes: `2.1` additions such as geolocation, barometer, and time/system info improvements.

- `https://docs.zepp.com/docs/guides/version-info/new-features-30/`
  Mapped into: [docs-index.md](docs-index.md), [common/02-device-phone-architecture.md](common/02-device-phone-architecture.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md), [common/09-lifecycle-registration-and-state.md](common/09-lifecycle-registration-and-state.md), [legacy/01-legacy-compatibility.md](legacy/01-legacy-compatibility.md), [legacy/02-migration-notes.md](legacy/02-migration-notes.md)
  Notes: `3.0` additions such as App Service, Canvas, media, BLE central, file transfer, and system notifications.

- `https://docs.zepp.com/docs/guides/version-info/new-features-35/`
  Mapped into: [docs-index.md](docs-index.md), [legacy/01-legacy-compatibility.md](legacy/01-legacy-compatibility.md), [legacy/02-migration-notes.md](legacy/02-migration-notes.md)
  Notes: `3.5` feature wave including Workout Extension introduction and targeted UI/sensor/BLE improvements.

- `https://docs.zepp.com/docs/guides/version-info/new-features-40/`
  Mapped into: [00-version-routing.md](00-version-routing.md), [docs-index.md](docs-index.md), [v4/01-api-level-4-basics.md](v4/01-api-level-4-basics.md), [v4/02-v4-ui-and-layout.md](v4/02-v4-ui-and-layout.md), [v4/03-v4-debugging-and-performance.md](v4/03-v4-debugging-and-performance.md), [forward/01-forward-compatibility-workflow.md](forward/01-forward-compatibility-workflow.md)
  Notes: baseline `4.0` additions.

- `https://docs.zepp.com/docs/guides/version-info/new-features-42/`
  Mapped into: [00-version-routing.md](00-version-routing.md), [docs-index.md](docs-index.md), [v4/01-api-level-4-basics.md](v4/01-api-level-4-basics.md), [forward/01-forward-compatibility-workflow.md](forward/01-forward-compatibility-workflow.md)
  Notes: post-`4.0` additions within the `v4` profile.

## CLI, Simulator, Preview, and Device Workflow

- `https://docs.zepp.com/docs/guides/tools/cli/overview/`
  Mapped into: [docs-index.md](docs-index.md), [common/01-project-basics.md](common/01-project-basics.md), [common/03-dev-build-preview-bridge.md](common/03-dev-build-preview-bridge.md)
  Notes: CLI baseline and build loop.

- `https://docs.zepp.com/docs/guides/tools/cli/`
  Mapped into: [docs-index.md](docs-index.md), [common/03-dev-build-preview-bridge.md](common/03-dev-build-preview-bridge.md)
  Notes: command families such as `create`, `login`, and config commands.

- `https://docs.zepp.com/docs/guides/tools/simulator/download/`
  Mapped into: [docs-index.md](docs-index.md), [common/03-dev-build-preview-bridge.md](common/03-dev-build-preview-bridge.md)
  Notes: simulator download matrix and current binary availability; docs updated on 2026-03-20 with `2.1.0` builds.

- `https://docs.zepp.com/docs/guides/tools/simulator/dev/`
  Mapped into: [docs-index.md](docs-index.md), [common/03-dev-build-preview-bridge.md](common/03-dev-build-preview-bridge.md), [common/06-testing-validation.md](common/06-testing-validation.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md), [v4/03-v4-debugging-and-performance.md](v4/03-v4-debugging-and-performance.md)
  Notes: simulator debugging, sensor mocking, and no-breakpoint reminder.

- `https://docs.zepp.com/docs/guides/quick-start/simulator-dev/`
  Mapped into: [docs-index.md](docs-index.md), [common/03-dev-build-preview-bridge.md](common/03-dev-build-preview-bridge.md)
  Notes: simulator startup flow.

- `https://docs.zepp.com/docs/guides/quick-start/preview/`
  Mapped into: [docs-index.md](docs-index.md), [common/03-dev-build-preview-bridge.md](common/03-dev-build-preview-bridge.md)
  Notes: QR preview path on a real watch.

- `https://docs.zepp.com/docs/guides/tools/zepp-app/`
  Mapped into: [docs-index.md](docs-index.md), [common/03-dev-build-preview-bridge.md](common/03-dev-build-preview-bridge.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md)
  Notes: developer mode, logs, screenshots, and API-level visibility.

- `https://docs.zepp.com/zh-cn/docs/guides/faq/developer-bridge-mode/`
  Mapped into: [docs-index.md](docs-index.md), [common/03-dev-build-preview-bridge.md](common/03-dev-build-preview-bridge.md)
  Notes: bridge workflow reference.

- `https://docs.zepp.com/docs/v2/guides/tools/cli/release-note/`
  Mapped into: [docs-index.md](docs-index.md), [common/03-dev-build-preview-bridge.md](common/03-dev-build-preview-bridge.md)
  Notes: screenshot behavior in bridge mode.

- `https://docs.zepp.com/docs/reference/related-resources/device-list/`
  Mapped into: [docs-index.md](docs-index.md), [common/03-dev-build-preview-bridge.md](common/03-dev-build-preview-bridge.md), [common/10-secondary-widgets-and-shortcuts.md](common/10-secondary-widgets-and-shortcuts.md)
  Notes: hardware support and device capability checks.

## Architecture, Registration, Services, and Communication

- `https://docs.zepp.com/docs/guides/architecture/arc/`
  Mapped into: [docs-index.md](docs-index.md), [common/02-device-phone-architecture.md](common/02-device-phone-architecture.md), [common/05-settings-sync-and-storage.md](common/05-settings-sync-and-storage.md)
  Notes: phone/watch topology and communication relationships.

- `https://docs.zepp.com/docs/guides/framework/device/app/`
  Mapped into: [docs-index.md](docs-index.md), [common/01-project-basics.md](common/01-project-basics.md), [common/02-device-phone-architecture.md](common/02-device-phone-architecture.md), [common/09-lifecycle-registration-and-state.md](common/09-lifecycle-registration-and-state.md)
  Notes: mini-program registration and overall app surface.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/App/`
  Mapped into: [docs-index.md](docs-index.md), [common/01-project-basics.md](common/01-project-basics.md), [common/09-lifecycle-registration-and-state.md](common/09-lifecycle-registration-and-state.md)
  Notes: `App()` singleton lifecycle.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/getApp/`
  Mapped into: [docs-index.md](docs-index.md), [common/01-project-basics.md](common/01-project-basics.md), [common/09-lifecycle-registration-and-state.md](common/09-lifecycle-registration-and-state.md)
  Notes: app-global in-memory state access.

- `https://docs.zepp.com/docs/guides/framework/device/page/`
  Mapped into: [docs-index.md](docs-index.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md), [common/09-lifecycle-registration-and-state.md](common/09-lifecycle-registration-and-state.md)
  Notes: page registration, lifecycle shape, and where `build()` sits in rendering.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/Page/`
  Mapped into: [docs-index.md](docs-index.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md), [common/09-lifecycle-registration-and-state.md](common/09-lifecycle-registration-and-state.md)
  Notes: `Page()` constructor, lifecycle callbacks, and page-build context.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/getCurrentPage/`
  Mapped into: [docs-index.md](docs-index.md), [common/09-lifecycle-registration-and-state.md](common/09-lifecycle-registration-and-state.md)
  Notes: current page instance access.

- `https://docs.zepp.com/docs/guides/framework/device/router/`
  Mapped into: [docs-index.md](docs-index.md)
  Notes: router overview backing navigation guidance.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/router/push/`
  Mapped into: [docs-index.md](docs-index.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md)
  Notes: page navigation and route params.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/router/replace/`
  Mapped into: [docs-index.md](docs-index.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md)
  Notes: full page replacement as an explicit rebuild path for non-reactive page flows.

- `https://docs.zepp.com/docs/guides/framework/device/app-service/`
  Mapped into: [docs-index.md](docs-index.md), [common/02-device-phone-architecture.md](common/02-device-phone-architecture.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md)
  Notes: App Service capability model, constraints, and `3.0+` availability.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/AppService/`
  Mapped into: [docs-index.md](docs-index.md), [common/02-device-phone-architecture.md](common/02-device-phone-architecture.md), [common/09-lifecycle-registration-and-state.md](common/09-lifecycle-registration-and-state.md)
  Notes: `AppService()` registration and lifecycle from `API_LEVEL 3.0`.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/app-service/start/`
  Mapped into: [docs-index.md](docs-index.md), [common/09-lifecycle-registration-and-state.md](common/09-lifecycle-registration-and-state.md), [v4/01-api-level-4-basics.md](v4/01-api-level-4-basics.md)
  Notes: App Service startup and v4 persistence option.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/app-service/stop/`
  Mapped into: [docs-index.md](docs-index.md), [common/09-lifecycle-registration-and-state.md](common/09-lifecycle-registration-and-state.md)
  Notes: App Service stop flow.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/app-service/exit/`
  Mapped into: [docs-index.md](docs-index.md), [common/09-lifecycle-registration-and-state.md](common/09-lifecycle-registration-and-state.md)
  Notes: App Service self-exit flow.

- `https://docs.zepp.com/docs/guides/framework/app-settings/register/`
  Mapped into: [docs-index.md](docs-index.md), [common/01-project-basics.md](common/01-project-basics.md), [common/02-device-phone-architecture.md](common/02-device-phone-architecture.md), [common/05-settings-sync-and-storage.md](common/05-settings-sync-and-storage.md), [common/09-lifecycle-registration-and-state.md](common/09-lifecycle-registration-and-state.md)
  Notes: `AppSettingsPage`, `build(props)`, reactive settings lifecycle, and the one-root settings surface model.

- `https://docs.zepp.com/docs/guides/framework/side-service/register/`
  Mapped into: [docs-index.md](docs-index.md), [common/01-project-basics.md](common/01-project-basics.md), [common/02-device-phone-architecture.md](common/02-device-phone-architecture.md), [common/09-lifecycle-registration-and-state.md](common/09-lifecycle-registration-and-state.md)
  Notes: `AppSideService`, companion lifecycle hooks, and the phone-side service entry surface.

- `https://docs.zepp.com/docs/reference/app-settings-api/settings-storage/`
  Mapped into: [docs-index.md](docs-index.md), [common/02-device-phone-architecture.md](common/02-device-phone-architecture.md), [common/05-settings-sync-and-storage.md](common/05-settings-sync-and-storage.md)
  Notes: companion-side settings persistence, string-valued storage, and change-flow behavior.

- `https://docs.zepp.com/docs/reference/side-service-api/messaging/`
  Mapped into: [docs-index.md](docs-index.md), [common/02-device-phone-architecture.md](common/02-device-phone-architecture.md), [common/05-settings-sync-and-storage.md](common/05-settings-sync-and-storage.md)
  Notes: Side Service `peerSocket` messaging and companion-to-device transport.

- `https://docs.zepp.com/docs/reference/side-service-api/transfer-file/`
  Mapped into: [docs-index.md](docs-index.md), [common/02-device-phone-architecture.md](common/02-device-phone-architecture.md), [common/05-settings-sync-and-storage.md](common/05-settings-sync-and-storage.md)
  Notes: file transfer from companion to watch.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ble/`
  Mapped into: [docs-index.md](docs-index.md), [common/02-device-phone-architecture.md](common/02-device-phone-architecture.md), [common/05-settings-sync-and-storage.md](common/05-settings-sync-and-storage.md)
  Notes: BLE overview for device/companion communication.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ble/createConnect/`
  Mapped into: [docs-index.md](docs-index.md)
  Notes: explicit BLE connection setup reference.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ble/send/`
  Mapped into: [docs-index.md](docs-index.md)
  Notes: explicit BLE send reference.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ble/connectStatus/`
  Mapped into: [docs-index.md](docs-index.md)
  Notes: explicit connection-state reference.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ble/disConnect/`
  Mapped into: [docs-index.md](docs-index.md)
  Notes: explicit disconnect reference.

- `https://docs.zepp.com/docs/guides/framework/device/secondary-widget/`
  Mapped into: [docs-index.md](docs-index.md), [common/02-device-phone-architecture.md](common/02-device-phone-architecture.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md), [common/10-secondary-widgets-and-shortcuts.md](common/10-secondary-widgets-and-shortcuts.md)
  Notes: widget/card surfaces, limitations, registration, and debugging.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/SecondaryWidget/`
  Mapped into: [docs-index.md](docs-index.md), [common/02-device-phone-architecture.md](common/02-device-phone-architecture.md), [common/10-secondary-widgets-and-shortcuts.md](common/10-secondary-widgets-and-shortcuts.md)
  Notes: widget constructor and lifecycle surface.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/AppWidget/`
  Mapped into: [docs-index.md](docs-index.md), [common/02-device-phone-architecture.md](common/02-device-phone-architecture.md), [common/10-secondary-widgets-and-shortcuts.md](common/10-secondary-widgets-and-shortcuts.md)
  Notes: shortcut-card constructor and lifecycle surface.

- `https://docs.zepp.com/docs/guides/workout-extension/intro/`
  Mapped into: [docs-index.md](docs-index.md), [common/02-device-phone-architecture.md](common/02-device-phone-architecture.md), [common/12-workout-extension.md](common/12-workout-extension.md), [legacy/01-legacy-compatibility.md](legacy/01-legacy-compatibility.md)
  Notes: Workout Extension as a plugin surface in the Workout system app and its `3.5` introduction framing.

- `https://docs.zepp.com/docs/guides/workout-extension/quick-start/`
  Mapped into: [docs-index.md](docs-index.md), [common/01-project-basics.md](common/01-project-basics.md), [common/02-device-phone-architecture.md](common/02-device-phone-architecture.md), [common/12-workout-extension.md](common/12-workout-extension.md), [legacy/01-legacy-compatibility.md](legacy/01-legacy-compatibility.md), [legacy/02-migration-notes.md](legacy/02-migration-notes.md)
  Notes: safe `3.6+` runtime floor, `data-widget` module shape, widget count limit, lifecycle, and UI restrictions.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/DataWidget/`
  Mapped into: [docs-index.md](docs-index.md), [common/01-project-basics.md](common/01-project-basics.md), [common/02-device-phone-architecture.md](common/02-device-phone-architecture.md), [common/12-workout-extension.md](common/12-workout-extension.md)
  Notes: `DataWidget()` constructor and lifecycle from `API_LEVEL 3.6`.

- `https://docs.zepp.com/docs/v2/reference/device-app-api/newAPI/ui/getAppWidgetSize/`
  Mapped into: [docs-index.md](docs-index.md), [common/10-secondary-widgets-and-shortcuts.md](common/10-secondary-widgets-and-shortcuts.md)
  Notes: shortcut-card sizing reference.

- `https://docs.zepp.com/docs/v2/reference/device-app-api/newAPI/ui/setAppWidgetSize/`
  Mapped into: [docs-index.md](docs-index.md), [common/10-secondary-widgets-and-shortcuts.md](common/10-secondary-widgets-and-shortcuts.md)
  Notes: shortcut-card sizing control.

- `https://docs.zepp.com/docs/guides/best-practice/cross-page-communications/`
  Mapped into: [docs-index.md](docs-index.md), [common/09-lifecycle-registration-and-state.md](common/09-lifecycle-registration-and-state.md), [common/10-secondary-widgets-and-shortcuts.md](common/10-secondary-widgets-and-shortcuts.md)
  Notes: cross-page and cross-surface state-sharing patterns.

## UI, Layout, and Interaction

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/createWidget/`
  Mapped into: [docs-index.md](docs-index.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md)
  Notes: widget-based UI model.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/createWidget/widget/BUTTON/`
  Mapped into: [docs-index.md](docs-index.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md)
  Notes: canonical button widget reference.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/FILL_RECT/`
  Mapped into: [docs-index.md](docs-index.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md)
  Notes: simple geometry and lightweight motion primitives.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/ARC/`
  Mapped into: [docs-index.md](docs-index.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md)
  Notes: curved geometry and round-screen support.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/CANVAS/`
  Mapped into: [docs-index.md](docs-index.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md)
  Notes: advanced drawing path plus runtime caveats.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/VIRTUAL_CONTAINER/`
  Mapped into: [docs-index.md](docs-index.md), [v4/01-api-level-4-basics.md](v4/01-api-level-4-basics.md), [v4/02-v4-ui-and-layout.md](v4/02-v4-ui-and-layout.md)
  Notes: Flex-layout root container.

- `https://docs.zepp.com/docs/guides/framework/device/layout/`
  Mapped into: [docs-index.md](docs-index.md), [v4/02-v4-ui-and-layout.md](v4/02-v4-ui-and-layout.md)
  Notes: Flex layout properties and design.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/gettersetter/`
  Mapped into: [docs-index.md](docs-index.md), [v4/02-v4-ui-and-layout.md](v4/02-v4-ui-and-layout.md)
  Notes: direct widget property access in `4.0+`.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/updateLayout/`
  Mapped into: [docs-index.md](docs-index.md), [v4/02-v4-ui-and-layout.md](v4/02-v4-ui-and-layout.md)
  Notes: recomputing Flex layout after tree edits.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/updateLayoutStyle/`
  Mapped into: [docs-index.md](docs-index.md), [v4/02-v4-ui-and-layout.md](v4/02-v4-ui-and-layout.md)
  Notes: dynamic Flex layout-style updates.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/deleteWidget/`
  Mapped into: [docs-index.md](docs-index.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md), [v4/02-v4-ui-and-layout.md](v4/02-v4-ui-and-layout.md)
  Notes: dynamic widget cleanup.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/openInspector/`
  Mapped into: [docs-index.md](docs-index.md), [v4/02-v4-ui-and-layout.md](v4/02-v4-ui-and-layout.md), [v4/03-v4-debugging-and-performance.md](v4/03-v4-debugging-and-performance.md)
  Notes: simulator layout-inspection tool.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/interaction/onGesture/`
  Mapped into: [docs-index.md](docs-index.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md)
  Notes: gesture lifecycle and cleanup caveat.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/interaction/onDigitalCrown/`
  Mapped into: [docs-index.md](docs-index.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md)
  Notes: optional non-touch input surface.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/KEYBOARD/`
  Mapped into: [docs-index.md](docs-index.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md), [legacy/01-legacy-compatibility.md](legacy/01-legacy-compatibility.md), [v4/02-v4-ui-and-layout.md](v4/02-v4-ui-and-layout.md)
  Notes: classic in-page keyboard widget starting at `3.0`, distinct from system keyboard APIs.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/SPORT_DATA/`
  Mapped into: [docs-index.md](docs-index.md), [common/12-workout-extension.md](common/12-workout-extension.md)
  Notes: purpose-built `3.6+` workout-data widget for Workout Extension UIs.

- `https://docs.zepp.com/docs/guides/framework/device/screen-adaption/`
  Mapped into: [docs-index.md](docs-index.md), [common/01-project-basics.md](common/01-project-basics.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md), [legacy/01-legacy-compatibility.md](legacy/01-legacy-compatibility.md)
  Notes: `3.0` screen-type adaptation flow, `st` shorthand such as `r`/`s`/`b`, and its `app.json v3+` requirement.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/SYSTEM_KEYBOARD/`
  Mapped into: [docs-index.md](docs-index.md), [00-version-routing.md](00-version-routing.md), [v4/01-api-level-4-basics.md](v4/01-api-level-4-basics.md), [v4/02-v4-ui-and-layout.md](v4/02-v4-ui-and-layout.md), [legacy/01-legacy-compatibility.md](legacy/01-legacy-compatibility.md)
  Notes: `4.0+` system keyboard support through `createKeyboard()`, with `inputType.JSKB` gated to `4.2`.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/keyboard/`
  Mapped into: [docs-index.md](docs-index.md), [v4/01-api-level-4-basics.md](v4/01-api-level-4-basics.md), [v4/02-v4-ui-and-layout.md](v4/02-v4-ui-and-layout.md)
  Notes: dedicated `4.2+` custom-keyboard control surface for input, switching, and settings integration.

- `https://docs.zepp.com/docs/guides/keyboard/intro/`
  Mapped into: [docs-index.md](docs-index.md), [v4/01-api-level-4-basics.md](v4/01-api-level-4-basics.md), [v4/02-v4-ui-and-layout.md](v4/02-v4-ui-and-layout.md)
  Notes: `4.2+` custom keyboard overview, settings enablement flow, and region/device caveats.

- `https://docs.zepp.com/docs/v2/reference/device-app-api/newAPI/ui/widget/IMG_ANIM/`
  Mapped into: [docs-index.md](docs-index.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md), [common/07-i18n-config-and-assets.md](common/07-i18n-config-and-assets.md)
  Notes: frame-sequence animation guidance.

## Sensors, Permissions, Display, Media, and Notifications

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/`
  Mapped into: [docs-index.md](docs-index.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md)
  Notes: sensor namespace and capability awareness.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Accelerometer/`
  Mapped into: [docs-index.md](docs-index.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md)
  Notes: tilt control, permissions, units, and motion UX.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Gyroscope/`
  Mapped into: [docs-index.md](docs-index.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md)
  Notes: angular velocity and sensor differentiation.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Buzzer/`
  Mapped into: [docs-index.md](docs-index.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md)
  Notes: buzzer capability and settings caveats.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/SystemSounds/`
  Mapped into: [docs-index.md](docs-index.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md), [legacy/01-legacy-compatibility.md](legacy/01-legacy-compatibility.md), [legacy/02-migration-notes.md](legacy/02-migration-notes.md)
  Notes: `3.6+` system sound behavior and mute-state caveats.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/app/queryPermission/`
  Mapped into: [docs-index.md](docs-index.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md)
  Notes: runtime permission flow.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/display/setPageBrightTime/`
  Mapped into: [docs-index.md](docs-index.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md)
  Notes: keep-awake and anti-sleep APIs.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/settings/getSystemMode/`
  Mapped into: [docs-index.md](docs-index.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md)
  Notes: DND/sleep/theater checks during audio debugging.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/media/`
  Mapped into: [docs-index.md](docs-index.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md)
  Notes: deterministic in-app audio/media playback.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/media/player/getDuration/`
  Mapped into: [docs-index.md](docs-index.md)
  Notes: media duration validation.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/media/player/setSource/`
  Mapped into: [docs-index.md](docs-index.md)
  Notes: file-source media configuration.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/notification/notify/`
  Mapped into: [docs-index.md](docs-index.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md)
  Notes: interactive notification support.

## Runtime Utilities, Device Info, Storage, I18n, Design, and Testing

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/app/getPackageInfo/`
  Mapped into: [docs-index.md](docs-index.md)
  Notes: package/runtime inspection reference retained in the index.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/app-access/getSportData/`
  Mapped into: [docs-index.md](docs-index.md), [common/12-workout-extension.md](common/12-workout-extension.md)
  Notes: real-time workout data access for extension logic beyond `SPORT_DATA`.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/app/getPerformance/`
  Mapped into: [docs-index.md](docs-index.md), [v4/01-api-level-4-basics.md](v4/01-api-level-4-basics.md), [v4/03-v4-debugging-and-performance.md](v4/03-v4-debugging-and-performance.md)
  Notes: performance stats and runtime inspection in `4.0+`.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/timer/createSysTimer/`
  Mapped into: [docs-index.md](docs-index.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md), [v4/01-api-level-4-basics.md](v4/01-api-level-4-basics.md), [v4/03-v4-debugging-and-performance.md](v4/03-v4-debugging-and-performance.md)
  Notes: system timer API in `4.0+` and the off-screen progression semantics it implies.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/utils/bufferToString/`
  Mapped into: [docs-index.md](docs-index.md), [common/05-settings-sync-and-storage.md](common/05-settings-sync-and-storage.md), [v4/01-api-level-4-basics.md](v4/01-api-level-4-basics.md)
  Notes: `ArrayBuffer` to string conversion.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/utils/stringToBuffer/`
  Mapped into: [docs-index.md](docs-index.md), [common/05-settings-sync-and-storage.md](common/05-settings-sync-and-storage.md), [v4/01-api-level-4-basics.md](v4/01-api-level-4-basics.md)
  Notes: string to `ArrayBuffer` conversion.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/device/getDeviceInfo/`
  Mapped into: [docs-index.md](docs-index.md), [common/01-project-basics.md](common/01-project-basics.md), [common/04-ui-sensors-interactions.md](common/04-ui-sensors-interactions.md), [v4/01-api-level-4-basics.md](v4/01-api-level-4-basics.md)
  Notes: device shape/layout adaptation and newer `uuid` note in `4.2`.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/storage/localStorage/`
  Mapped into: [docs-index.md](docs-index.md), [common/05-settings-sync-and-storage.md](common/05-settings-sync-and-storage.md), [common/09-lifecycle-registration-and-state.md](common/09-lifecycle-registration-and-state.md)
  Notes: persistent watch-local storage.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/storage/sessionStorage/`
  Mapped into: [docs-index.md](docs-index.md), [common/05-settings-sync-and-storage.md](common/05-settings-sync-and-storage.md), [common/09-lifecycle-registration-and-state.md](common/09-lifecycle-registration-and-state.md)
  Notes: session-scoped watch-local state.

- `https://docs.zepp.com/docs/v2/guides/framework/device/permission/`
  Mapped into: [docs-index.md](docs-index.md)
  Notes: general permission-control reference retained in the index.

- `https://docs.zepp.com/docs/guides/best-practice/i18n/`
  Mapped into: [docs-index.md](docs-index.md), [common/07-i18n-config-and-assets.md](common/07-i18n-config-and-assets.md)
  Notes: i18n structure and best practices.

- `https://docs.zepp.com/docs/reference/device-app-api/newAPI/i18n/getText/`
  Mapped into: [docs-index.md](docs-index.md), [common/07-i18n-config-and-assets.md](common/07-i18n-config-and-assets.md)
  Notes: modern device-side i18n API.

- `https://docs.zepp.com/docs/v2/reference/related-resources/language-list/`
  Mapped into: [docs-index.md](docs-index.md), [common/07-i18n-config-and-assets.md](common/07-i18n-config-and-assets.md)
  Notes: supported locale-key mapping.

- `https://docs.zepp.com/docs/designs/`
  Mapped into: [docs-index.md](docs-index.md), [common/19-design-system-and-figma-patterns.md](common/19-design-system-and-figma-patterns.md)
  Notes: design-system landing page and the official entry point for design guidance.

- `https://docs.zepp.com/docs/designs/download/`
  Mapped into: [docs-index.md](docs-index.md), [common/07-i18n-config-and-assets.md](common/07-i18n-config-and-assets.md), [common/19-design-system-and-figma-patterns.md](common/19-design-system-and-figma-patterns.md)
  Notes: official Figma library links and font-download entry point.

- `https://docs.zepp.com/docs/designs/self-checklist/`
  Mapped into: [docs-index.md](docs-index.md), [common/19-design-system-and-figma-patterns.md](common/19-design-system-and-figma-patterns.md)
  Notes: review checklist for system-pattern consistency and design validation.

- `https://docs.zepp.com/docs/designs/internationalization/interface-layouts/`
  Mapped into: [docs-index.md](docs-index.md), [common/07-i18n-config-and-assets.md](common/07-i18n-config-and-assets.md), [common/10-secondary-widgets-and-shortcuts.md](common/10-secondary-widgets-and-shortcuts.md), [common/19-design-system-and-figma-patterns.md](common/19-design-system-and-figma-patterns.md)
  Notes: multilingual overflow handling, wrapping choices, and RTL mirroring rules.

- `https://docs.zepp.com/docs/designs/internationalization/languages/`
  Mapped into: [docs-index.md](docs-index.md), [common/07-i18n-config-and-assets.md](common/07-i18n-config-and-assets.md), [common/19-design-system-and-figma-patterns.md](common/19-design-system-and-figma-patterns.md)
  Notes: language fallback, punctuation, unit localization, and text-style guidance.

- `https://docs.zepp.com/docs/designs/accessibility/contrast-ratio/`
  Mapped into: [docs-index.md](docs-index.md), [common/07-i18n-config-and-assets.md](common/07-i18n-config-and-assets.md), [common/19-design-system-and-figma-patterns.md](common/19-design-system-and-figma-patterns.md)
  Notes: WCAG-based text-contrast checks and accessibility review.

- `https://docs.zepp.com/docs/designs/specifications/safe-area/`
  Mapped into: [docs-index.md](docs-index.md), [common/19-design-system-and-figma-patterns.md](common/19-design-system-and-figma-patterns.md)
  Notes: `2px` safe margin and reserved top or bottom display areas.

- `https://docs.zepp.com/docs/designs/customization/widget/`
  Mapped into: [docs-index.md](docs-index.md), [common/10-secondary-widgets-and-shortcuts.md](common/10-secondary-widgets-and-shortcuts.md), [common/19-design-system-and-figma-patterns.md](common/19-design-system-and-figma-patterns.md)
  Notes: single-purpose widget behavior, no-scroll expectations, preview-image rules, and official widget templates.

- `https://docs.zepp.com/docs/designs/customization/shortcut-cards/`
  Mapped into: [docs-index.md](docs-index.md), [common/10-secondary-widgets-and-shortcuts.md](common/10-secondary-widgets-and-shortcuts.md), [common/19-design-system-and-figma-patterns.md](common/19-design-system-and-figma-patterns.md)
  Notes: shortcut-card background, spacing, minimum height, copy-tightening, and official templates.

- `https://docs.zepp.com/docs/designs/visual/icons/`
  Mapped into: [docs-index.md](docs-index.md), [common/07-i18n-config-and-assets.md](common/07-i18n-config-and-assets.md), [common/19-design-system-and-figma-patterns.md](common/19-design-system-and-figma-patterns.md)
  Notes: icon spec, sizing constraints, and safe-area expectations.

- `https://docs.zepp.com/docs/guides/faq/icon-faq/`
  Mapped into: [docs-index.md](docs-index.md), [common/07-i18n-config-and-assets.md](common/07-i18n-config-and-assets.md)
  Notes: icon FAQ and submission pitfalls.

- `https://docs.zepp.com/docs/v2/guides/best-practice/code-organization/`
  Mapped into: [docs-index.md](docs-index.md), [common/06-testing-validation.md](common/06-testing-validation.md), [common/08-runtime-gotchas.md](common/08-runtime-gotchas.md)
  Notes: pure-JS testability, runtime-free domain modules, and code-organization guidance.
