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
- when a seed catalog grows over time, track a seed-library version separately from ordinary sync revisions and add only newly introduced seed records during migration
- additive seed migrations must not resurrect older seed records that the user already deleted on purpose
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
- the singleton `localStorage` form starts at `2.0`
- the `3.0+` class form `new LocalStorage(storagePath?)` keeps loaded data in memory for repeated access and can use a custom storage file
- stores key-value pairs locally on the watch

`SessionStorage` and the `sessionStorage` singleton keep data only until the
mini-program exits. Separate `SessionStorage` instances have independent
in-memory state, which is useful when temporary domains should stay isolated.

### Typed and cross-application storage (`3.0+`)

Use `TypedStorage` from `@zos/storage` for primitive booleans, integers,
64-bit integers, doubles, and strings backed by system properties. An optional
scope isolates key groups.

Cross-application storage has deliberately asymmetric roles:

- the provider writes JSON through `ShareLocalStorage` or primitive values through `ShareTypedStorage`, both from `@zos/storage`
- the consumer supplies the provider's `appId` and reads through the read-only `LocalStorage` or `TypedStorage` classes from `@zos/share-storage`
- custom JSON storage paths and typed-storage scopes must match on both sides
- `FileSystem` from `@zos/share-storage` can inspect and read known files belonging to another app, but exposes no write methods
- shared JSON storage still requires `device:os.local_storage`; verify permissions for the concrete producer API in the target manifest

Do not use shared storage as an implicit mutable database between apps. Keep
one writer/owner, version the published schema, validate all values at the
consumer boundary, and handle missing provider data through `isExisted()` or
file-stat checks.

### Watch-side crypto (`3.0+`)

The official `@zos/crypto` module documents these device-side operations:

- AES-CBC through `createCrypto(alg.AES_CBC, ...)`; plaintext length must be a multiple of 16 bytes and the documented key size is 128 bits
- CRC16 and CRC32 checksums, returned in little-endian form
- one-shot and streaming MD5, SHA-1, SHA-256, and corresponding HMAC digests
- ECDSA key generation, signing, and verification for the documented K1 curves
- `encryptKey(...)` for PUF hardware-backed AES key encryption; input must be a multiple of 16 bytes

Treat these as exact firmware APIs, not Web Crypto equivalents. Check local
types and the official page for the selected algorithm, especially the unusual
documented ECDSA digest constraints and `undefined` failure results. Encryption
does not by itself define authentication, key rotation, secure transport, or a
safe long-lived credential design.

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

Important separation rules:

- `setting/` is not the bridge; it edits data and persists canonical phone-side state
- `app-side/` is the main phone-side runtime that should observe `settingsStorage` and talk to the watch
- `messaging.peerSocket` is the phone-side transport layer, not the Settings App itself
- if the watch-side design also uses BLE, keep that device-side path separate from the companion sync path even when the same feature uses both

Practical guidance for sync payloads:

- keep app-level message names explicit and versionable
- keep the sync envelope separate from lower-level transport chunking
- if a bootstrap snapshot is large, chunk it below the app-level sync envelope rather than turning one logical sync message into partial business payloads with unclear semantics
- assume large catalogs or snapshots may exceed one transport frame and design the sync path accordingly

If the watch-side design uses BLE integration, that bridge belongs to the device runtime architecture, not to the Settings App directly. Keep the companion sync path and the watch-side BLE path as separate layers even when the same feature uses both.

## Design guidance

- Normalize settings in one place when possible.
- Let the watch boot from a local snapshot first, then refresh from the phone-side bridge.
- Treat bridge sync as refresh, not as the only source of truth for a running watch session.
- Preserve watch-only state instead of overwriting it blindly with phone snapshots.
- Keep first paint independent from an immediate successful bridge send. If the current runtime makes watch-side transport temporarily unavailable, the initial page should still render from cache or fallback data while sync remains best-effort.

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

## Active session and history semantics

When a feature evolves from simple sync into on-watch execution:

- add `active_session_v1` only after the product defines what resume means for an expired or interrupted timed step
- persist enough reducer state and timestamps to recompute elapsed on resume; avoid designs that require replaying missed ticks
- let one history-finalization path decide how `completed`, `aborted`, and partial-step runs are written
- decide up front whether an interrupted current step counts as completed, partial, skipped, or neither, and derive `completedSteps` from that rule instead of ad hoc UI math
- compute deviation from persisted timestamps and planned durations, not from the number of visible timer ticks that happened while a page was open
- if an expired step should wait for explicit confirmation rather than auto-advance, make that a named reducer state such as `waiting_for_confirm` instead of an implicit UI flag

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
- localStorage singleton: https://docs.zepp.com/docs/reference/device-app-api/newAPI/storage/localStorage-instance/
- sessionStorage singleton: https://docs.zepp.com/docs/reference/device-app-api/newAPI/storage/sessionStorage-instance/
- TypedStorage: https://docs.zepp.com/docs/reference/device-app-api/newAPI/storage/TypedStorage/
- ShareLocalStorage: https://docs.zepp.com/docs/reference/device-app-api/newAPI/storage/ShareLocalStorage/
- ShareTypedStorage: https://docs.zepp.com/docs/reference/device-app-api/newAPI/storage/ShareTypedStorage/
- Cross-app FileSystem: https://docs.zepp.com/docs/reference/device-app-api/newAPI/share-storage/FileSystem/
- Cross-app LocalStorage: https://docs.zepp.com/docs/reference/device-app-api/newAPI/share-storage/LocalStorage/
- Cross-app TypedStorage: https://docs.zepp.com/docs/reference/device-app-api/newAPI/share-storage/TypedStorage/
- AES-CBC: https://docs.zepp.com/docs/reference/device-app-api/newAPI/crypto/AESCrypto/
- CRC checksums: https://docs.zepp.com/docs/reference/device-app-api/newAPI/crypto/CRCCrypto/
- Digests and HMAC: https://docs.zepp.com/docs/reference/device-app-api/newAPI/crypto/DigestCrypto/
- ECDSA: https://docs.zepp.com/docs/reference/device-app-api/newAPI/crypto/ECDSACrypto/
- Hardware-key encryption: https://docs.zepp.com/docs/reference/device-app-api/newAPI/crypto/encryptKey/
- stringToBuffer: https://docs.zepp.com/docs/reference/device-app-api/newAPI/utils/stringToBuffer/
- bufferToString: https://docs.zepp.com/docs/reference/device-app-api/newAPI/utils/bufferToString/
