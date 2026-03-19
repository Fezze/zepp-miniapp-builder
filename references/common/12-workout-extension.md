# Workout Extension

## When to use this file

Load this file when a Zepp task involves:

- `data-widget/`
- `DataWidget(...)`
- `SPORT_DATA`
- workout plugins inside the Workout system app
- workout-specific live data surfaces

## Safe baseline

- Treat `API_LEVEL 3.6` as the safe runtime floor for actual Workout Extension implementation.
- The feature is introduced in the `3.5` docs wave, but the documented quick start and APIs require `3.6+`.
- Workout Extension is an independent application with its own `appId`.
- Users can run multiple Workout Extensions at the same time.

## Project shape

- register the extension under `targets.*.module.data-widget.widgets`
- each Workout Extension entry file must call `DataWidget()` exactly once
- `widgets` has a documented maximum length of `1` per appId
- set `runtime.apiVersion.minVersion`, `compatible`, and `target` to `3.6` or higher when this surface is required
- optional `app-side` logic can exist when the extension also needs phone-side requests or sync

## Core APIs

- `DataWidget()` provides `onInit`, `build`, `onResume`, `onPause`, and `onDestroy`
- `SPORT_DATA` is the purpose-built `3.6+` widget for real-time workout metrics
- `getSportData()` is the lower-level data path when widget defaults are not enough and the extension needs custom processing

## Lifecycle and UX constraints

- the extension shares the normal app `onCreate` flow, then the extension surface uses focus-based `onResume` and `onPause`
- the extension enters a pause state when it loses focus
- UI is single-page only; long scrolling pages are not supported
- gesture monitoring and hardware-button response are not supported
- click events are supported
- drawing is bounded to the device screen area, so layout must respect the visible workout canvas and pinned-bar variants
- simulator visibility is a convenience; on real hardware the extension is added from the Workout app, not the normal app list

## Design choice guidance

- use Workout Extension only for workout-context plugins inside the Workout system app
- use `SecondaryWidget` or `AppWidget` for glanceable surfaces outside workouts
- use normal Device App pages when the feature is not tied to an active workout session

## Official references

- Workout Extension intro: https://docs.zepp.com/docs/guides/workout-extension/intro/
- Workout Extension quick start: https://docs.zepp.com/docs/guides/workout-extension/quick-start/
- DataWidget constructor: https://docs.zepp.com/docs/reference/device-app-api/newAPI/global/DataWidget/
- SPORT_DATA: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/SPORT_DATA/
- getSportData: https://docs.zepp.com/docs/reference/device-app-api/newAPI/app-access/getSportData/
