# Secondary Widgets and Shortcut Cards

## When to use these surfaces

Load this file when a Zepp task involves:

- `secondary-widget/`
- watch widgets
- shortcut cards
- glanceable watch surfaces outside the main Device App page

## Core concepts

- `SecondaryWidget` is the constructor for watch widgets.
- `AppWidget` is the constructor for shortcut cards.
- They are optional mini-program surfaces and a project can contain multiple independent widgets/cards, up to a total of five.
- Device support varies; do not assume every device supports `SecondaryWidget`.
- Use the device list to confirm whether the target hardware supports `SecondaryWidget`.

## Lifecycle model

- Widgets and shortcut cards have `onInit`, `build`, `onResume`, `onPause`, and `onDestroy`.
- They participate in a pause/focus lifecycle distinct from the main Device App page.
- `app.js` can be created as part of entering these surfaces, then remain paused until a page or widget gains focus.

## UI and interaction constraints

- drawing area is bounded
- shortcut-card layout uses coordinates relative to the card origin
- swipe, gesture, and key events are not available
- click events are the main interaction path
- scroll/sliding/stacking widgets such as `SCROLL_LIST` and `VIEW_CONTAINER` are not allowed here
- `GROUP` is not available for shortcut cards

## Communication patterns

Use the same communication tools as page flows:

- router `push(...)` to jump into the main app
- global app object for in-memory state
- `SessionStorage` for session-scoped sharing
- `LocalStorage` or file storage for persistent state

Important BLE limitation:

- widget and shortcut-card surfaces should not be treated as the place to initialize real-time BLE data display; initialize BLE-related connections from a Device App page instead

## Configuration guidance

- register widget/card modules in `app.json`
- localize widget/card names through the documented `i18n` fields
- for Zepp OS `3.0+`, provide a static preview image for widget edit mode; square-screen previews need rounded corners
- use `getAppWidgetSize()` and `setAppWidgetSize()` when shortcut-card sizing matters

## Debugging note

- wrap lifecycle logic in `try/catch` while iterating because JS errors in these surfaces can leave the simulator stuck

## Official references

- Register SecondaryWidget and Shortcut Cards: https://docs.zepp.com/docs/guides/framework/device/secondary-widget/
- SecondaryWidget constructor: https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/SecondaryWidget/
- AppWidget constructor: https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/AppWidget/
- getAppWidgetSize: https://docs.zepp.com/docs/v2/reference/device-app-api/newAPI/ui/getAppWidgetSize/
- setAppWidgetSize: https://docs.zepp.com/docs/v2/reference/device-app-api/newAPI/ui/setAppWidgetSize/
- Cross-page communications: https://docs.zepp.com/docs/guides/best-practice/cross-page-communications/
- Device Basic Information: https://docs.zepp.com/docs/reference/related-resources/device-list/
- Widget design guide: https://docs.zepp.com/docs/designs/customization/widget/
