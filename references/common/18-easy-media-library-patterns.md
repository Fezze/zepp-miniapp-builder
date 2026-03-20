# Easy Media Library Patterns

## When to use this file

Load this file when:

- the repo imports `@silver-zepp/easy-media` or `@silver-zepp/easy-media/recorder`
- code creates `new SoundPlayer()` or `new SoundRecorder(...)`
- the user asks about page-local audio playback, sound-effect queues, speaker detection, or watch-side recording
- the repo wraps `@zos/media` instead of calling the raw player or recorder APIs directly

## Source trust order

- Use `ts/sound-player.d.ts` and `ts/sound-recorder.d.ts` for the published surface.
- Use `dist/sound-player.src.js` for queue behavior, fail detection, and cleanup details.
- Use `dist/sound-recorder.src.js` to see how thin the recorder wrapper really is.
- Use the example app for the intended playback workflow.
- Use the README for onboarding only; correct it when it drifts from the actual constructor options or helper behavior.

## Version and surface reality

- The player source marks the library as `@min_zeppos 3.0`.
- The example app targets `runtime.apiVersion 3.0`.
- The shipped example app demonstrates page-level playback only.
- `SoundRecorder` exists as an exported surface, but the repo does not ship a comparable recorder example with lifecycle or permission guidance.
- Treat playback as the mature path and recording as a thin wrapper that still needs repo-specific validation.

## What easy-media changes

- `easy-media` is a wrapper over `@zos/media`, not a separate Zepp runtime model.
- `SoundPlayer` adds a friendlier file-based playback API, a built-in queue, completion and fail callbacks, playback-info helpers, and a speaker-availability probe.
- `SoundRecorder` is a very small wrapper around a recorder configured for `codec.OPUS`.
- This library is most useful for short page-driven sound effects, clips, and sequential playback on `3.0+` targets.

## Public API surface

### `SoundPlayer`

- constructor options: `path`, `stop_on_change`, `use_queue`, `onComplete`
- `play`, `pause`, `resume`, `stop`, `changeFile`, `destroy`
- `onComplete`, `onFail`, `setFailTimeout`, `isSpeakerAvailable`
- `get.*` helpers such as `volume`, `duration`, `title`, `artist`, `mediaInfo`, `status`, `statusName`, `isPlaying`, `isPaused`, `isStopped`
- `set.volume(...)`
- `SoundPlayer.SetLogLevel(...)`

### `SoundRecorder`

- constructor takes a target file path
- `start`, `stop`, `changeFile`
- always configured for `codec.OPUS`

## Playback behavior and guardrails

- Use full file paths such as `assets://raw/media/foo.mp3` for normal packaged audio playback.
- The constructor option is `path`, not `file`.
- Queue mode is enabled by default; if `play(...)` is called while audio is already active, the next path is queued instead of interrupting immediately.
- `stop_on_change` defaults to `false`, so changing files does not automatically imply an eager stop unless the repo opts into that behavior.
- `destroy()` should be called from `onDestroy()` or an equivalent teardown path.
- `onComplete(...)` returns a `PlaybackInfo` object with filename, path, full path, and measured duration in milliseconds.

## Fail detection and speaker probing

- `onFail(...)` is opt-in; the fail monitor only matters when the repo actually registers a fail callback.
- Fail detection starts after `PREPARE` succeeds and uses media duration plus an extra timeout window.
- `setFailTimeout(...)` lowers or raises that extra grace period; smaller numbers are faster but less stable.
- `isSpeakerAvailable(...)` writes a tiny probe file to `data://em_speaker_test.mp3` and attempts playback to determine whether local playback is available.
- Speaker probing is a practical runtime check, not a formal capability API.

## Recorder reality

- `SoundRecorder` is intentionally minimal: set target file, start, stop, change file.
- The wrapper does not add callbacks, file-state helpers, or a destroy method.
- The repo does not document recorder-specific permissions or recovery behavior, so do not infer a complete recording policy from this library alone.
- If the user needs production-grade recording UX, confirm recorder permissions, storage expectations, and interruption behavior against the actual app target.

## Source-level cautions

- The README shows `new SoundPlayer({ file: ... })`, but the actual constructor option is `path`.
- The source claims only one player instance is supported, but the instance guard is not implemented in a reliable static way; do not rely on it for singleton enforcement.
- The getter helpers `statusName()`, `isPaused()`, and `isStopped()` appear inconsistent in source and should be treated cautiously unless the repo already proves them.
- The `isSpeakerAvailable(...)` callback is documented in typings with an object-like shape, but the runtime actually passes a plain boolean.
- The example app is playback-heavy and does not prove recorder workflows.

## Safe recommendations

- Use `easy-media` for `3.0+` page-driven playback when the repo already depends on it or when raw `@zos/media` handling is getting repetitive.
- Prefer short packaged assets under `assets://raw/...` and clean page teardown over long-lived global audio assumptions.
- Treat queue playback as the default behavior unless the repo explicitly disables it.
- Prefer `onComplete(...)` and `onFail(...)` over polling status helpers when sequencing playback.
- Treat `SoundRecorder` as a thin convenience wrapper and validate recording flows with the actual target device and official media docs before making stronger promises.
