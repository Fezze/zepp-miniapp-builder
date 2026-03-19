# Legacy Compatibility

## When to use this file

Load this when the effective runtime API level is below `4.0`.

## Core rule

Assume `4.0+` features are unavailable unless the project deliberately raises the runtime target.

## Safe default posture

- use older widget accessors such as `getProperty` and `setProperty`
- prefer fixed-coordinate widget layout over `VIRTUAL_CONTAINER`
- avoid system keyboard APIs such as `createKeyboard()`, plus `openInspector`, `getPerformance`, and `createSysTimer`
- verify every API page against the project's target API level

## Legacy sub-ranges

`legacy` is not one thing. Split it before you design the solution.

### `1.0`

- expect device-side globals such as `hmUI`, `hmApp`, `hmSensor`, `hmBle`, `hmFS`, and `hmSetting`
- treat v1-style globals as normal, not as a code smell by themselves
- if the user needs true Zepp OS `1.0` device support, do not silently move the Device App onto `2.0+` APIs

### `2.x`

- `API_LEVEL` starts at `2.0`
- `2.0` is where the Device App moves toward `@zos/*` ESM modules
- Mini Programs developed with the `2.0` API do not run on Zepp OS `1.0` devices
- `2.1` adds useful capability bumps such as geolocation, barometer, and time/system-info improvements

### `3.x`

- `3.0` is still `legacy` relative to `4.0`, but it is a large capability jump
- App Service, system notifications, Canvas, media, BLE central, and file transfer are `3.0+`
- `KEYBOARD` is available from `3.0`, but system keyboard support through `createKeyboard()` is still `4.0+`
- screen adaptation is a `3.0` era feature and requires `app.json v3+`
- `3.5` adds Workout Extension and a smaller set of UI, sensor, and BLE improvements

## Common legacy traps

- do not treat every `v3+` doc page as safe for `2.x` targets; read the API_LEVEL start marker
- do not propose App Service or notification-center workflows on `1.0` or `2.x`
- do not assume `@zos/*` imports are correct when the repo is clearly written against `1.0` globals
- do not assume screen adaptation config exists in a `v2` manifest

## Legacy-friendly implementation strategy

1. inspect `app.json`
2. identify current runtime API level
3. list any desired features that appear to require `4.0+`
4. replace them with older patterns or propose a compatibility bump
5. keep the change set explicit about what was chosen and why

## When to recommend upgrading

Recommend a runtime upgrade when:

- the requested UX depends on a `4.0+` feature
- the app would become much simpler or safer with v4 APIs
- the target device fleet allows it

When recommending an upgrade, say so explicitly instead of silently using a newer API.

## Official references

- Zepp OS 1.0 Device App intro: https://docs.zepp.com/docs/1.0/guides/framework/device/intro/
- Zepp OS 1.0 Mini Program Configuration: https://docs.zepp.com/docs/1.0/reference/app-json/
- 2.0 API Introduction: https://docs.zepp.com/docs/guides/version-info/new-api/
- API_LEVEL Compatibility: https://docs.zepp.com/docs/v2/guides/framework/device/compatibility/
- API version selection: https://docs.zepp.com/docs/v2/guides/version-info/version-choose/
- API_LEVEL 2.0 New Features: https://docs.zepp.com/docs/guides/version-info/new-features/
- API_LEVEL 2.1 New Features: https://docs.zepp.com/docs/guides/version-info/new-features-21/
- API_LEVEL 3.0 New Features: https://docs.zepp.com/docs/guides/version-info/new-features-30/
- API_LEVEL 3.5 New Features: https://docs.zepp.com/docs/guides/version-info/new-features-35/
- KEYBOARD: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/KEYBOARD/
- Screen adaptation Specification: https://docs.zepp.com/docs/guides/framework/device/screen-adaption/
- Mini Program Configuration: https://docs.zepp.com/docs/reference/app-json/
