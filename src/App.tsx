import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import RouteLoading from './components/RouteLoading';
import {
  AuthScreen,
  CoursesScreen,
  DashboardScreen,
  ExploreScreen,
  HelpScreen,
  NotesScreen,
  NotFoundScreen,
  ProfileScreen,
  SettingsScreen,
} from './router';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<RouteLoading />}>
        <Routes>
          <Route
            path="/auth/:mode?"
            element={
              <PublicRoute>
                <AuthScreen />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardScreen />} />
            <Route path="courses" element={<CoursesScreen />} />
            <Route path="explore" element={<ExploreScreen />} />
            <Route path="notes" element={<NotesScreen />} />
            <Route path="profile" element={<ProfileScreen />} />
            {/* Settings stays nested so URLs like /settings/accessibility resolve directly. */}
            <Route path="settings/*" element={<SettingsScreen />} />
            <Route path="help" element={<HelpScreen />} />
          </Route>
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
