import { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import type { NavItem } from '../types';
import PageTransition from './PageTransition';
import { appMeta, navItems } from '../data/mockData';
import useOnlineStatus from '../hooks/useOnlineStatus';
import usePwaRegistration from '../hooks/usePwaRegistration';
import { useAuthActions, useAuthState, usePreferenceState } from '../state/useAppStore';
import { useRouteMeta } from '../hooks/useRouteMeta';

const mobileItems = navItems.slice(0, 5);

function Navigation({
  items,
  onNavigate,
}: {
  items: NavItem[];
  onNavigate?: () => void;
}) {
  return (
    <nav className="nav-list" aria-label="Primary">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          onClick={onNavigate}
        >
          <span aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default function AppShell() {
  const navigate = useNavigate();
  const routeMeta = useRouteMeta();
  const isOnline = useOnlineStatus();
  const { triggerInstall } = usePwaRegistration();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { currentUser } = useAuthState();
  const { signOut } = useAuthActions();
  const { installReady, themeMode, largeText, highContrast, leftHandedMode, resolveTheme } =
    usePreferenceState();
  const drawerOpenButtonRef = useRef<HTMLButtonElement>(null);

  const resolvedTheme = useMemo(() => resolveTheme(themeMode), [resolveTheme, themeMode]);

useEffect(() => {
  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.dataset.scale = largeText ? 'large' : 'base';
  document.documentElement.dataset.contrast = highContrast ? 'high' : 'base';
  document.documentElement.dataset.handed = leftHandedMode ? 'left' : 'right';
}, [resolvedTheme, largeText, highContrast, leftHandedMode]);

  // Return focus to the hamburger button when the mobile drawer closes
  useEffect(() => {
    if (!drawerOpen) {
      drawerOpenButtonRef.current?.focus();
    }
  }, [drawerOpen]);

  return (
    <div className="app-root">
      {/* Skip link: lets keyboard users jump past nav directly to content */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {drawerOpen ? (
        <button
          type="button"
          className="mobile-drawer-backdrop"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close menu"
        />
      ) : null}
      {drawerOpen ? (
        <aside className="mobile-drawer" aria-label="Mobile navigation">
          <div className="split-header">
            <div>
              <div className="brand-mark" aria-hidden="true">EL</div>
              <h2>{appMeta.name}</h2>
            </div>
            <button type="button" className="btn" onClick={() => setDrawerOpen(false)}>
              Close
            </button>
          </div>
          <Navigation items={navItems} onNavigate={() => setDrawerOpen(false)} />
        </aside>
      ) : null}

      <div className={`app-shell${leftHandedMode ? ' is-left-handed' : ''}`}>
        <aside className="sidebar" aria-label="Site navigation">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">EL</div>
            <p className="brand-name">{appMeta.name}</p>
            <p className="muted">Left-friendly learning workspace</p>
          </div>

          <div className="panel">
            <strong>{currentUser?.name}</strong>
            <span className="muted">{currentUser?.email}</span>
          </div>

          <Navigation items={navItems} />

          <div className="panel">
            <span className="pill">Offline notes enabled</span>
            <button type="button" className="btn btn-ghost" onClick={() => navigate('/settings/accessibility')}>
              Accessibility settings
            </button>
          </div>
        </aside>

        <div className="content-shell">
          <header className="topbar">
            <div className="topbar-actions">
              <button
                ref={drawerOpenButtonRef}
                type="button"
                className="icon-btn"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={drawerOpen}
                aria-controls="mobile-drawer"
              >
                ≡
              </button>
              <div>
                <strong>{routeMeta?.label ?? 'Workspace'}</strong>
                <div className="muted">{isOnline ? 'Synced locally and online' : 'Offline mode active'}</div>
              </div>
            </div>

            <div className="topbar-actions">
              {installReady ? (
                <button type="button" className="btn btn-ghost" onClick={triggerInstall}>
                  Install app
                </button>
              ) : null}
              <button type="button" className="btn" onClick={() => navigate('/notes')}>
                Quick note
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  signOut();
                  navigate('/auth/signin');
                }}
              >
                Sign out
              </button>
            </div>
          </header>

          {!isOnline ? (
            <div className="offline-banner" role="status" aria-live="polite">
              <strong>You are offline.</strong>
              <span>Saved notes, preferences, and cached pages are still available.</span>
            </div>
          ) : null}

          <main id="main-content" tabIndex={-1}>
            <PageTransition>
              <Outlet />
            </PageTransition>
          </main>

          <footer className="footer">
            {appMeta.name} v{appMeta.version} · nested routing and deep links supported · typed local-first state
          </footer>

          <nav className="mobile-bottom-nav" aria-label="Mobile primary">
            {mobileItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}