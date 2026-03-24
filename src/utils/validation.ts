import type { AuthFormValues, CourseDraft } from '../types';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAuthForm(values: AuthFormValues, mode: 'signin' | 'signup') {
  const errors: Partial<Record<keyof AuthFormValues, string>> = {};

  if (mode === 'signup' && !values.name.trim()) {
    errors.name = 'Name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
}

export function validateCourseForm(values: CourseDraft) {
  const errors: Partial<Record<keyof CourseDraft, string>> = {};

  if (!values.title.trim()) errors.title = 'Course title is required.';
  if (!values.code.trim()) errors.code = 'Course code is required.';
  if (!values.instructor.trim()) errors.instructor = 'Instructor is required.';
  if (!values.schedule.trim()) errors.schedule = 'Schedule is required.';

  const credits = Number(values.credits);
  if (!Number.isFinite(credits) || credits < 1 || credits > 6) {
    errors.credits = 'Credits must be between 1 and 6.';
  }

  const progress = Number(values.progress);
  if (!Number.isFinite(progress) || progress < 0 || progress > 100) {
    errors.progress = 'Progress must be between 0 and 100.';
  }

  return errors;
}
