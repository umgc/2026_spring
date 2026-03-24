import { useEffect, useMemo, useState } from 'react';
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
          <span>{item.label}</span>
          <span aria-hidden="true">{item.icon}</span>
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

  const resolvedTheme = useMemo(() => resolveTheme(themeMode), [resolveTheme, themeMode]);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.dataset.scale = largeText ? 'large' : 'base';
    document.documentElement.dataset.contrast = highContrast ? 'high' : 'base';
    document.documentElement.dir = leftHandedMode ? 'rtl' : 'ltr';
  }, [resolvedTheme, largeText, highContrast, leftHandedMode]);

  return (
    <div className="app-root">
      {drawerOpen ? (
        <button
          type="button"
          className="mobile-drawer-backdrop"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close menu"
        />
      ) : null}
      {drawerOpen ? (
        <aside className="mobile-drawer">
          <div className="split-header">
            <div>
              <div className="brand-mark">EL</div>
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
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-mark">EL</div>
            <h1 className="brand-name">{appMeta.name}</h1>
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
                type="button"
                className="icon-btn"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation menu"
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

          <PageTransition>
            <Outlet />
          </PageTransition>

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
