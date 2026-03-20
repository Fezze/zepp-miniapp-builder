# Easy BLE Library Patterns

## When to use this file

Load this file when:

- the repo imports `@silver-zepp/easy-ble` or `@silver-zepp/easy-ble/extra`
- code creates `new BLEMaster()` or uses `ble.read`, `ble.write`, `ble.on`, `ble.off`, or `ble.get`
- the watch acts as a BLE central or master for scanning, connecting, reading, writing, or subscribing to notifications
- the user asks about custom GATT profiles, MAC-driven device selection, notification setup, or BLE queue timeouts

## Source trust order

- Use `easy-ble-npm/ts/ble-master.d.ts` and `easyble-extra.d.ts` for the public method surface and exported helpers.
- Use `easy-ble-npm/dist/ble-master.src.js` for queue behavior, backend caveats, and teardown logic.
- Use example manifests to separate the true library floor from sample-specific permissions and UI helpers.
- Use the README for onboarding, terminology, and the intended happy path, but not as the only source of truth.
- Treat the archived `1.0.0` copy as historical context only, not as guidance for new work.

## Version and permission reality

- The current source marks the library as `@min_zeppos 3.0`.
- Current examples target `runtime.apiVersion 3.0.0`.
- The archived `1.0.0` build is explicitly deprecated and should not drive new recommendations.
- `device:os.ble` is the core permission for watch-side BLE master work.
- `data:os.device.info` appears in the sample apps, but it is not the defining requirement of the library itself.
- Sample permissions such as `data:user.info`, `data:user.health`, `device:os.local_storage`, and `device:os.bg_service` belong to specific demos, not to baseline `easy-ble` usage.

## What easy-ble changes

- `easy-ble` is a wrapper over watch-side `@zos/ble` master APIs, not a separate Zepp runtime model.
- It adds MAC-centric device lookup, generic profile generation, queued reads and writes, conversion helpers, and a cleaner callback surface over raw `hmBle.mst*` calls.
- It does not remove the need for explicit permissions, lifecycle cleanup, or BLE-specific device validation.
- It is aimed at watch-to-peripheral communication, not phone-side BLE ownership.

## Public API surface

### `BLEMaster`

- `startScan`, `stopScan`
- `connect`, `disconnect`, `pair`
- `startListener`, `generateProfileObject`, `quit`
- `SetDebugLevel`

### Namespaced helpers

- `write.characteristic`, `write.descriptor`, `write.enableCharaNotifications`
- `read.characteristic`, `read.descriptor`
- `on.*` and `off.*` callback registration helpers
- `get.devices`, `get.isConnected`, `get.hasMAC`, `get.hasDeviceName`, `get.hasService`, `get.profilePID`, `get.connectionID`

### Exported utilities

- `ab2hex`, `ab2num`, `ab2str`, `arr2ab`, `ab2arr`
- `PERMISSIONS` from `@silver-zepp/easy-ble/extra`

## Operational contract

- Connect first, then generate a profile, then call `startListener(...)`, then begin read or write operations.
- `generateProfileObject(...)` expects a connected device and uses the stored connection ID plus the selected MAC address.
- `write.enableCharaNotifications(...)` is a queued CCCD write to descriptor `2902`, not a separate BLE primitive.
- `write.characteristic(..., true)` uses the fast write-without-response path and bypasses normal queue waiting.
- `get.profilePID()` and `get.connectionID()` are escape hatches for repos that must drop to raw `hmBle.mst*` calls.

## Queue and callback guardrails

- The read and write queue is not fully self-sufficient; it depends on the right callbacks being registered.
- Characteristic writes should register `ble.on.charaWriteComplete(...)` or queued writes can time out.
- Descriptor writes should register `ble.on.descWriteComplete(...)` or queued descriptor operations can time out.
- Characteristic reads should register either `ble.on.charaValueArrived(...)` or `ble.on.charaReadComplete(...)`.
- Descriptor reads should register either `ble.on.descValueArrived(...)` or `ble.on.descReadComplete(...)`.
- `quit()` should be called during `onDestroy()` so callbacks, profile instances, scans, and connections are torn down cleanly.

## Source-level cautions

- `pair()` is explicitly marked as unstable and potentially crash-prone.
- The source documents a backend issue where `mstBuildProfile(...)` does not always trigger `mstOnPrepare(...)`.
- The source documents a backend MAC mismatch during `mstConnect(...)`; the library works around it by trusting the requested MAC address.
- The source also documents long-session instability where BLE can become effectively latched after repeated connections.
- The published dist currently contains a suspicious `connect(...)` call site that references undeclared retry-related identifiers, so app-level reconnect strategies should be treated as sample code, not as a guaranteed library feature.
- The source notes that some non-standard UUID patterns may be unreliable.

## Safe recommendations

- Use `easy-ble` for `3.0+` watch apps that already need central or master BLE flows; do not recommend it for `1.x` or `2.x`.
- Keep library guidance page-centric unless the repo already proves a more unusual surface.
- Prefer scan-before-connect on flaky hardware instead of assuming direct connect is always reliable.
- Keep sample-only extras such as `vis-log`, `autogui`, anti-sleep display calls, and demo permissions out of baseline recommendations.
- Treat `PERMISSIONS.ALL` and custom permission overrides as advanced paths for tricky profiles, encrypted characteristics, or descriptor-heavy devices.
- Separate simulator expectations from real-device validation; BLE reliability and notification timing are hardware-sensitive.
