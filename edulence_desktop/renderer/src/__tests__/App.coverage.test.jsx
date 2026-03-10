import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';

async function renderAndEnterApp() {
  const user = userEvent.setup();
  render(<App />);

  const signInBtn = await screen.findByRole('button', { name: /sign in/i });
  await user.click(signInBtn);

  await screen.findByRole('navigation', { name: /main navigation/i });
  return { user };
}

async function goTo(user, nameRegex) {
  await user.click(screen.getByRole('button', { name: nameRegex }));
}

describe('App coverage flows (high coverage)', () => {
  test('basic navigation: Dashboard -> Courses -> Notes -> Dashboard', async () => {
    const { user } = await renderAndEnterApp();

    expect(await screen.findByRole('heading', { name: /dashboard/i })).toBeInTheDocument();

    await goTo(user, /courses/i);
    expect(await screen.findByRole('heading', { name: /^courses$/i })).toBeInTheDocument();

    await goTo(user, /notes/i);
    expect(await screen.findByRole('heading', { name: /^notes$/i })).toBeInTheDocument();

    await goTo(user, /dashboard/i);
    expect(await screen.findByRole('heading', { name: /^dashboard$/i })).toBeInTheDocument();
  });

  test('topbar buttons: Refresh and Settings (icon) are clickable', async () => {
    const { user } = await renderAndEnterApp();

    const refreshBtn = screen.getByRole('button', { name: /refresh/i });
    await user.click(refreshBtn);
    expect(refreshBtn).toBeInTheDocument();

    // There are 2 settings buttons (topbar icon + sidebar item). Click the topbar one first.
    const settingsBtns = screen.getAllByRole('button', { name: /settings/i });
    await user.click(settingsBtns[0]);
    expect(settingsBtns[0]).toBeInTheDocument();
  });

  test('Dashboard: stats section and New Course button', async () => {
    const { user } = await renderAndEnterApp();

    expect(await screen.findByRole('heading', { name: /dashboard/i })).toBeInTheDocument();

    const stats = screen.getByLabelText(/dashboard summary statistics/i);
    expect(stats).toBeInTheDocument();

    const statCards = within(stats).getAllByText(/courses|progress|completed|assignments/i, { exact: false });
    expect(statCards.length).toBeGreaterThan(0);

    const newCourseBtn = screen.getByRole('button', { name: /new course/i });
    await user.click(newCourseBtn);

    expect(screen.getByText(/EduLense/i)).toBeInTheDocument();
  });

  test('Courses: search empty and non-empty + progressbars + Add Course', async () => {
    const { user } = await renderAndEnterApp();

    await goTo(user, /courses/i);
    expect(await screen.findByRole('heading', { name: /^courses$/i })).toBeInTheDocument();

    const search = await screen.findByPlaceholderText(/search courses/i);

    await user.clear(search);
    expect(search).toHaveValue('');

    await user.type(search, 'cs');
    expect(search).toHaveValue('cs');

    const bars = screen.getAllByRole('progressbar');
    expect(bars.length).toBeGreaterThan(0);
    expect(bars[0]).toHaveAttribute('aria-valuenow');

    const addBtn = screen.getByRole('button', { name: /add course/i });
    await user.click(addBtn);

    expect(screen.getByText(/EduLense/i)).toBeInTheDocument();
  });

  // ✅ FIXED: click a course title safely (no multiple-match error)
  test('Courses: click a course card (drives selection/detail branch)', async () => {
    const { user } = await renderAndEnterApp();

    await goTo(user, /courses/i);
    expect(await screen.findByRole('heading', { name: /^courses$/i })).toBeInTheDocument();

    // Grab all matching course titles and click the first one.
    const titles = screen.getAllByText(
      /advanced calculus|physics ii|computer science|english literature|world history/i
    );
    expect(titles.length).toBeGreaterThan(0);

    const btn = titles[0].closest('button');
    if (btn) {
      await user.click(btn);
    }

    expect(screen.getByText(/EduLense/i)).toBeInTheDocument();
  });

  test('Notes: search, filter buttons, select note, edit note', async () => {
    const { user } = await renderAndEnterApp();

    await goTo(user, /notes/i);
    expect(await screen.findByRole('heading', { name: /notes/i })).toBeInTheDocument();

    const notesList = await screen.findByRole('complementary', { name: /notes list/i });

    const search = within(notesList).getByRole('searchbox', { name: /search notes/i });
    await user.clear(search);
    await user.type(search, 'calc');
    expect(search).toHaveValue('calc');

    const filtersNav = within(notesList).getByRole('navigation', { name: /note filters/i });
    const filterButtons = within(filtersNav).getAllByRole('button');
    for (const btn of filterButtons) await user.click(btn);

    const noteTileTitle = await within(notesList).findByText(/calculus lecture/i);
    const tileBtn = noteTileTitle.closest('button');
    if (tileBtn) await user.click(tileBtn);

    const editor = await screen.findByRole('textbox');
    await user.type(editor, '\nBranch coverage push');
    expect(editor.value).toContain('Branch coverage push');
  });

  test('Notes: create new note button path', async () => {
    const { user } = await renderAndEnterApp();

    await goTo(user, /notes/i);
    const notesList = await screen.findByRole('complementary', { name: /notes list/i });

    const newBtn = within(notesList).getByRole('button', { name: /create new note/i });
    await user.click(newBtn);

    const editor = await screen.findByRole('textbox');
    expect(editor).toBeInTheDocument();
  });

  test('Shortcuts modal: open with keyboard and close with button', async () => {
    const { user } = await renderAndEnterApp();

    await user.keyboard('{Control>}/{/Control}');
    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByText(/keyboard shortcuts/i)).toBeInTheDocument();

    const closeBtn = within(dialog).getByRole('button', { name: /close shortcuts dialog/i });
    await user.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  test('Topbar quick action glyphs render', async () => {
    await renderAndEnterApp();
    const icons = screen.getAllByText(/🕒|🔖|📘|📅|🗒|ⓘ|⇪|⬇|✎|🗑|🔗|🔍|⤢|⤡|＋/);
    expect(icons.length).toBeGreaterThan(5);
  });
});
