# API_LEVEL 4.x Basics

## When to load this file

Load this when the effective runtime API level is `4.x`.

## Baseline

Treat `4.0` as the default safe baseline for the v4 profile.

- If the target is exactly `4.0`, use only `4.0`-documented features.
- If the target is `4.1`, `4.2`, or later `4.x`, keep using the `v4` profile but verify newer additions page by page.

## Important `4.0` additions

The official `API_LEVEL 4.0` feature page highlights these families:

- Flex layout support for widgets
- widget getter/setter property access
- new UI widgets and methods such as system keyboard support through `createKeyboard()`
- app performance statistics via `getPerformance`
- utility helpers for `ArrayBuffer` and string conversion
- App Service `start(..., reload)` support for persistence across system-running-state changes

## V4 mental model

- Use `4.0` features intentionally, not accidentally.
- Check the support banner on the specific API page before coding.
- If an app must remain compatible below `4.0`, keep a fallback implementation or stay on pre-4.0 APIs.

## Examples of `4.0+` APIs to check explicitly

- `VIRTUAL_CONTAINER`
- widget getter/setter direct property access
- `SYSTEM_KEYBOARD` / `createKeyboard()`
- `openInspector`
- `getPerformance`
- `createSysTimer`
- `bufferToString`
- `stringToBuffer`

## `4.2` note

`4.2` is still part of the `v4` profile, but additions beyond `4.0` should be checked individually before use.

The official `4.2` new-features page currently highlights:

- custom keyboard-related improvements
- media `seek()` updates and new events
- workout additions
- a `uuid` return value on `getDeviceInfo()`

Treat custom keyboard work as `4.2+`. The current system-keyboard docs expose `inputType.JSKB`, and the dedicated `keyboard` API plus custom-keyboard guide cover switching, settings integration, and enablement flow.

## Official references

- API_LEVEL 4.0 New Features: https://docs.zepp.com/docs/guides/version-info/new-features-40/
- API_LEVEL 4.2 New Features: https://docs.zepp.com/docs/guides/version-info/new-features-42/
- API_LEVEL Compatibility: https://docs.zepp.com/docs/v2/guides/framework/device/compatibility/
- SYSTEM_KEYBOARD: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/SYSTEM_KEYBOARD/
- Keyboard API: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/keyboard/
- Custom Keyboard intro: https://docs.zepp.com/docs/guides/keyboard/intro/
- stringToBuffer: https://docs.zepp.com/docs/reference/device-app-api/newAPI/utils/stringToBuffer/
- bufferToString: https://docs.zepp.com/docs/reference/device-app-api/newAPI/utils/bufferToString/
- App Service `start`: https://docs.zepp.com/docs/reference/device-app-api/newAPI/app-service/start/
