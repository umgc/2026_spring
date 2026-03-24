import { Link } from 'react-router-dom';

export default function NotFoundScreen() {
  return (
    <main className="auth-layout">
      <section className="auth-panel">
        <h1>Page not found</h1>
        <p className="muted">The requested route does not exist.</p>
        <Link className="btn btn-primary" to="/dashboard">
          Return to dashboard
        </Link>
      </section>
    </main>
  );
}
