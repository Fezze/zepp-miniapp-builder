# Visual Logger Library Patterns

## When to use this file

Load this file when:

- the repo imports `@silver-zepp/vis-log`
- code creates `new VisLog()`, `new VisLogAppSide()`, or `new VisLogAppSettings()`
- the user needs on-device debug overlays or wants `app-side` / `setting` logs visible on hardware
- the project already uses ZML wrappers to coordinate page and side-service messaging

## Source trust order

- The README is good for onboarding, installation splits, and logger-setting semantics.
- Use `2.0/ts/*.d.ts` for the public method surface and exported entrypoints.
- Use `example-app/3.0` for the intended `page` + `app-side` + `setting` wiring pattern.
- Use `2.0/dist/vis-side/*.src.js` for the actual relay flow and cleanup caveats.
- Treat the legacy `1.0/` script as a separate distribution path rather than proof that all npm-package behavior works on `1.0`.

## Version and package reality

- ZeppOS `1.0` is supported through a separate standalone script, not the npm package workflow.
- The published `@silver-zepp/vis-log` package is the `2.0+` path.
- Simple on-screen page logging works without `app-side/` participation.
- The bundled AppSide and AppSettings example targets `API_LEVEL 3.0` and uses `page`, `app-side`, and `setting` modules together.
- The README explicitly requires `@zeppos/zml` when using AppSide or AppSettings logging.
- `app.js` logging is described as console-only, not as a device overlay.

## What VisLog changes

- VisLog is a debugging overlay and relay helper, not a replacement for Zepp runtime logging or architecture.
- Normal `Page`, `AppSideService`, `AppSettingsPage`, and `app.json` module registration rules still apply.
- The page overlay is still just another widget layer, so draw order matters.
- This library is most useful when simulator or Zepp App logging leaves gaps, especially for `setting/` debugging on real hardware.

## Public API by surface

### `VisLog`

- `log`, `info`, `warn`, `error`, `debug`
- `clear`, `refresh`, `updateSettings`, `destroy`
- `initSideRelay(vm, callback, options?)`
- `handleSideServiceCall(data)`

### `VisLogAppSide`

- `attachSideRelay(sideService, options?)`
- `detachSideRelay()`
- relays side-origin logs directly and forwards settings-origin logs to the device page

### `VisLogAppSettings`

- `attachSettingsRelay(settingsStorage, options?)`
- `initialized()`, `clear()`, `destroy()`
- writes debug entries into `settingsStorage` for later relay

## Relay model

- `VisLogAppSettings` serializes log entries into `settingsStorage` under a debug-key prefix.
- `VisLogAppSide` subscribes to `settings.settingsStorage` changes, converts matching values back into log entries, and forwards them through `this.call({ type: "VIS_DBG_LOG", data })`.
- The device page must initialize relay handling with `vis.initSideRelay(this, ...)`.
- The device page must also call `vis.handleSideServiceCall(data)` from `onCall(...)` or the relayed messages will be dropped.
- Practical consequence: AppSettings-to-device logs are a multi-hop relay, not a native Zepp console feature.

## UI and lifecycle gotchas

- If the overlay disappears behind other widgets, call `vis.refresh()` or make the first log happen after the rest of the page widgets are drawn.
- `padding_multiplier` and `margin` may need adjustment on non-`480` design widths or round screens.
- `text_style` expects `hmUI.text_style.*` values or equivalent numeric enums.
- `attachSettingsRelay(..., { clear_on_init: true })` clears old debug keys by default.
- `detachSideRelay()` only removes the settings listener when `settingsStorage.removeListener` exists; teardown behavior should be validated on the actual runtime if repeated attach/detach cycles matter.

## Safe recommendations

- Use VisLog as a debug-only aid; do not present it as normal end-user UI.
- If a repo only needs page-local logs, keep the simpler `VisLog` path and do not force ZML or side-service integration.
- If a repo needs `setting/` logs on hardware, VisLog is a credible workaround, but it still needs explicit page, side-service, and settings wiring.
- Treat `app.js` support as console visibility only unless the repo already proves a page-bound relay path.
- Keep simulator verification separate from device verification; overlay placement and text fit are device-sensitive.
