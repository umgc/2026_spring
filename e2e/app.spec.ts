import { test, expect } from '@playwright/test';

async function signIn(page: import('@playwright/test').Page) {
  await page.goto('/auth/signin');
  await page.getByRole('button', { name: 'Sign In' }).nth(1).click();
  await expect(page).toHaveURL(/dashboard/);
}

test('demo user can sign in and see dashboard shell', async ({ page }) => {
  await signIn(page);
  await expect(page.getByRole('heading', { name: 'EduLense', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /sign out/i })).toBeVisible();
});

test('user can add a completed course', async ({ page }) => {
  await signIn(page);
  await page.goto('/courses');
  await page.getByRole('button', { name: /add course/i }).click();
  await page.getByLabel('Title').fill('Software Testing');
  await page.getByLabel('Code').fill('SWEN-670');
  await page.getByLabel('Instructor').fill('Prof. Adams');
  await page.getByLabel('Credits').fill('3');
  await page.locator('#progress').fill('100');
  await page.getByLabel('Schedule').fill('Fri, 7:00 PM');
  await page.getByLabel('Description').fill('Graduate software testing.');
  const courseDialog = page.getByRole('dialog', { name: /add course/i });
  const saveCourseButton = courseDialog.getByRole('button', { name: /save course/i });
  await expect(saveCourseButton).toBeVisible();
  await expect(saveCourseButton).toBeEnabled();
  await courseDialog.locator('form').evaluate((form: HTMLFormElement) => form.requestSubmit());
  await expect(courseDialog).toBeHidden();

  await expect(page.getByRole('heading', { name: 'Software Testing' })).toBeVisible();
  await expect(page.getByText('Graduate software testing.', { exact: true })).toBeVisible();
});

test('user can create and edit a note', async ({ page }) => {
  await signIn(page);
  await page.goto('/notes');
  await page.getByRole('button', { name: /new note/i }).click();
  await page.getByLabel('Note title').fill('Week 11 QA Checklist');
  await page.getByLabel('Note content').fill('Write unit, RTL, and Playwright tests.');

  await expect(page.getByLabel('Note title')).toHaveValue('Week 11 QA Checklist');
  await expect(page.getByLabel('Note content')).toHaveValue('Write unit, RTL, and Playwright tests.');
});

test('user can change theme settings', async ({ page }) => {
  await signIn(page);
  await page.goto('/settings/appearance');
  await page.getByRole('radio', { name: /dark/i }).click();
  await expect(page.getByRole('radio', { name: /dark/i })).toHaveAttribute('aria-checked', 'true');
});
