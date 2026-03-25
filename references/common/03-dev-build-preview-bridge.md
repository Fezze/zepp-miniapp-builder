# Development, Build, Preview, and Bridge

## Environment checks

Use this baseline at the start of Zepp work:

```bash
node -v
npm -v
zeus --version
zeus status
```

The official Zeus CLI docs currently state a baseline dependency of Node.js `>= 14.0.0`.

## Project creation and account setup

### Create a new project

```bash
zeus create my-app
```

Use this when the task is scaffolding a new Zepp app rather than editing an existing repo.

### Template reality check

When docs are ambiguous about file layout or generated scaffolding, create a scratch app with `zeus create` and compare the template output with the current official docs. Treat Zeus templates as secondary truth for toolchain expectations, not as a replacement for docs.

### Login when preview flow needs it

```bash
zeus login
```

Use this before preview or account-linked CLI actions when the environment is not already authenticated.

## Main development loop

### Simulator hot reload

```bash
zeus dev
```

Use this for most iteration on:

- widget layout
- page lifecycle
- routing
- storage behavior
- many non-device-specific logic changes

Verified field note:

- `zeus dev` itself may prompt for explicit preview-device selection when multiple simulator profiles are installed. In one verified Windows workflow, `Amazfit Balance 2` was the correct target for successful deployment.

### Simulator install or update
When the task involves installing or upgrading the Zepp OS Simulator, check the official download page instead of assuming an older binary set.

As of 2026-03-20, the official docs list Simulator `2.1.0` downloads for:

- macOS `arm64`
- macOS `x64`
- Windows `x64`
- Linux `amd64`
- Linux `arm64`

Verified field notes for Linux and Steam Deck style environments:

- When the Linux download is a `.deb` but the host workflow cannot or should not install Debian packages system-wide, a practical fallback is a user-local install by unpacking the `.deb` with `ar` and `tar` into a private directory such as `~/.local/opt/zepp-simulator`, then creating a launcher under `~/.local/bin/`.
- The unpacked Electron launcher may fail in user-local installs unless `ELECTRON_RUN_AS_NODE` is unset and the app is started with `--no-sandbox`.
- On Steam Deck or other immutable Linux systems, the simulator firmware layer may fail even after the GUI launches because the bundled QEMU binary expects shared libraries that are present on Debian-like systems but missing on the host.
- In one verified Steam Deck workflow, the missing QEMU dependencies included `libvte-2.91.so.0`, while the firmware launcher also reported misleading `Permission denied` errors for `qemu-system-arm`.
- A workable fallback for those missing libraries is a private runtime directory such as `~/.local/opt/zepp-simulator/qemu-lib` plus `LD_LIBRARY_PATH` in the launcher, rather than assuming root package installation is possible.
- If the host provides most libraries but one package is missing, prefer copying or symlinking only the minimal runtime dependency into that private directory instead of mutating unrelated system paths.
- When the simulator GUI opens and the app list works but clicking `Emulator` does nothing, inspect the simulator console and firmware startup logs before blaming the app code. The failure may be in the simulator's firmware/QEMU layer rather than in the Zepp app itself.
- If the simulator is packaged for Debian/Ubuntu assumptions, keep real-device validation as the source of truth for hardware behavior even after a Linux-local simulator workaround is in place.

### Package build

```bash
zeus build
```

Use this as the minimum compile check before handoff.

### QR preview

```bash
zeus preview
```

Use this when the user wants to scan and preview from the Zepp App developer mode.

### CLI configuration

```bash
zeus config list
zeus config get <key>
zeus config set <key>=<value>
```

Use this when the task involves CLI environment setup rather than app code.

## Zeus build gotchas

Current `@zeppos/zpm` error strings surface a few practical toolchain assumptions:

- `The icon in app.json is empty or the image does not exist`: re-check `app.icon`, file existence, and target asset layout under `assets/<target>/icon.png` before debugging unrelated UI code.
- `setting/index.js does not exist`: verify the configured Settings App entry path resolves to a real JS file. If the implementation is authored in `index.jsx`, add a tiny `index.js` shim or point the manifest at the actual entry file.

## Bridge workflow

Start bridge mode in the project root:

```bash
zeus bridge
```

Inside the interactive bridge shell, common commands include:

- `connect`
- `install`
- `uninstall`
- `screenshot`

Verified field notes:

