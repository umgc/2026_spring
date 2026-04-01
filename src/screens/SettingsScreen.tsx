import { NavLink, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import useAppStore, { usePreferenceActions, usePreferenceState } from '../state/useAppStore';
import { settingsSections } from '../routesConfig';

function ToggleRow({
  label,
  hint,
  value,
  onToggle,
}: {
  label: string;
  hint: string;
  value: boolean;
  onToggle: (_value: boolean) => void;
}) {
  return (
    <div className="settings-option">
      <div>
        <strong>{label}</strong>
        <p className="muted">{hint}</p>
      </div>
      <button
        type="button"
        className={`toggle${value ? ' is-active' : ''}`}
        onClick={() => onToggle(!value)}
        aria-pressed={value}
        aria-label={`${label} ${value ? 'enabled' : 'disabled'}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle(!value);
          }
        }}
      />
    </div>
  );
}

function SettingsLayout() {
  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Appearance and accessibility preferences saved locally.</p>
        </div>
      </header>

      <div className="panel">
        <nav className="tab-row" aria-label="Settings sections">
          {settingsSections.map((section) => (
            <NavLink
              key={section.id}
              to={section.path}
              className={({ isActive }) => `tab-chip${isActive ? ' is-active' : ''}`}
            >
              {section.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <Outlet />
    </section>
  );
}

function AppearanceSettings() {
  const { themeMode } = usePreferenceState();
  const { setThemeMode } = usePreferenceActions();

  return (
    <article className="settings-card">
      <h2>Appearance</h2>
      <div className="tab-row" role="radiogroup" aria-label="Theme mode">
        {(['light', 'dark', 'system'] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            role="radio"
            aria-checked={themeMode === mode}
            className={`tab-chip${themeMode === mode ? ' is-active' : ''}`}
            onClick={() => setThemeMode(mode)}
          >
            {mode[0].toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>
    </article>
  );
}

function AccessibilitySettings() {
  const { leftHandedMode, largeText, highContrast } = usePreferenceState();
  const { setLeftHandedMode, setLargeText, setHighContrast } = usePreferenceActions();

  return (
    <article className="settings-card">
      <h2>Accessibility</h2>
      <ToggleRow
        label="Large Text"
        hint="Increase UI scale for readability."
        value={largeText}
        onToggle={setLargeText}
      />
      <ToggleRow
        label="High Contrast"
        hint="Boost borders and secondary text contrast."
        value={highContrast}
        onToggle={setHighContrast}
      />
      <ToggleRow
        label="Left-Handed Mode"
        hint="Switch layout direction to left-friendly positioning."
        value={leftHandedMode}
        onToggle={setLeftHandedMode}
      />
    </article>
  );
}

function AboutSettings() {
  const appMeta = useAppStore((state) => state.appMeta);

  return (
    <article className="settings-card">
      <h2>About</h2>
      <p>
        <strong>{appMeta.name}</strong> v{appMeta.version}
      </p>
      <p className="muted">{appMeta.description}</p>
      <div className="pill-row">
        <span className="pill">WCAG-aware</span>
        <span className="pill success">Offline capable</span>
        <span className="pill">Responsive shell</span>
      </div>
    </article>
  );
}

export default function SettingsScreen() {
  return (
    <Routes>
      <Route element={<SettingsLayout />}>
        <Route index element={<Navigate to="appearance" replace />} />
        <Route path="appearance" element={<AppearanceSettings />} />
        <Route path="accessibility" element={<AccessibilitySettings />} />
        <Route path="about" element={<AboutSettings />} />
      </Route>
    </Routes>
  );
}
