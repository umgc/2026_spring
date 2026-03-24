export default function RouteLoading() {
  return (
    <main className="page page-loading" aria-busy="true" aria-live="polite">
      <section className="panel">
        <div className="loading-copy">
          <span className="eyebrow">Loading</span>
          <h1 className="page-title">Preparing your workspace</h1>
        </div>
        <div className="skeleton-row">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-chip" />
        </div>
        <div className="skeleton-grid">
          <div className="skeleton skeleton-card" />
          <div className="skeleton skeleton-card" />
          <div className="skeleton skeleton-card" />
        </div>
      </section>
    </main>
  );
}
