import { lazy } from 'react';

export const AuthScreen = lazy(() => import('./screens/AuthScreen'));
export const DashboardScreen = lazy(() => import('./screens/DashboardScreen'));
export const CoursesScreen = lazy(() => import('./screens/CoursesScreen'));
export const ExploreScreen = lazy(() => import('./screens/ExploreScreen'));
export const NotesScreen = lazy(() => import('./screens/NotesScreen'));
export const ProfileScreen = lazy(() => import('./screens/ProfileScreen'));
export const SettingsScreen = lazy(() => import('./screens/SettingsScreen'));
export const HelpScreen = lazy(() => import('./screens/HelpScreen'));
export const NotFoundScreen = lazy(() => import('./screens/NotFoundScreen'));
