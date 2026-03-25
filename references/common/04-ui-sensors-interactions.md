# UI, Sensors, and Interactions

## UI model

Zepp device pages are widget-driven, not DOM-driven.

- Build UI with `hmUI.createWidget(...)` or `@zos/ui`.
- Size and position for watch screens.
- Use `px(...)` from `@zos/utils` when the project relies on design-width scaling.
- If the task starts from official Zepp Figma libraries, match the nearest system family first; for circular list pages that often means roughly `104px` compact rows, `121px` multiline rows, `184px` title or footer shells, and about `8px` between stacked list items.

## Useful widgets and drawing primitives

- `BUTTON` for tap actions
- `FILL_RECT` for simple shapes and lightweight motion
- `ARC` for curved watch-native geometry
- `CANVAS` for custom drawing when widget primitives are not enough
- `KEYBOARD` for legacy-era in-page text input starting at `3.0`
- `IMG_ANIM` for frame-sequence animation instead of assuming GIF playback

## Navigation and interactions

- Use router APIs such as `push(...)` and `back()` for multi-page flows.
- Use `onGesture` and `offGesture` carefully because gesture registration is page-scoped.
- Treat digital crown input as optional unless target hardware guarantees it.
- Use `deleteWidget(...)` when tearing down dynamic widget trees instead of assuming stale widgets disappear automatically.
- When the UI behaves like a system tool such as a picker, slider, keypad, or calculator-style selector, prefer the matching official design-library pattern over ad hoc circular geometry.

## BLE device interactions

- Watch-side BLE master flows need explicit version and permission checks; do not assume a page can talk to peripherals without `device:os.ble`.
- If the repo uses `@silver-zepp/easy-ble`, load `16-easy-ble-library-patterns` instead of copying sample manifests or raw `hmBle.mst*` usage blindly.

## Sensors

### Accelerometer

Use when the app depends on held tilt, movement intensity, or motion-driven gameplay.

- check manifest permissions
- consider runtime permission flow
- calibrate or re-center when the use case depends on neutral orientation
- use frequency mode appropriate to the task

### Gyroscope

Use when the app depends on angular velocity rather than held tilt angle.

- gyroscope values describe rotation speed, not static tilt
- for tilt-control patterns, accelerometer is usually the primary sensor

## Audio and feedback

- `Buzzer` lives under `@zos/sensor`
- `SystemSounds` also lives under `@zos/sensor`, but it starts at `API_LEVEL 3.6`
- check capability before use
- for deterministic in-app audio, use `@zos/media` with bundled files
- if the repo uses `@silver-zepp/easy-media`, load `18-easy-media-library-patterns` instead of assuming the README matches the actual wrapper behavior
- confirm system-mode and sound-setting interactions during debugging
- for short watch-side hardware checks, start with direct haptic cues before layering more complex feedback flows
- when repeating the same haptic or sound cue rapidly, make sure the repo's feedback path stops or resets in-flight playback so repeated taps stay reliable

## Notifications and background flows

- `notify(...)` can create interactive notifications from `3.0+`
- App Service is a `3.0+` feature and is the right place for background logic without a visible UI

## Device-aware layout

- use `getDeviceInfo()` and screen data to adapt to round vs square and different target shapes
- do not hard-code a single shape unless `targets` limits the app to one profile
- for `3.0+` projects with `app.json v3+`, consider the screen adaptation specification for square, round, and band targets
- in API `4.0+`, prefer Flex layout only when it materially simplifies the screen; otherwise fixed coordinates remain valid and often simpler

## Official references

- UI createWidget: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/createWidget/
- BUTTON: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/createWidget/widget/BUTTON/
- FILL_RECT: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/FILL_RECT/
- ARC: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/ARC/
- CANVAS: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/CANVAS/
- KEYBOARD: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/KEYBOARD/
- IMG_ANIM: https://docs.zepp.com/docs/v2/reference/device-app-api/newAPI/ui/widget/IMG_ANIM/
- Buzzer: https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Buzzer/
- SystemSounds: https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/SystemSounds/
- Screen adaptation Specification: https://docs.zepp.com/docs/guides/framework/device/screen-adaption/
- deleteWidget: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/deleteWidget/
- Router `push`: https://docs.zepp.com/docs/reference/device-app-api/newAPI/router/push/
- Gesture interaction: https://docs.zepp.com/docs/reference/device-app-api/newAPI/interaction/onGesture/
- Digital crown interaction: https://docs.zepp.com/docs/reference/device-app-api/newAPI/interaction/onDigitalCrown/
- Sensor module: https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/
- Accelerometer: https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Accelerometer/
- Gyroscope: https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Gyroscope/
- Media player: https://docs.zepp.com/docs/reference/device-app-api/newAPI/media/
- Notification API: https://docs.zepp.com/docs/reference/device-app-api/newAPI/notification/notify/
- App Service: https://docs.zepp.com/docs/guides/framework/device/app-service/
- Device info: https://docs.zepp.com/docs/reference/device-app-api/newAPI/device/getDeviceInfo/
