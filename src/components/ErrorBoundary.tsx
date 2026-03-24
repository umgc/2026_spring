import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error(error, info);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="auth-layout">
        <section className="auth-panel">
          <span className="eyebrow">Recovery</span>
          <h1 className="hero-title">Something went wrong.</h1>
          <p className="hero-copy">
            The app hit an unexpected error. You can retry this view or return to the dashboard.
          </p>
          {this.state.error?.message ? (
            <div className="error-banner" role="alert">
              {this.state.error.message}
            </div>
          ) : null}
          <div className="button-row">
            <button type="button" className="btn btn-primary" onClick={this.handleReset}>
              Try again
            </button>
            <Link className="btn" to="/dashboard" onClick={this.handleReset}>
              Dashboard
            </Link>
          </div>
        </section>
      </main>
    );
  }
}
