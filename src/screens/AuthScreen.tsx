import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import AuthForm from '../components/forms/AuthForm';
import { useAuthActions, useAuthState } from '../state/useAppStore';
import type { AuthFormValues } from '../types';

export default function AuthScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ mode?: string }>();
  const { currentUser, authError } = useAuthState();
  const { clearAuthError, signIn, signUp, continueAsGuest } = useAuthActions();
  const mode = params.mode === 'signup' ? 'signup' : 'signin';
  const destination = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/dashboard';

  if (currentUser) {
    return <Navigate to={destination} replace />;
  }

  const handleSubmit = async (values: AuthFormValues) => {
    clearAuthError();
    const result =
      mode === 'signup'
        ? signUp(values.name, values.email, values.password)
        : signIn(values.email, values.password);

    if (result.success) {
      navigate(destination, { replace: true });
    }
  };

  const handleGuest = (values: AuthFormValues) => {
    continueAsGuest(values.name, values.email);
    navigate(destination, { replace: true });
  };

  return (
    <main className="auth-layout">
      <section className="auth-intro">
        <span className="eyebrow">PWA Ready</span>
        <h1 className="hero-title">Study flows that hold up online and offline.</h1>
        <p className="hero-copy">
          EduLense combines the mobile app’s accessibility settings with the desktop app’s richer learning workspace:
          courses, explore, notes, profile, and settings in one responsive web shell.
        </p>
        <div className="hero-grid">
          <article className="feature-card">
            <strong>Responsive shell</strong>
            <p className="muted">Bottom nav on smaller widths, full sidebar on larger screens.</p>
          </article>
          <article className="feature-card">
            <strong>Offline notes</strong>
            <p className="muted">Local drafts and cached routes stay available without a network.</p>
          </article>
          <article className="feature-card">
            <strong>Accessibility</strong>
            <p className="muted">Theme, contrast, font scaling, and left-handed layout controls.</p>
          </article>
        </div>
      </section>

      <section className="auth-panel">
        <div className="split-header">
          <div>
            <span className="eyebrow">Welcome</span>
            <h2>{mode === 'signup' ? 'Create your account' : 'Sign in to continue'}</h2>
          </div>
          <div className="segmented" aria-label="Authentication mode">
            <button
              type="button"
              className={mode === 'signin' ? 'is-active' : ''}
              onClick={() => navigate('/auth/signin')}
            >
              Sign In
            </button>
            <button
              type="button"
              className={mode === 'signup' ? 'is-active' : ''}
              onClick={() => navigate('/auth/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
        <AuthForm mode={mode} authError={authError} onSubmit={handleSubmit} onGuest={handleGuest} />
      </section>
    </main>
  );
}
