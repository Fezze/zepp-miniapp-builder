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

## Practical guardrails

- simulator validation does not replace real-device sensor testing
- successful logic tests do not prove widget rendering correctness
- successful UI tests do not prove runtime performance on watch hardware

## Official references

- Quick Start: https://docs.zepp.com/docs/guides/quick-start/
- Simulator development/debugging: https://docs.zepp.com/docs/guides/tools/simulator/dev/
- Code organization best practice: https://docs.zepp.com/docs/v2/guides/best-practice/code-organization/
