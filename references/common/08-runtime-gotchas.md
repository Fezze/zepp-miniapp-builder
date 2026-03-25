# Runtime Gotchas

This file keeps generalized Zepp-specific notes that are broadly reusable. Each note is labeled as either an official documentation point or a verified field note.

## Sensors and permissions

- Official doc: Manifest permissions matter. If the app uses a protected capability such as the accelerometer or gyroscope, declare the relevant permission in `app.json` or the runtime call may fail. Source: https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Accelerometer/ and https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Gyroscope/
- Official doc: Use `queryPermission` and `requestPermission` for runtime permission flow instead of assuming the manifest declaration alone is enough for the UX. Source: https://docs.zepp.com/docs/reference/device-app-api/newAPI/app/queryPermission/
- Official doc: Accelerometer values are reported in `cm/s^2`; gyroscope values are angular velocity in `DPS`. These are different signals and should not be substituted blindly. Source: https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Accelerometer/ and https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Gyroscope/
- Verified field note: For tilt-heavy interactions, accelerometer is usually the primary sensor, while gyroscope is optional for responsiveness or hybrid motion logic.
- Verified field note: Real hardware can have resting sensor bias. Neutral baseline calibration and manual re-center actions are often worth adding for motion-driven UX.

## Display and lifecycle

- Official doc: Sensor-driven apps may need display anti-sleep APIs to keep interaction active while the user is moving the watch. Source: https://docs.zepp.com/docs/reference/device-app-api/newAPI/display/setPageBrightTime/
- Official doc: App Service has no UI, cannot use timer globals such as `setTimeout`, and cannot access high-power sensors such as accelerometer, geolocation, or gyroscope. Source: https://docs.zepp.com/docs/guides/framework/device/app-service/
- Official doc: Single-execution App Service is system-limited to about `600ms`, and only one continuously running App Service is guaranteed at a time. Source: https://docs.zepp.com/docs/guides/framework/device/app-service/
- Official doc: `createSysTimer` starts at `API_LEVEL 4.0` and runs regardless of watch screen state. Use it only when the feature should keep progressing off-screen; it is not the default answer for every visible-page redraw loop. Source: https://docs.zepp.com/docs/reference/device-app-api/newAPI/timer/createSysTimer/
- Verified field note: For timed-step sessions, resume from timestamps and reducer state instead of replaying missed ticks. A single resume transition should decide whether the step stays active, auto-advances, or enters `waiting_for_confirm`.

## UI rendering

- Official doc: `getDeviceInfo()` requires `data:os.device.info`; if that permission is missing, the runtime can throw `PERMISSION DENIED data:os.device.info`, including in simulator debugging. Source: https://docs.zepp.com/docs/reference/device-app-api/newAPI/device/getDeviceInfo/
- Official doc: `CANVAS` exists in current docs, but support is API- and implementation-sensitive. Check the widget page and runtime compatibility before relying on advanced paths. Source: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/CANVAS/
- Official doc: page UI is built through the `Page` lifecycle rather than DOM-style reactivity; `build()` is a lifecycle step, not a reactive binding system. Source: https://docs.zepp.com/docs/guides/framework/device/page/ and https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/Page/
- Official doc: `replace(...)` closes the current page and jumps to another in-app page; paired with normal page lifecycle, it is a deliberate full-rebuild path when in-place widget mutation becomes too brittle. Source: https://docs.zepp.com/docs/v2/guides/framework/device/router/ and https://docs.zepp.com/docs/reference/device-app-api/newAPI/router/replace/
- Verified field note: updating shared cache after sync does not automatically rerender an already-open `hmUI` page. Use next-navigation rebuild when delayed visibility is fine, or add an explicit refresh hook when visible widgets must change immediately.
- Verified field note: cache-only plus rebuild-on-next-navigation is usually enough for background sync or hidden data; immediate on-screen sync needs a deliberate redraw path.
- Verified field note: Choose one refresh strategy per live page and keep it explicit: update widgets in place for cheap localized changes, use `replace(...)` or rebuild for full-screen shape changes, or route updates through a tiny runtime store/event bus when multiple widgets depend on the same live state.
- Verified field note: In simulator console output, a later `ui pause` line does not by itself prove that the current page crashed during `build()`. Add explicit start and finish logs around page render or other targeted instrumentation before classifying a simulator black screen as a widget-build failure.
- Verified field note: Method presence on a canvas object does not guarantee visible output on every device runtime. Capability probing plus fallback rendering paths is safer than assuming one draw method always works.
- Verified field note: Thin `drawArc` or `drawRect` rendering can behave like a no-op on some runtimes. Keep a fallback path using line segments or simpler primitives when rendering must be reliable.
- Verified field note: `canvas.clear()` may leave stale graphics in some redraw/reset flows. Recreating the `CANVAS` widget can be safer than relying on in-place clear alone.

