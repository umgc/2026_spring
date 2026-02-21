# Architecture Guide

## Design Goals
- Maintain feature parity with Flutter implementation
- Keep screens declarative and thin
- Centralize business logic in global state/actions
- Optimize rendering by subscribing only to required state slices

## Core Layers

### 1. Presentation Layer
- Screens in `src/screens/`
- Reusable UI in `src/components/`
- Use functional components and hooks only

### 2. State Layer
- Zustand store in `src/store/useAppStore.ts`
- Selector hooks expose focused reads/actions:
  - `useAuthState`
  - `useAuthActions`
  - `useThemePreferences`
  - `useThemeActions`
- Selector hooks use shallow comparison to avoid broad rerenders

### 3. Navigation Layer
- `src/navigation/AppNavigator.tsx`
- Auth-gated stack + bottom tabs
- Platform conditionals for transitions and header behaviors

### 4. Theme + Accessibility Layer
- `src/theme/useAppTheme.ts` resolves theme, contrast, text scale, and directional alignment
- Accessibility semantics applied in all interactive components
- Announcement hook in `src/hooks/useAccessibilityAnnouncement.ts`

## Hook Patterns
- `useMemo` for expensive derived values
- `useCallback` for event handlers passed to children/lists
- Avoid selecting the entire global store in screens

## Performance Checklist
- Keep static data at module scope
- Memoize shared presentation components where appropriate
- Use list key extractors and stable render functions for `FlatList`
- Prefer selector hooks over broad store reads

## Testing Strategy
- Unit tests for store/utils
- RNTL tests for interactions and navigation
- Accessibility-focused assertions for roles/labels/hints

## Extension Guidelines
- Add new state in store + selector hooks first
- Keep screen logic mostly orchestration, not data mutation logic
- Add or update tests in `src/__tests__/` with each feature
