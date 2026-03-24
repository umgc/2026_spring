import { useState, type ChangeEvent, type FormEvent } from 'react';
import { validateAuthForm } from '../../utils/validation';
import type { AuthFormValues } from '../../types';

type AuthFormProps = {
  mode: 'signin' | 'signup';
  authError: string | null;
  onSubmit: (values: AuthFormValues) => Promise<void>;
  onGuest: (values: AuthFormValues) => void;
};

const initialValues: AuthFormValues = {
  name: '',
  email: 'demo@edulence.app',
  password: 'demo1234',
};

export default function AuthForm({ mode, authError, onSubmit, onGuest }: AuthFormProps) {
  const [values, setValues] = useState<AuthFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof AuthFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateAuthForm(values, mode);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      {mode === 'signup' ? (
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" value={values.name} onChange={handleChange} autoComplete="name" />
          {errors.name ? <span className="field-error">{errors.name}</span> : null}
        </div>
      ) : null}

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          autoComplete="email"
        />
        {errors.email ? <span className="field-error">{errors.email}</span> : null}
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
        />
        {errors.password ? <span className="field-error">{errors.password}</span> : null}
      </div>

      <p className="muted">Demo account: `demo@edulence.app / demo1234`</p>
      {authError ? (
        <div className="error-banner" role="alert">
          {authError}
        </div>
      ) : null}

      <div className="button-row">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Working...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => onGuest(values)} disabled={isSubmitting}>
          Continue as Guest
        </button>
      </div>
    </form>
  );
}