- In simulator workflows, `zeus dev` may push the current app build more reliably than bridge `install`. If `install` appears to do nothing in the simulator, prefer `zeus dev` for deployment and keep bridge for connection, screenshots, or target-aware debugging.
- Bridge may prompt for explicit target selection when more than one online device or simulator is visible. Choosing a specific target such as `Balance 2` is expected behavior, not a CLI failure.
- When `zeus dev` or bridge output is quiet, confirm simulator deployment by checking `last_app_info.json`, the deployed app folder under `AppData\Roaming\simulator\apps\<Project><AppId>`, and recent `side-service status:opened` lines in `renderer.log`.
- In Flatpak-hosted Linux IDE sessions, host GUI tools and host Chromium may be invisible inside the sandbox. When browser-based tooling or host screenshots are needed, `flatpak-spawn --host` can be the difference between a blocked workflow and a usable one.
- In Linux simulator UI review, a reliable screenshot loop can be more practical than bridge `screenshot`. A verified host-side flow was:
  1. locate the simulator window with `xdotool search --name "Zepp OS Simulator"`
  2. bring it forward with `xdotool windowactivate <window-id>`
  3. capture the host window with `spectacle -b -n -a -o <output-path>` or another host screenshot tool
  4. repeat after `zeus dev` hot reloads to inspect layout changes
- When the IDE itself is sandboxed, prefer running `xdotool` and `spectacle` through `flatpak-spawn --host` so the commands can see the real host window tree.

## Companion transport reality check

For watch <-> phone mini-app communication, keep the layers distinct:

- `setting/` is the phone-side UI and storage surface
- `app-side/` is the phone-side sync runtime
- `messaging.peerSocket` is the phone-side transport
- watch-side BLE, if present, is a separate device-side transport concern

Verified implementation guidance from official docs and field debugging:

- own the long-lived device bridge in `App.onCreate()` / `App.onDestroy()`, not in one page lifecycle
- let pages trigger app-level requests such as bootstrap or retry, but do not create or destroy the transport per page
- `messaging.peerSocket` is binary-oriented, so treat the phone side as transporting payloads rather than device-page lifecycle messages
- if an initial snapshot is large, add chunking below the app-level sync envelope instead of splitting one logical sync action into ad hoc business fragments
- a simulator may get into a noisy or stale bridge state after repeated redeploys; if transport logs stop making sense, restart the simulator before over-correcting a bridge that already works on real hardware

Practical validation note:

- a successful real-device bootstrap or sync pass is stronger evidence than a flaky simulator-only failure, though it does not replace follow-up checks for retries, writeback, or reconciliation

Historically documented behavior:
- the `screenshot` command saves to `~/desktop/screenShot.png`

## Logging and debug surfaces

### Simulator

- use simulator debug panels
- use `console.log`
- use sensor mocking where available
- when CLI output is insufficient, inspect the Electron shell through the DevTools endpoint exposed in `%AppData%\Roaming\simulator\DevToolsActivePort`; this can be used to read the simulator Console tab, inspect DOM state, and capture screenshots through CDP

### Zepp App developer mode

- can expose Device App logs
- can expose Side Service logs
- is useful for real-device debugging without rebuilding every assumption from scratch
- can show the current device `API_LEVEL`
- watch screenshots taken from the Zepp App are stored on the phone side, typically in the photo gallery

### Real device

- use bridge install/uninstall flow
- verify sensor feel, performance, and rendering edge cases on actual hardware

## When to prefer each path

- `zeus dev`: fastest feedback for most UI/runtime changes
- `zeus preview`: phone-assisted preview flow
- `zeus bridge`: direct install/debug/device workflow
- `zeus build`: compile gate before shipping or handoff

Verified field note:

- When the goal is specifically "get the app onto the simulator", favor `zeus dev` first. Use bridge after that when the simulator is already online and the workflow needs `connect`, `screenshot`, or multi-target selection.

## Official references

- CLI overview: https://docs.zepp.com/docs/guides/tools/cli/overview/
- Folder Structure: https://docs.zepp.com/docs/guides/architecture/folder-structure/
- Zeus CLI commands: https://docs.zepp.com/docs/guides/tools/cli/
- Code adaptations for more Zepp OS devices: https://docs.zepp.com/docs/guides/best-practice/code-adaptations-for-new-devices/
- Simulator downloads: https://docs.zepp.com/docs/guides/tools/simulator/download/
- Quick Start simulator run: https://docs.zepp.com/docs/guides/quick-start/simulator-dev/
- Preview on a watch: https://docs.zepp.com/docs/guides/quick-start/preview/
- Simulator dev/debugging: https://docs.zepp.com/docs/guides/tools/simulator/dev/
- Zepp App developer mode: https://docs.zepp.com/docs/guides/tools/zepp-app/
- Developer Bridge Mode FAQ: https://docs.zepp.com/zh-cn/docs/guides/faq/developer-bridge-mode/
- CLI release notes: https://docs.zepp.com/docs/v2/guides/tools/cli/release-note/
- Device Basic Information: https://docs.zepp.com/docs/reference/related-resources/device-list/




