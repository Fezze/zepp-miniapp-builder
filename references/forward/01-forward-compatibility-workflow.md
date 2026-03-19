# Forward Compatibility Workflow

## When to use this file

Load this when the effective runtime API level major version is above `4`, or when the user asks about a newer Zepp API level than the skill already knows well.

## Core rule

Treat `4.x` as the known baseline and confirm everything newer directly in official docs before coding.

## Procedure

1. open `app.json`
2. detect the effective runtime API level
3. identify the exact new feature the task wants
4. search official Zepp docs for that API level and that feature
5. verify the support badge or `API_LEVEL` marker on the specific API page
6. only then propose implementation

## What not to do

- do not guess that a `v3+` docs page implies support for every newer runtime
- do not assume a feature exists just because a similar `4.0` feature exists
- do not silently use a post-`4.0` feature in a repo that only targets `4.0`

## Safe response pattern

Say all of these explicitly:

- detected runtime API level
- known-safe baseline you are using
- whether the requested feature is confirmed in docs
- whether the feature requires raising `runtime.apiVersion`

## Example checks

- If the target is `4.2`, verify `4.2` additions on the relevant feature page before using them.
- If the target is `5.0`, search for `API_LEVEL 5.0` feature pages and verify specific APIs individually.

## Official references

- API_LEVEL 4.0 New Features: https://docs.zepp.com/docs/guides/version-info/new-features-40/
- API_LEVEL 4.2 New Features: https://docs.zepp.com/docs/guides/version-info/new-features-42/
- API_LEVEL Compatibility: https://docs.zepp.com/docs/v2/guides/framework/device/compatibility/
- Intro: https://docs.zepp.com/docs/intro/