## Layout and input

- Official doc: `onGesture` registration is page-scoped; re-registering replaces the previous handler, so cleanup matters. Source: https://docs.zepp.com/docs/reference/device-app-api/newAPI/interaction/onGesture/
- Verified field note: Do not make digital crown the only control path unless target hardware is guaranteed to provide it.
- Verified field note: On small watch screens, browsing flows should degrade intentionally. Show one or two strong rows or actions per screen, switch to pagination or `show more` before button slots overflow, keep obvious empty states, and re-evaluate the visible slice after sync or filter changes.
- Official doc: Widgets and shortcut cards cannot use swipe, gesture, key events, or scroll/stack-style widgets such as `SCROLL_LIST` and `VIEW_CONTAINER`; they are click-oriented surfaces with bounded drawing areas. Source: https://docs.zepp.com/docs/guides/framework/device/secondary-widget/

## Audio

- Official doc: `Buzzer` and `SystemSounds` are part of `@zos/sensor`, but `SystemSounds` starts at `API_LEVEL 3.6`; capability and system settings affect whether feedback is actually audible. Source: https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/ and https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/SystemSounds/ and https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Buzzer/
- Official doc: System sound output can still be suppressed by system modes such as DND, sleep, theater, or power-saving states. Source: https://docs.zepp.com/docs/reference/device-app-api/newAPI/settings/getSystemMode/
- Official doc: For deterministic in-app playback, prefer `@zos/media` with bundled files and validate media lifecycle behavior. Source: https://docs.zepp.com/docs/reference/device-app-api/newAPI/media/
- Verified field note: Trigger sound or haptic cues on step transitions or explicit confirmations, not on every timer tick.

## Tooling and debugging

- Official doc: Simulator debugging does not currently support breakpoints; use logs and built-in debug panels. Source: https://docs.zepp.com/docs/guides/tools/simulator/dev/
- Official doc: Simulator debug panels can mock sensor values, which is useful before real-device deployment. Source: https://docs.zepp.com/docs/guides/tools/simulator/dev/
- Official doc: Zepp App developer mode exposes Device App and Side Service logs, while Settings App logs are not available there. Source: https://docs.zepp.com/docs/guides/tools/zepp-app/
- Verified field note: `@silver-zepp/vis-log` can work around missing `setting/` console visibility by writing debug entries through `settingsStorage`, relaying them in `app-side`, and rendering them on a device page overlay. This is a library-specific workaround, not an official Zepp logging surface.
- Verified field note: `zeus build` may pick up non-hidden test trees as inputs in some setups. Keeping tests under a hidden root such as `.test/` reduces the chance of bundling unsupported test dependencies into the app build.
- Official doc: Companion widgets and shortcut cards should use `try/catch` in lifecycle handlers during debugging because JS errors can leave the simulator stuck. Source: https://docs.zepp.com/docs/guides/framework/device/secondary-widget/

## Testing posture

- Official doc: Pure JavaScript logic can be tested with standard JS frameworks outside the watch runtime, but widget/runtime behavior still needs simulator or device validation. Source: https://docs.zepp.com/docs/v2/guides/best-practice/code-organization/ and https://docs.zepp.com/docs/guides/quick-start/
