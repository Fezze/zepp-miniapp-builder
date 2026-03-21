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

### Simulator install or update

When the task involves installing or upgrading the Zepp OS Simulator, check the official download page instead of assuming an older binary set.

As of 2026-03-20, the official docs list Simulator `2.1.0` downloads for:

- macOS `arm64`
- macOS `x64`
- Windows `x64`
- Linux `amd64`
- Linux `arm64`

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

Historically documented behavior:

- the `screenshot` command saves to `~/desktop/screenShot.png`

## Logging and debug surfaces

### Simulator

- use simulator debug panels
- use `console.log`
- use sensor mocking where available

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
