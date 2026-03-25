import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthForm from '../AuthForm';

describe('AuthForm', () => {
  it('shows validation errors and blocks submit when fields are invalid', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const onGuest = jest.fn();

    render(<AuthForm mode="signup" authError={null} onSubmit={onSubmit} onGuest={onGuest} />);

    await user.clear(screen.getByLabelText(/full name/i));
    await user.clear(screen.getByLabelText(/email/i));
    await user.type(screen.getByLabelText(/email/i), 'invalid');
    await user.clear(screen.getByLabelText(/password/i));
    await user.type(screen.getByLabelText(/password/i), '123');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(screen.getByText('Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();
    expect(screen.getByText('Password must be at least 6 characters.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls guest continuation with current field values', async () => {
    const user = userEvent.setup();
    const onGuest = jest.fn();

    render(
      <AuthForm
        mode="signin"
        authError={null}
        onSubmit={jest.fn().mockResolvedValue(undefined)}
        onGuest={onGuest}
      />,
    );

    await user.clear(screen.getByLabelText(/email/i));
    await user.type(screen.getByLabelText(/email/i), 'guest@example.com');
    await user.click(screen.getByRole('button', { name: /continue as guest/i }));

    expect(onGuest).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'guest@example.com' }),
    );
  });
});
