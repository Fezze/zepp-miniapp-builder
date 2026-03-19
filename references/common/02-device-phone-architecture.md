# Device, Phone, and Service Architecture

## Main app surfaces

Zepp mini-apps can span several surfaces. Keep responsibilities separate.

### Device App

- Runs on the watch.
- Owns watch UI, page lifecycle, local runtime behavior, sensors, and on-device interactions.
- Lives mainly under `page/`.

### Settings App

- Runs on the phone side.
- Exposes persistent preferences to the user.
- Lives under `setting/`.

### Side Service

- Runs on the phone side.
- Bridges stored preferences, messages, or file transfer to the watch.
- Lives under `app-side/`.

### App Service

- Runs on the watch without a visible UI page.
- Starts at `API_LEVEL 3.0`; do not propose it for `1.0` or `2.x` targets.
- Useful for background workflows, timers, reminders, or notification-triggered actions.
- Supports two broad modes:
  - single execution triggered by alarms, notifications, or system events
  - continuous running started from the Device App

### SecondaryWidget and AppWidget

- Optional watch companion surfaces that belong to the mini-app.
- `SecondaryWidget` targets widget pages.
- `AppWidget` targets shortcut cards.
- Useful for glanceable information or quick entry into the main app.

## Communication rule

Do not assume the Settings App talks directly to the Device App.

Preferred flow:

```text
Settings App
  -> settingsStorage
  -> Side Service
  -> messaging.peerSocket
  -> Device App
```

BLE can be part of the watch-side integration when the runtime design requires it.
For companion widgets and shortcut cards, real-time BLE display should still be initialized from the main page layer, not assumed inside the widget surface.

## When to use each surface

- Put visible watch UI in Device App pages.
- Put persistent phone-side preferences in Settings App.
- Put cross-surface sync logic in Side Service.
- Put background watch-only logic in App Service only when the runtime target is `3.0+`.
- Use SecondaryWidget or AppWidget only when the target device supports them and the UX fits glanceable or entry-point behavior.

## Practical architecture choices

- Keep watch-local state for instant startup or offline resilience.
- Keep phone-owned preferences in `settingsStorage`.
- Normalize message formats in one shared contract module when the project structure allows it.
- Treat sync as additive: the watch should remain usable if the phone bridge is temporarily unavailable.

## Common patterns

### Watch-local storage

Good for:

- last used mode
- local progression state
- cached runtime preferences
- flags such as tutorial or onboarding completion

### Phone-side storage

Good for:

- defaults shared with the watch session
- user preferences edited from the phone
- settings that should survive reinstall or app restarts on the phone side

### Side Service responsibilities

- listen for `settingsStorage` changes
- normalize a current snapshot
- send updates over `messaging.peerSocket`
- answer explicit sync requests
- optionally transfer files to the device app

## App Service constraints that affect architecture

- App Service starts at `API_LEVEL 3.0`.
- Continuous App Service requires `device:os.bg_service`.
- Continuous App Service also needs runtime permission flow in addition to manifest permission.
- Single-execution App Service is recommended when it fits the use case because it uses fewer resources.
- App Service has no UI.
- High-power sensors such as `Accelerometer`, `Geolocation`, and `Gyroscope` are not available in App Service.
- Timer interfaces such as `setTimeout` are not available in App Service.
- Single-execution App Service is system-limited to about `600ms`.
- Only one continuously running App Service instance is guaranteed to run at a time.

## Official references

- Overall architecture: https://docs.zepp.com/docs/guides/architecture/arc/
- Register mini program: https://docs.zepp.com/docs/guides/framework/device/app/
- Register Settings App: https://docs.zepp.com/docs/guides/framework/app-settings/register/
- Settings Storage API: https://docs.zepp.com/docs/reference/app-settings-api/settings-storage/
- Messaging API: https://docs.zepp.com/docs/reference/side-service-api/messaging/
- Transfer file: https://docs.zepp.com/docs/reference/side-service-api/transfer-file/
- BLE: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ble/
- App Service guide: https://docs.zepp.com/docs/guides/framework/device/app-service/
- AppService constructor: https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/AppService/
- Register SecondaryWidget and Shortcut Cards: https://docs.zepp.com/docs/guides/framework/device/secondary-widget/
- SecondaryWidget constructor: https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/SecondaryWidget/
- AppWidget constructor: https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/AppWidget/
