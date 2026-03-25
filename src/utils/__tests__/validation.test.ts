import { validateAuthForm, validateCourseForm } from '../validation';

describe('validation utilities', () => {
  it('returns auth form errors for invalid sign-up values', () => {
    expect(
      validateAuthForm({ name: '', email: 'bad-email', password: '123' }, 'signup'),
    ).toEqual({
      name: 'Name is required.',
      email: 'Enter a valid email address.',
      password: 'Password must be at least 6 characters.',
    });
  });

  it('returns no auth errors for valid sign-in values', () => {
    expect(
      validateAuthForm(
        { name: '', email: 'demo@edulence.app', password: 'demo1234' },
        'signin',
      ),
    ).toEqual({});
  });

  it('returns course form errors for invalid values', () => {
    expect(
      validateCourseForm({
        title: '',
        code: '',
        instructor: '',
        credits: 0,
        progress: 120,
        schedule: '',
        description: '',
      }),
    ).toEqual({
      title: 'Course title is required.',
      code: 'Course code is required.',
      instructor: 'Instructor is required.',
      schedule: 'Schedule is required.',
      credits: 'Credits must be between 1 and 6.',
      progress: 'Progress must be between 0 and 100.',
    });
  });
});
