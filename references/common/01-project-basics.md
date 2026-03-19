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
- `app-side/`: phone-side Side Service logic
- `setting/`: phone-side Settings App UI
- `app-service/`: background watch logic without a visible page
- `secondary-widget/`: watch widgets and shortcut-card entry surfaces
- `assets/`: static assets

## `app.json` fields that matter most

Inspect at least:

- `configVersion`
- `permissions`
- `runtime.apiVersion.compatible`
- `runtime.apiVersion.target`
- `runtime.apiVersion.minVersion`
- `targets`
- `i18n`
- `defaultLanguage`

Important interpretation:

- `configVersion` controls manifest/schema expectations.
- `runtime.apiVersion` controls runtime capability.
- `targets` controls platform/device targeting and module registration.
- older repos may still use `configVersion: "v2"` and other pre-`v3` manifest conventions
- screen adaptation guidance applies only to `app.json v3+`

## Registration and lifecycle basics

- `App()` must be called exactly once in `app.js`.
- Each page file must call `Page()` exactly once.
- Each App Service file must call `AppService()` exactly once.
- Every device page path must be registered in `targets.*.module.page.pages`.
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

## Useful official references

- Quick Start: https://docs.zepp.com/docs/guides/quick-start/
- Zepp OS 1.0 Device App intro: https://docs.zepp.com/docs/1.0/guides/framework/device/intro/
- Zepp OS 1.0 Mini Program Configuration: https://docs.zepp.com/docs/1.0/reference/app-json/
- Mini Program Configuration: https://docs.zepp.com/docs/reference/app-json/
- 2.0 API Introduction: https://docs.zepp.com/docs/guides/version-info/new-api/
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
