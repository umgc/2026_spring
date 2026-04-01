# Key Features

## Shared Features Across Platforms

### Authentication And Guest Access

- local sign-in and sign-up flows
- guest entry for quick evaluation and demo use
- profile-aware navigation

### Dashboard

- learning overview
- quick actions for common workflows
- recent activity and upcoming items in supported implementations

### Courses

- browse course information
- add or inspect courses in implementations that expose full course workflows
- review progress and metadata

### Explore

- discover sample or recommended learning content
- filter and inspect available course or content entries

### Notes

- create and edit notes
- maintain local-first notes workflows
- support offline-friendly drafting behavior

### Profile

- inspect current account context
- sign out

### Settings

- theme mode switching
- contrast preferences
- text-size preferences
- handedness preferences

## Platform-Specific Highlights

### React Web

- responsive browser UI
- route-based navigation with React Router
- local persistence using browser storage
- Playwright browser smoke tests

### Electron Desktop

- native-style menu bar
- secure preload bridge
- desktop dialogs and file handling
- keyboard shortcuts dialog
- update workflow support through GitHub Releases

### React Native

- Expo-managed mobile runtime
- bottom-tab mobile navigation
- React Native accessibility labels and hints
- Zustand-based lightweight state model

### Flutter

- Material 3 presentation
- Flutter semantics and accessibility guideline checks
- `go_router` navigation
- native Flutter packaging targets

## Accessibility-First Design Decisions

- readable spacing and control sizes
- theme flexibility including dark mode and high contrast
- left-handed layout support
- keyboard-aware or focus-aware interaction patterns
- screen-reader friendly labels on key controls
