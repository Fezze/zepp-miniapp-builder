# Settings Sync and Storage

## Ownership model

Treat storage as owned by the surface that edits or depends on it most.

### Phone-owned preferences

Store in `settingsStorage` when values are edited in the Settings App and should become the canonical phone-side snapshot.

Examples:

- default modes
- default speed or behavior profiles
- user toggles
- launch preferences

### Phone-owned auth and secrets

If a Zepp project depends on Huami, Zepp, or other OAuth-style account authorization:

- run the auth flow in the phone-native layer or backend, not in Device App pages
- treat `accessToken`, `refreshToken`, `region`, package-registration data, and signature checks as phone-side or backend concerns
- do not persist long-lived secrets in watch-local storage unless the project has an explicit and reviewed reason
- send only minimal derived data to the watch, such as account profile snapshots, short-lived session state, or API results already authorized on the phone side
- plan for phone-side failure modes such as invalid signature or registration, target app not installed, unsupported target version, login required, and network failure

Important `settingsStorage` behavior:

- values are persisted in the Zepp App
- both Settings App and Side Service can access them
- values are stored as strings
- Side Service can listen to `change` events
- Settings App is already reactive, so explicit listeners are primarily a Side Service concern

### Watch-local state

Store locally on the watch when values must support instant startup or remain device-local.

Examples:

- last active runtime state
- cached settings snapshot
- current session progress
- tutorial or onboarding completion flags

### Session-wide watch state

Use `SessionStorage` when the data should live only for the current mini-program session and be cleared after exit.

### Persistent watch-local state

Use `LocalStorage` when the data should survive app restarts and be cleared only when the mini-program is uninstalled.

Important `LocalStorage` behavior:

- requires `device:os.local_storage`
- is available in modern class form as `new LocalStorage()`
- stores key-value pairs locally on the watch

### Library-level storage layers

- If the repo imports `@silver-zepp/easy-storage`, read `14-easy-storage-library-patterns` before replacing it with official storage APIs.
- Treat `@silver-zepp/easy-storage` as a filesystem-based library layer with its own lifecycle rules such as `SaveAndQuit()` and `databaseClose()`, not as a synonym for official `LocalStorage` or `SessionStorage`.

## Sync path

Common runtime flow:

```text
Settings App
  -> settingsStorage
  -> Side Service
  -> messaging.peerSocket
  -> Device App
```

If the watch-side design uses BLE integration, that bridge belongs to the device runtime architecture, not to the Settings App directly.

## Design guidance

- Normalize settings in one place when possible.
- Let the watch boot from a local snapshot first, then refresh from the phone-side bridge.
- Treat bridge sync as refresh, not as the only source of truth for a running watch session.
- Preserve watch-only state instead of overwriting it blindly with phone snapshots.

## Messaging guidance

- use explicit message types
- keep payloads versionable
- use one normalization function for encode/decode if the project has a shared module
- define how live updates affect active runtime behavior
- if the repo targets API `4.0+`, consider `stringToBuffer` and `bufferToString` helpers for ArrayBuffer-based payloads

## File transfer

If the app needs downloadable assets or content packs, consider the transfer-file path between Side Service and Device App instead of hard-coding everything into the package.

## Official references

- Settings Storage API: https://docs.zepp.com/docs/reference/app-settings-api/settings-storage/
- Register Settings App: https://docs.zepp.com/docs/guides/framework/app-settings/register/
- Messaging API: https://docs.zepp.com/docs/reference/side-service-api/messaging/
- BLE: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ble/
- Transfer file: https://docs.zepp.com/docs/reference/side-service-api/transfer-file/
- Overall architecture: https://docs.zepp.com/docs/guides/architecture/arc/
- LocalStorage: https://docs.zepp.com/docs/reference/device-app-api/newAPI/storage/localStorage/
- SessionStorage: https://docs.zepp.com/docs/reference/device-app-api/newAPI/storage/sessionStorage/
- stringToBuffer: https://docs.zepp.com/docs/reference/device-app-api/newAPI/utils/stringToBuffer/
- bufferToString: https://docs.zepp.com/docs/reference/device-app-api/newAPI/utils/bufferToString/
