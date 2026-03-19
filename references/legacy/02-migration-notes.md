# Legacy Migration Notes

## Purpose

Use this file when a repo is older than the desired target or when a user asks to migrate toward newer APIs.

## Important documented migration point

The Zepp migration guide for `1.0 -> 2.0` states that the main API upgrade scope is the Device App side, while Settings App and Side Service development remain largely unchanged in that migration path.

That makes migration planning easier:

- inspect Device App code first
- treat Settings App and Side Service as separate compatibility surfaces
- avoid assuming all surfaces need the same refactor depth

## Concrete `1.0 -> 2.0` migration patterns

The official migration guide gives several high-value patterns:

- `hmUI` and `hmBle` are often reference-style migrations first: add ESM imports and keep the core call shape
- common method renames include `hmApp.gotoPage -> push`, `hmApp.goBack -> back`, `hmUI.showToast -> showToast`, and `hmUI.createDialog -> createModal`
- `px` and `assets` move under `@zos/utils`
- the old `hmTimer` module is deprecated; use standard JS timer APIs instead
- `hmFS.seek` cases are usually better rewritten around newer file APIs or `LocalStorage` instead of trying to preserve the old flow exactly

## Upgrade ladder after `2.x`

- move to `3.0` when the requested feature depends on App Service, Canvas, media, BLE central, file transfer, system notifications, or the screen-adaptation scheme
- move to `3.6` when the requested feature depends on Workout Extension, `DataWidget`, `SPORT_DATA`, or `SystemSounds`
- move to `4.x` when the requested feature depends on Flex layout, system keyboard support, widget getter/setter access, or performance APIs

## Migration tool

- the official `@zeppos/zmt` CLI can automate a meaningful share of `1.0 -> 2.0` migration work
- still review the output manually, especially around routing, file I/O, permissions, and any business logic built around old globals

## Migration workflow

1. inspect `app.json` runtime target
2. identify which app surfaces actually use runtime-sensitive device APIs
3. list APIs or patterns that need migration
4. decide whether to keep compatibility or bump the runtime target
5. verify each replacement API against official docs

## Practical migration questions

- Is the project only using pre-v4 patterns and should it stay that way?
- Is the user explicitly asking for v4 features?
- Does the device fleet require support for older API levels?
- Is the requested change impossible without raising `runtime.apiVersion`?

## When moving toward `4.x`

- keep `configVersion` and runtime API version separate in your reasoning
- move one feature family at a time
- note each v4-only dependency explicitly

## Official references

- Zepp OS 1.0 Device App intro: https://docs.zepp.com/docs/1.0/guides/framework/device/intro/
- 2.0 API Introduction: https://docs.zepp.com/docs/guides/version-info/new-api/
- Migration from version 1.0: https://docs.zepp.com/docs/v2/guides/version-info/migration-guide/
- API version selection: https://docs.zepp.com/docs/v2/guides/version-info/version-choose/
- API_LEVEL Compatibility: https://docs.zepp.com/docs/v2/guides/framework/device/compatibility/
- API_LEVEL 2.0 New Features: https://docs.zepp.com/docs/guides/version-info/new-features/
- API_LEVEL 3.0 New Features: https://docs.zepp.com/docs/guides/version-info/new-features-30/
- API_LEVEL 3.5 New Features: https://docs.zepp.com/docs/guides/version-info/new-features-35/
- Workout Extension quick start: https://docs.zepp.com/docs/guides/workout-extension/quick-start/
- DataWidget constructor: https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/DataWidget/
- SystemSounds: https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/SystemSounds/
