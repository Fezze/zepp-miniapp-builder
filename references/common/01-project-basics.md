# Project Basics

## What to inspect first

Open these files before changing anything:

- `app.json`
- `app.js`
- `package.json`
- main device entry files under `page/`
- optional `app-side/`, `setting/`, and `app-service/`

## Core Zepp surfaces

- `page/`: Device App pages rendered on the watch
- `data-widget/`: Workout Extension entry surface rendered inside the Workout system app
- `app-side/`: phone-side Side Service logic
- `setting/`: phone-side Settings App UI
- `app-service/`: background watch logic without a visible page
- `secondary-widget/`: watch widgets and shortcut-card entry surfaces
- `assets/`: static assets

## `app.json` fields that matter most

Inspect at least:

- `app`
- `configVersion`
- `permissions`
- `runtime.apiVersion.compatible`
- `runtime.apiVersion.target`
- `runtime.apiVersion.minVersion`
- `targets`
- `targets.*.platforms`
- `i18n`
- `defaultLanguage`

Important interpretation:

- `app.vender` is the official vendor field name in Zepp manifests.
- `configVersion` controls manifest/schema expectations.
- `runtime.apiVersion` controls runtime capability.
- `targets` controls platform/device targeting, module registration, and target-key resource routing.
- older repos may still use `configVersion: "v2"` and other pre-`v3` manifest conventions
- screen adaptation guidance applies only to `app.json v3+`

## Manifest and target gotchas

- In `app.json v3+`, each `targets.<name>` key also maps to an `/assets/<target>/` resource directory.
- In `targets.*.platforms`, the screen-shape shorthand is `st: "r"` for round, `st: "s"` for square, and `st: "b"` for band.
- Official multi-device adaptation examples place `icon.png` inside each target asset directory, so verify `assets/<target>/icon.png` before assuming a root-only icon layout is enough for target-based builds.

## Registration and lifecycle basics

- `App()` must be called exactly once in `app.js`.
- Each page file must call `Page()` exactly once.
- Side Service registration uses `AppSideService(...)` and companion lifecycle usually lives under `app-side/`.
- Each Workout Extension entry file must call `DataWidget()` exactly once when the project includes `data-widget`.
- Each App Service file must call `AppService()` exactly once.
- Every device page path must be registered in `targets.*.module.page.pages`.
- Workout Extension registration uses `targets.*.module.data-widget.widgets`.
- Settings App registration uses `AppSettingsPage(...)` and has a single `build` lifecycle.

Useful instance helpers:

- `getApp()` for global app state
- `getCurrentPage()` for current page state

## Standard workflow

Run these commands before and during development:

```bash
node -v
npm -v
zeus --version
zeus status
zeus dev
zeus build
```

Use `zeus build` as the minimum compile gate before handoff.

## Coding defaults

- Use the Zepp API generation that matches the target codebase: `hmUI` / `hmApp` / `hmBle` style globals for `1.0`-era device code, `@zos/*` modules for `2.0+`, never browser DOM APIs.
- Prefer explicit widget creation via `hmUI.createWidget(...)` or the corresponding `@zos/ui` helpers.
- Use `px(...)` and layout values designed for watch screens.
- Keep copy in i18n resources when practical.
- Validate names, enums, and signatures against local `@zeppos/device-types` when installed.

## Targeting guidance

- Do not make hardware-specific controls mandatory unless the project guarantees the hardware.
- Read `targets` and screen metadata before assuming round vs square layout, resolution, or input capabilities.
- For device-specific UI behavior, combine manifest targeting, runtime device info, and actual simulator/device validation.
- Verified field note: official device lists and simulator-reported API levels may disagree on the same hardware family. If the official list says a device is `3.7` but the simulator currently reports `3.6`, a temporary repo floor of `3.6` can be the safer compatibility path until real-device validation proves a tighter floor is safe.

## Minimal `4.0` scaffold mental model

For a small `4.0` mini-app without `@zeppos/zml`, the minimal moving pieces are usually:

- `app.js` with `App(...)`
- one device page under `page/` with `Page(...)`
- optional `setting/index.js` with `AppSettingsPage(...)`
- optional `app-side/index.js` with `AppSideService(...)`
- target-specific assets under `assets/<target>/`, including `icon.png` when the project uses target-based resources

## Useful official references

- Quick Start: https://docs.zepp.com/docs/guides/quick-start/
- Folder Structure: https://docs.zepp.com/docs/guides/architecture/folder-structure/
- Zepp OS 1.0 Device App intro: https://docs.zepp.com/docs/1.0/guides/framework/device/intro/
- Zepp OS 1.0 Mini Program Configuration: https://docs.zepp.com/docs/1.0/reference/app-json/
- Mini Program Configuration: https://docs.zepp.com/docs/reference/app-json/
- Code adaptations for more Zepp OS devices: https://docs.zepp.com/docs/guides/best-practice/code-adaptations-for-new-devices/
- 2.0 API Introduction: https://docs.zepp.com/docs/guides/version-info/new-api/
- Workout Extension quick start: https://docs.zepp.com/docs/guides/workout-extension/quick-start/
- DataWidget constructor: https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/DataWidget/
- CLI overview: https://docs.zepp.com/docs/guides/tools/cli/overview/
- Screen adaptation Specification: https://docs.zepp.com/docs/guides/framework/device/screen-adaption/
- Device info: https://docs.zepp.com/docs/reference/device-app-api/newAPI/device/getDeviceInfo/
- Register mini program: https://docs.zepp.com/docs/guides/framework/device/app/
- App constructor: https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/App/
- getApp: https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/getApp/
- Register page and draw widgets: https://docs.zepp.com/docs/guides/framework/device/page/
- Page constructor: https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/Page/
- getCurrentPage: https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/getCurrentPage/
- Register Settings App: https://docs.zepp.com/docs/guides/framework/app-settings/register/
- Register for Side Service: https://docs.zepp.com/docs/guides/framework/side-service/register/
