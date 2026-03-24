export default function HelpScreen() {
  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Help</h1>
          <p className="page-subtitle">App behavior, accessibility, and offline support notes.</p>
        </div>
      </header>

      <div className="settings-grid">
        <article className="settings-card">
          <h2>What is included</h2>
          <p className="muted">
            Dashboard, courses, explore, notes, profile, and settings are available through nested React Router flows
            and persisted in local storage for offline continuity.
          </p>
        </article>

        <article className="settings-card">
          <h2>Accessibility</h2>
          <ul>
            <li>Interactive targets keep a minimum 44px size.</li>
            <li>Theme, contrast, font scale, and left-handed layout can be changed in settings.</li>
            <li>Navigation adapts from sidebar to mobile bottom navigation.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
