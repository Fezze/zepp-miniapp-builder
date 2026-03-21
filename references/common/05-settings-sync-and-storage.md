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

## Seed and migration hygiene

- treat seed or init logic as idempotent; it should be safe to run more than once without duplicating records or clobbering valid data
- because `settingsStorage` stores strings, keep parse/stringify and validation in one helper layer instead of scattering ad hoc JSON handling through UI code
- seed missing keys selectively; do not rewrite the whole storage set just because one key is absent
- prefer independent keys over one giant blob so partial repair is possible when one value is corrupt

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

## Domain storage vs UI state storage

- keep sync-relevant domain data in dedicated keys that model actual entities or normalized snapshots
- keep transient UI state such as `view`, `selectedId`, filters, and editor drafts in separate UI-only keys
- Side Service sync should ignore UI-only keys unless there is an explicit product reason to mirror them to the watch
- do not let temporary draft or navigation state leak into the watch-facing payload by default

## Settings CRUD baseline

For larger `setting/` flows, a production-safe baseline is:

- `Tool`: read-only seeded catalog data
- `RecipeRecord`: full editable record
- `RecipeSummary`: denormalized list-row payload used by the main index
- `HistoryEntry`: append-only execution or audit row

Recommended key family:

- `tools_catalog_v1`
- `recipes_index_v1`
- `recipe_record:<id>`
- `history_index_v1`
- `history_entry:<id>`
- optional `recipes_ui_state_v1` for draft or routing state that does not participate in sync

Recommended behavior:

- list views read summaries from the index instead of hydrating every full record on first paint
- editor views read and write one full record at a time
- history views read append-only history entries
- deleting a recipe removes its summary and main record but keeps history unless the product explicitly requires cascading delete
- one `AppSettingsPage(...)` root can safely implement `list -> editor -> history` by switching userland view state rather than pretending the surface is a multi-page web router
- if the actual settings implementation lives in `setting/index.jsx`, keep a tiny `setting/index.js` shim so Zeus still finds the expected Settings App entry file

## Sync path

Common runtime flow:

```text
Settings App
  -> settingsStorage
  -> Side Service (phone)
  -> messaging.peerSocket (phone-side bridge)
  -> Device App
```

If the watch-side design uses BLE integration, that bridge belongs to the device runtime architecture, not to the Settings App directly. Keep the companion sync path and the watch-side BLE path as separate layers even when the same feature uses both.

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

## Practical API `4.0` baseline

For a minimal watch-to-phone sync loop on `4.0+`, one useful convention is:

- treat the names below as a recommended pattern, not official Zepp terminology
- have the watch request a bootstrap snapshot with `REQUEST_BOOTSTRAP`
- let the phone side answer with one or more `PUSH_*` messages for the current snapshot or catalog slices
- use `UPSERT_HISTORY_ENTRY` for device-originated durable records
- answer those writes with `ACK_HISTORY_ENTRY` after the phone side persists or reconciles them
- keep the watch-side codec narrow: `stringToBuffer`, `bufferToString`, and one shared contract module

## Sync storage baseline

For a first sync-capable watch baseline, a pragmatic key split is:

- `catalog_cache_v1` for the last normalized catalog or reference snapshot
- `last_result_v1` for the last meaningful rendered or fetched result snapshot
- `sync_meta_v1` for cursors, timestamps, bootstrap flags, and ack bookkeeping
- delay `active_session_v1` until resume semantics are explicitly designed and tested

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
