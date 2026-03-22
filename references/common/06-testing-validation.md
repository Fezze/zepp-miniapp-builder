# Testing and Validation

## Core principle

Zepp apps are not normal browser apps. Split validation by layer.

## Recommended layers

### Pure JavaScript tests

Use a standard JS test runner for logic that does not depend on Zepp runtime APIs.

Good targets:

- geometry
- state machines
- serialization
- game logic
- storage normalization
- message encode/decode

### Mocked runtime tests

Mock `@zos/*` and `hmUI` to exercise:

- widget creation contracts
- page lifecycle behavior
- command flow
- settings sync handling
- integration of real page code with mocked runtime shims

### Simulator validation

Use `zeus dev` for:

- real widget behavior
- watch runtime layout
- gestures
- rendering branches
- many lifecycle interactions

Verified simulator workflow:

1. Run pure tests first if the repo has them, then run `zeus build` as the minimum compile gate.
2. Run `zeus status` to confirm that the simulator is connected before assuming deploy failures come from the app.
3. Prefer `zeus dev` over bridge `install` for simulator deployment.
4. If Zeus prompts for a preview target, choose the intended simulator profile explicitly, for example `Amazfit Balance 2`.
5. If `zeus dev` output stays quiet, confirm deployment by checking `%AppData%\Roaming\simulator\last_app_info.json`, the deployed app folder under `%AppData%\Roaming\simulator\apps\<Project><AppId>`, and fresh `side-service status:opened` lines in `%AppData%\Roaming\simulator\logs\renderer.log`.
6. If CLI logs are still insufficient, inspect the simulator through the DevTools endpoint from `%AppData%\Roaming\simulator\DevToolsActivePort`, query `/json/list`, then use CDP to capture screenshots or read the simulator Console tab.
7. Treat simulator findings as runtime smoke validation, not proof of real-device behavior for haptics, audio, anti-sleep, or wake relaunch.

### Real-device validation

Still required when changes depend on:

- sensor feel
- frame time or CPU pressure
- hardware-specific rendering
- real notification or sound behavior

## Test design tips

- assert `hmUI.createWidget(...)` calls instead of expecting DOM output
- keep reusable Zepp mocks in shared helpers instead of ad hoc per-test stubs
- keep visual and semantic snapshot layers separate if the project uses rendering-heavy output
- run `zeus build` even when tests pass

## Practical Node and shared-module guardrails

- in shared modules imported by Node-based ESM tests, prefer explicit `.js` import specifiers
- keep runtime-specific codecs or transport adapters separate from pure logic so tests can import normalization and state code without pulling `@zos/*`

## How to make Zepp code testable in Node

- keep entity schemas, validators, serialization helpers, key builders, seed logic, migration logic, and index-update rules in pure modules
- let runtime shells such as `setting/index.js`, `app-side/index.js`, or device pages be thin adapters over those pure modules
- test domain rules such as create, update, delete, summary rebuild, and history retention without any Zepp runtime imports
- treat runtime adapters as the place for `AppSettingsPage`, `messaging.peerSocket`, `hmUI`, or `@zos/*`, not the domain layer itself

## Runtime execution test matrix

For timed watch flows, keep the reducer and engine under direct test with cases such as:

- `start -> tick -> complete`
- `start -> abort`
- `start -> background gap -> resume`
- timer expiry while the page is inactive or the screen state changes
- expired-step behavior that should auto-advance versus enter `waiting_for_confirm`
- partial-step abort that still has to finalize history deterministically
- finalization rules for `completed`, `aborted`, and mixed partial sessions

Recommended assertions:

- reducer state after each event, not only final UI text
- derived `completedSteps`, current-step status, and deviation values
- timestamp-based resume behavior with no dependency on replaying every missed tick
- timer teardown leaves no duplicate loop, duplicate feedback cue, or double-finalization path
- page-shell tests with mocked runtime verify whichever refresh strategy the repo chose: in-place widget updates, `replace(...)`, or an event-bus/store signal

## Practical guardrails

- simulator validation does not replace real-device sensor testing
- successful logic tests do not prove widget rendering correctness
- successful UI tests do not prove runtime performance on watch hardware

## Official references

- Quick Start: https://docs.zepp.com/docs/guides/quick-start/
- Simulator development/debugging: https://docs.zepp.com/docs/guides/tools/simulator/dev/
- Code organization best practice: https://docs.zepp.com/docs/v2/guides/best-practice/code-organization/

