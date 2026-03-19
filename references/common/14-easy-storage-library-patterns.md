# Easy Storage Library Patterns

## When to use this file

Load this file when:

- the repo imports `@silver-zepp/easy-storage`
- code uses `Storage`, `AsyncStorage`, `EasyStorage`, `EasyStorageAsync`, `EasyFlashStorage`, `EasyTempStorage`, or `EasyTSDB`
- the user asks about storage-related UI stutter, large JSON writes, file-backed caches, or time-series storage on the watch
- the project is already built around `@zos/fs`-style persistence rather than official `LocalStorage` or `SessionStorage`

## Source trust order

- The README and per-class markdown docs are detailed and mostly consistent with the published API.
- Use `ts/index.d.ts` for the public method surface.
- Use `src/` and the showcase app for lifecycle guardrails and performance-sensitive usage patterns.
- Do not treat the README's performance claims as universal guarantees on every device; validate on target hardware when storage speed matters.

## Version and permission reality

- The package declares `@min_zeppos 2.0`.
- The showcase app targets `runtime.apiVersion 2.0.0`.
- File-backed persistence still depends on `device:os.local_storage`.
- This library is built on `@zos/fs` helpers, not on official `LocalStorage` or `SessionStorage` classes.
- Treat it as a library-level storage model over the filesystem, not as official Zepp storage behavior.

## Storage model selection

### `Storage`

- Direct blocking file operations such as read, write, remove, list, and stat.
- Good for small files or cases where you need the result immediately.
- Avoid for large or frequent writes on active UI pages.

### `EasyStorage`

- One JSON blob kept in RAM and rewritten to disk on save.
- Good for small settings, preferences, and compact watch-local snapshots.
- Not a good fit for large datasets or hot write loops because the whole file is rewritten.

### `AsyncStorage`

- Queued JSON file operations that try to stay responsive during read and write work.
- Good for larger payloads, repeated file writes, or pages where sync I/O would visibly stall the UI.
- Use `IsBusy()` to avoid pushing too much work into the queue during interaction-heavy flows.

### `EasyStorageAsync`

- RAM-backed key-value API with async persistence and the same overall model as `EasyStorage`.
- Good when the repo already wants `EasyStorage` semantics but synchronous saves cause stutter.
- Initial load is lazy and async, so immediate reads can be stale or `undefined` until readiness is handled.

### `EasyFlashStorage`

- One file per key, lower RAM pressure, and less full-file rewriting than single-blob storage.
- Good for larger datasets, medium-sized JSON objects, or cases where partial corruption isolation matters more than snapshot simplicity.

### `EasyTempStorage`

- RAM-only key-value storage with no disk persistence.
- Good for session caches, temporary UI state, and data that should disappear automatically on exit.

### `EasyTSDB`

- Time-series storage for append-heavy logs, metrics, and sensor history.
- Good for historical watch data such as heart rate samples, motion series, or derived telemetry.
- Prefer it for time-series data, not for normal settings or general key-value persistence.

## Lifecycle guardrails

- Call `AsyncStorage.SaveAndQuit()` during `onDestroy()` or an equivalent shutdown path when pending async writes may still exist.
- Call `EasyStorageAsync.saveAndQuit()` on shutdown for the same reason.
- If `EasyStorageAsync` data is needed immediately on page open, check `isReady()` and use `synchronize()` only when the synchronous fallback is actually necessary.
- Call `EasyTSDB.databaseClose()` before exit so pending writes and index state are flushed cleanly.
- Use `EasyTSDB.flush()` when runtime logic needs deterministic persistence before the normal autosave window.

## Model-specific cautions

- `EasyStorage` and `EasyStorageAsync` default to `easy_storage.json`; changing the filename changes the persistence scope.
- `EasyStorageAsync.getKey()` can return default or `undefined` values before the initial async load completes.
- `EasyFlashStorage` uses key names as file names, so keep keys predictable and filesystem-safe.
- `EasyTSDB` defaults to `time_frame: "hour"`; the docs explicitly describe minute granularity as a path to use only when truly needed.
- `EasyTSDB` caches query results; be careful about live-after-write expectations unless the path is validated in the actual repo.
- `EasyTSDB` backup, restore, and index-rebuild flows show source-level risk and should be treated as advanced paths that need extra validation before recommendation.
- `EasyTSDB` source contains a UTC-related workaround; time-range queries should be verified on target hardware before promising exact behavior.

## Safe recommendations

- If a repo already uses official `LocalStorage` or `SessionStorage`, do not rewrite it to `@silver-zepp/easy-storage` unless the user explicitly wants that migration.
- If a repo already uses `@silver-zepp/easy-storage`, keep the selected storage model unless the current symptoms clearly justify a change.
- Prefer `AsyncStorage` or `EasyStorageAsync` when the page writes during active interaction and sync I/O would affect UX.
- Prefer `EasyFlashStorage` when a single-blob store is becoming too large or too rewrite-heavy.
- Prefer `EasyTSDB` for append-heavy sensor history, but keep backup, restore, and exact time-range guidance conservative unless validated.
- Separate simulator verification from real-device verification when making performance claims about storage behavior.
