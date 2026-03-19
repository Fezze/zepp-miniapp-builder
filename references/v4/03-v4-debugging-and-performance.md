# V4 Debugging and Performance

## Why V4 changes the workflow

API level `4.0+` adds several tools that improve debugging and runtime visibility, but they are not safe to assume on older targets.

## `getPerformance`

Use `getPerformance()` when the task needs runtime statistics such as:

- memory information
- loading and performance metrics

Good uses:

- measuring memory pressure
- debugging leak-like behavior
- comparing heavy rendering paths

## `createSysTimer`

Use `createSysTimer()` for system-level timers that are appropriate for device app services and behavior that must continue regardless of watch screen state.

Good uses:

- App Service scheduling
- delayed background actions
- periodic background tasks

Do not confuse it with general page-local timer logic.

## Combined V4 debugging workflow

1. verify API level is `4.x`
2. build or reproduce in simulator
3. use `openInspector()` for layout issues
4. use `getPerformance()` when memory or runtime cost matters
5. use normal logs and simulator debug panels
6. validate on real device when behavior depends on sensors, timing, or renderer differences

## Performance mindset

- watch hardware is more constrained than browser targets
- keep rendering paths simple unless a richer path is worth the cost
- prefer measuring or inspecting before adding more runtime complexity

## Official references

- API_LEVEL 4.0 New Features: https://docs.zepp.com/docs/guides/version-info/new-features-40/
- getPerformance: https://docs.zepp.com/docs/reference/device-app-api/newAPI/app/getPerformance/
- createSysTimer: https://docs.zepp.com/docs/reference/device-app-api/newAPI/timer/createSysTimer/
- openInspector: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/openInspector/
- Simulator development/debugging: https://docs.zepp.com/docs/guides/tools/simulator/dev/
