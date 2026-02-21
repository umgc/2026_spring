# Flutter vs React Native Parity Checklist

This document maps Flutter app features to the React Native implementation in `edulence_rn`.

## Scope
- Flutter reference app: `/Users/kwameduodu/EduLense/EduLense/edulence`
- React Native app: `/Users/kwameduodu/EduLense/EduLense/edulence_rn`

## 1. App Shell and Navigation
- [x] Auth-first flow with gated app access
  - Flutter: `edulence/lib/screens/auth_entry_screen.dart`, `edulence/lib/screens/main_navigation_screen.dart`
  - RN: `edulence_rn/src/screens/AuthEntryScreen.tsx`, `edulence_rn/src/navigation/AppNavigator.tsx`
- [x] Bottom tab navigation (Home / Explore / Profile)
  - Flutter: `edulence/lib/screens/main_navigation_screen.dart`
  - RN: `edulence_rn/src/navigation/AppNavigator.tsx`
- [x] Settings screen reachable from app screens
  - Flutter: `edulence/lib/screens/home_screen.dart`, `edulence/lib/screens/main_navigation_screen.dart`
  - RN: `edulence_rn/src/components/ScreenHeader.tsx`, `edulence_rn/src/screens/HomeScreen.tsx`, `edulence_rn/src/screens/ProfileScreen.tsx`

## 2. Authentication Features
- [x] Sign in and sign up entry points
  - Flutter: `edulence/lib/screens/auth_entry_screen.dart`
  - RN: `edulence_rn/src/screens/AuthEntryScreen.tsx`
- [x] Demo account support
  - RN: default state + helper text in `edulence_rn/src/store/useAppStore.ts` and `edulence_rn/src/screens/AuthEntryScreen.tsx`
- [x] Form validation and auth error state
  - RN: `edulence_rn/src/store/useAppStore.ts`, `edulence_rn/src/screens/AuthEntryScreen.tsx`
- [x] Guest fallback behavior for blocked auth
  - RN: `edulence_rn/src/store/useAppStore.ts`, `edulence_rn/src/screens/AuthEntryScreen.tsx`
- [x] Sign out returns user to auth
  - RN: `edulence_rn/src/store/useAppStore.ts`, `edulence_rn/src/screens/ProfileScreen.tsx`, `edulence_rn/src/navigation/AppNavigator.tsx`

## 3. Home Screen Parity
- [x] Welcome/title structure
  - Flutter: `edulence/lib/screens/home_screen.dart`
  - RN: `edulence_rn/src/screens/HomeScreen.tsx`
- [x] Quick actions cards
  - Flutter: `edulence/lib/screens/home_screen.dart`
  - RN: `edulence_rn/src/screens/HomeScreen.tsx`, `edulence_rn/src/components/ActionCard.tsx`
- [x] Recent activity list
  - Flutter: `edulence/lib/screens/home_screen.dart`
  - RN: `edulence_rn/src/screens/HomeScreen.tsx`

## 4. Explore Screen Parity
- [x] Explore tab with content list
  - Flutter baseline currently placeholder in `edulence/lib/screens/main_navigation_screen.dart`
  - RN implements richer version in `edulence_rn/src/screens/ExploreScreen.tsx`
- [x] Search/filter behavior
  - RN: `edulence_rn/src/screens/ExploreScreen.tsx`
- [x] Course selection details panel
  - RN: `edulence_rn/src/screens/ExploreScreen.tsx`

## 5. Profile Screen Parity
- [x] Profile identity and stats
  - RN: `edulence_rn/src/screens/ProfileScreen.tsx`
- [x] Settings access from profile
  - RN: `edulence_rn/src/screens/ProfileScreen.tsx`, `edulence_rn/src/components/ScreenHeader.tsx`
- [x] Sign out action
  - RN: `edulence_rn/src/screens/ProfileScreen.tsx`, `edulence_rn/src/store/useAppStore.ts`

## 6. Settings and Theme Parity
- [x] Appearance theme modes (Light / Dark / System)
  - Flutter: `edulence/lib/screens/settings_screen.dart`
  - RN: `edulence_rn/src/screens/SettingsScreen.tsx`, `edulence_rn/src/components/ThemeModeOptionRow.tsx`
- [x] Accessibility toggles
  - Left-handed mode
  - Large text
  - High contrast
  - Flutter: `edulence/lib/screens/settings_screen.dart`
  - RN: `edulence_rn/src/screens/SettingsScreen.tsx`, `edulence_rn/src/components/SettingSwitchRow.tsx`, `edulence_rn/src/theme/useAppTheme.ts`
- [x] About metadata and capability chips
  - Flutter: `edulence/lib/screens/settings_screen.dart`
  - RN: `edulence_rn/src/screens/SettingsScreen.tsx`, `edulence_rn/src/constants/appConstants.ts`, `edulence_rn/src/components/InfoChip.tsx`

## 7. Accessibility Parity (WCAG/Assistive Focus)
- [x] Semantic roles/labels/hints on interactive controls
  - RN screens/components: `src/screens/*.tsx`, `src/components/*.tsx`
- [x] Minimum 44x44 touch targets on interactive controls
  - RN styles: buttons/cards/switch rows enforce min sizes
- [x] Large text support
  - RN: `edulence_rn/src/theme/useAppTheme.ts`
- [x] Left-handed layout adaptation
  - RN: `edulence_rn/src/theme/useAppTheme.ts`
- [x] Accessibility announcements for setting changes
  - RN: `edulence_rn/src/hooks/useAccessibilityAnnouncement.ts`, `edulence_rn/src/screens/SettingsScreen.tsx`

## 8. Platform-Specific Optimizations
- [x] Android ripple feedback on pressables
  - RN: `ActionCard`, `ScreenHeader`, auth buttons
- [x] iOS pressed-opacity feedback on pressables
  - RN: `ActionCard`, `ScreenHeader`, auth buttons
- [x] Keyboard-aware auth form behavior
  - RN: `KeyboardAvoidingView`, submit key handling, keyboard dismissal in `AuthEntryScreen.tsx`
- [x] Tab bar behavior when keyboard opens (Android)
  - RN: `tabBarHideOnKeyboard` in `AppNavigator.tsx`
- [x] iOS Settings header large title
  - RN: `AppNavigator.tsx`
- [x] Platform-specific navigation animation
  - RN: `AppNavigator.tsx`

## 9. Quality and Verification
- [x] Lint clean
  - `npm run lint`
- [x] Type checks clean
  - `npm run typecheck`
- [x] Test suite passing
  - `npm test -- --runInBand`

## 10. Notes
- Current Flutter `Explore` and `Profile` in `main_navigation_screen.dart` are placeholders in that code snapshot; RN currently provides fuller implementations for these tabs.
- If Flutter expands those screens further, update this checklist and mirror additions in RN.
