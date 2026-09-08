# UI, Sensors, and Interactions

## UI model

Zepp device pages are widget-driven, not DOM-driven.

- Build UI with `hmUI.createWidget(...)` or `@zos/ui`.
- For detailed widget-family selection and low-level UI methods, also load `21-ui-widget-catalog-and-methods`.
- Size and position for watch screens.
- Use `px(...)` from `@zos/utils` when the project relies on design-width scaling.
- If the task starts from official Zepp Figma libraries, match the nearest system family first; for circular list pages that often means roughly `104px` compact rows, `121px` multiline rows, `184px` title or footer shells, and about `8px` between stacked list items.

## UI implementation guidance

- Prefer the simplest widget mix that matches the screen: text/image/button primitives first, custom drawing only when necessary.
- Reach for list or container widgets only when the page truly needs scrolling or repeated item composition.
- Measure text and image assets before freezing layout assumptions for localized or multi-device screens.
- In pre-`4.0` compatibility work, prefer `getProperty(...)` and `setProperty(...)` for dynamic widget updates.
- Use built-in RTL support where available instead of manually mirroring coordinates.

## Navigation and interactions

- Use router APIs such as `push(...)` and `back()` for multi-page flows.
- Use `launchApp(...)` for cross-app launches; its documented `native` option defaults to `false`, and native system-app launches require `API_LEVEL 3.0+`.
- Import `showToast(...)` from `@zos/interaction`; the duplicate `@zos/ui` reference page was removed from the current official docs.
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

### Body temperature and workout navigation

- `BodyTemperature` starts at `3.0`, requires `data:user.hd.body_temp`, and its current result is documented with `current` and `time` fields; older docs called the latter `timeinterval`
- at `4.2+`, `Workout.getWorkoutTrackNavInfo()` includes an `update` flag indicating whether navigation data needs refreshing

## Audio and feedback

- `Buzzer` lives under `@zos/sensor`
- `SystemSounds` also lives under `@zos/sensor`, but it starts at `API_LEVEL 3.6`
- check capability before use
- for deterministic in-app audio, use `@zos/media`; create a `Player` with `create(id.PLAYER)`, set an asset-relative or `data://` source, then prepare it before playback
- `@zos/media` starts at `3.0`; percentage-based `Player.seek(...)` starts at `4.2`, while second-based `Player.seekTo(...)` starts at `4.3`
- create a `Recorder` with `create(id.RECORDER)`; the documented recorder format is OPUS and its target belongs under `data://`
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
- for Amazfit Bip Max, check the official dedicated `w432` adaptation path instead of treating it as an ordinary `390 x 450` square target
- in API `4.0+`, prefer Flex layout only when it materially simplifies the screen; otherwise fixed coordinates remain valid and often simpler

## Official references

- UI createWidget: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/createWidget/
- UI widget and method catalog: [21-ui-widget-catalog-and-methods.md](21-ui-widget-catalog-and-methods.md)
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
- BodyTemperature: https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/BodyTemperature/
- Workout: https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Workout/
- Media controller creation: https://docs.zepp.com/docs/reference/device-app-api/newAPI/media/create/
- Media Player: https://docs.zepp.com/docs/reference/device-app-api/newAPI/media/Player/
- Media Recorder: https://docs.zepp.com/docs/reference/device-app-api/newAPI/media/Recorder/
- `showToast`: https://docs.zepp.com/docs/reference/device-app-api/newAPI/interaction/showToast/
- `launchApp`: https://docs.zepp.com/docs/reference/device-app-api/newAPI/router/launchApp/
- Notification API: https://docs.zepp.com/docs/reference/device-app-api/newAPI/notification/notify/
- App Service: https://docs.zepp.com/docs/guides/framework/device/app-service/
- Device info: https://docs.zepp.com/docs/reference/device-app-api/newAPI/device/getDeviceInfo/
