# Contributing Guide

## Working Style

This repository contains several platform implementations of the same product. Contributions should improve the codebase without breaking parity, accessibility, or release readiness on neighboring platforms.

## Before You Start

- read [Architecture Overview](./ARCHITECTURE.md)
- check the relevant platform README before changing package-specific workflows
- review [Build and Test Artifacts](../BUILD_AND_TEST_ARTIFACTS.md) for the expected verification commands

## Contribution Expectations

- preserve the established product language across platforms
- prefer small, reviewable changes over broad speculative rewrites
- update documentation when workflows, commands, architecture, or release behavior change
- keep accessibility in scope for UI changes
- avoid introducing platform-only UI drift unless it is required by native conventions

## Code Quality

For any platform you touch, run the closest relevant verification commands:

### Root web

```bash
npm run build
npm run lint
npm test -- --run
```

### Desktop

```bash
cd edulence_desktop
npm run build
npm run lint
npm test
```

### React Native

```bash
cd edulence_rn
npm run lint
npm run typecheck
npm test -- --runInBand
```

### Flutter

```bash
cd edulence
flutter test
```

## Pull Request Guidance

A strong change set should include:

- a short description of the user-facing or platform-facing change
- any build, test, or smoke commands you ran
- screenshots or recordings for meaningful UI changes
- follow-up risks or known gaps if something could not be fully validated

## Documentation Standards

Update docs when you change:

- setup commands
- package scripts
- architecture boundaries
- build or release workflows
- accessibility behavior
- platform support assumptions

## Platform Parity

When a change affects shared product behavior, check whether it also needs:

- a root web update
- a desktop update
- a React Native update
- a Flutter update

Not every change must be ported immediately, but parity decisions should be intentional and documented.
