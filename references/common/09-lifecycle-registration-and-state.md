# Lifecycle, Registration, and State

## App registration

- `App()` must be called once in `app.js`.
- `globalData` is the standard place for mini-program-wide in-memory state.
- `onCreate` runs when the mini program instance is created.
- `onDestroy` runs when the mini program is destroyed.
- Use `getApp()` to read or mutate the global app instance.

## Bridge ownership pattern

For watch <-> phone sync, the most stable default ownership is:

- create the device-side bridge in `App.onCreate()`
- tear it down in `App.onDestroy()`
- let `AppSideService.onInit()` start the phone-side listener
- let pages request business actions such as bootstrap or retry, rather than owning the transport lifecycle

This keeps page rebuilds, router transitions, and page-level debugging from accidentally creating multiple competing bridge instances.

## Device page registration

- Every device page file must call `Page()` exactly once.
- Every page path must also be registered in `targets.*.module.page.pages`.
- `onInit(params)` is the place to read router params and initialize state.
- `build()` is the recommended place for drawing UI widgets.
- `onDestroy()` is the place for cleanup.
- Use `getCurrentPage()` when code needs the current page instance.

## Side Service lifecycle

- Side Service uses `AppSideService(...)`.
- The common companion entry path is `app-side/index.js`, though the exact path is configured in `app.json`.
- `onInit()` is the companion startup hook.
- `onRun()` is the active companion hook.
- `onDestroy()` is the companion cleanup hook.

## Settings App lifecycle

- Settings App uses `AppSettingsPage(...)`.
- It has a single `build(props)` lifecycle.
- `props.settingsStorage` is the entry point for persistent phone-side settings.
- The Settings App re-renders reactively when `SettingsStorage` changes.

## App Service lifecycle

- App Service exists only from `API_LEVEL 3.0`.
- App Service files register with `AppService(...)`.
- `onInit(params)` runs when the service starts.
- `onDestroy()` runs when the service exits.
- Start or stop continuous services from the Device App with `@zos/app-service`.
- Exit the currently running service from inside the service with `exit()`.

For `1.0` and `2.x` targets, skip App Service lifecycle design entirely and keep the flow in Device App or Side Service surfaces.

## State-sharing patterns

Choose the narrowest shared-state tool that fits the task:

- router params for one-way navigation data
- `getApp()._options.globalData` for in-memory app-wide state
- `SessionStorage` for cross-page state within one mini-program session
- `LocalStorage` for persistent watch-local state
- `settingsStorage` for persistent phone-side settings shared with Side Service

## Cross-page communication defaults

- Use router params for simple one-way page jumps.
- Use the global app object when a child page needs to update state that the previous page reads after `back()`.
- Use `SessionStorage` when state should not be tied to one page instance.

## Official references

- Register mini program: https://docs.zepp.com/docs/guides/framework/device/app/
- App constructor: https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/App/
- getApp: https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/getApp/
- Register page and draw widgets: https://docs.zepp.com/docs/guides/framework/device/page/
- Page constructor: https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/Page/
- getCurrentPage: https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/getCurrentPage/
- Register Settings App: https://docs.zepp.com/docs/guides/framework/app-settings/register/
- Register for Side Service: https://docs.zepp.com/docs/guides/framework/side-service/register/
- Folder Structure: https://docs.zepp.com/docs/guides/architecture/folder-structure/
- AppService constructor: https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/AppService/
- App Service `start`: https://docs.zepp.com/docs/reference/device-app-api/newAPI/app-service/start/
- App Service `stop`: https://docs.zepp.com/docs/reference/device-app-api/newAPI/app-service/stop/
- App Service `exit`: https://docs.zepp.com/docs/reference/device-app-api/newAPI/app-service/exit/
- Cross-page communications: https://docs.zepp.com/docs/guides/best-practice/cross-page-communications/
- LocalStorage: https://docs.zepp.com/docs/reference/device-app-api/newAPI/storage/localStorage/
- SessionStorage: https://docs.zepp.com/docs/reference/device-app-api/newAPI/storage/sessionStorage/
