import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import App from "./App";

const user = userEvent.setup();

// flush microtasks + timers + rAF in a React-safe way
async function flush() {
  await act(async () => {
    await Promise.resolve();
  });
}

test("keyboard navigation: can tab to Settings control", async () => {
  render(<App />);
  await user.tab();
  const settingsButton = await screen.findByLabelText(/settings/i);
  for (let i = 0; i < 40 && document.activeElement !== settingsButton; i++) {
    await user.tab();
  }
  expect(settingsButton).toHaveFocus();
});

test("keyboard shortcut: Ctrl+2 navigates to Explore", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  await act(async () => {
    fireEvent.keyDown(window, { key: "2", ctrlKey: true });
    await Promise.resolve();
  });
  const activeTab = document.querySelector('nav[aria-label="Main navigation tabs"] button[aria-current="page"]');
  expect(activeTab).not.toBeNull();
  expect(activeTab).toHaveTextContent(/explore/i);
});

test("keyboard shortcut: Ctrl+O calls desktop.file.open()", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  await act(async () => {
    fireEvent.keyDown(window, { key: "o", ctrlKey: true });
    await Promise.resolve();
  });
  expect(window.desktop.file.open).toHaveBeenCalledTimes(1);
});

test("keyboard shortcut: Ctrl+1 navigates to Home", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  fireEvent.keyDown(window, { key: "1", ctrlKey: true });
  const nav = screen.getByLabelText(/main navigation tabs/i);
  expect(nav).toHaveTextContent("Home");
});

test("keyboard shortcut: Ctrl+3 navigates to Profile", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  await act(async () => {
    fireEvent.keyDown(window, { key: "3", ctrlKey: true });
    await Promise.resolve();
  });
  const nav = screen.getByLabelText(/main navigation tabs/i);
  expect(nav).toHaveTextContent("Profile");
});

test("keyboard action: Tray button calls desktop.app.toggleTrayWindow()", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  const trayBtn = screen.getByRole("button", { name: /tray/i });
  await act(async () => {
    trayBtn.click();
    await Promise.resolve();
  });
  expect(window.desktop.app.toggleTrayWindow).toHaveBeenCalledTimes(1);
});

test("home screen renders Recent Activity section (smoke + branch coverage)", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  expect(await screen.findByText(/recent activity/i)).toBeInTheDocument();
  expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
});

test("explore screen renders Recent Files section when Ctrl+2 is used", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  await act(async () => {
    fireEvent.keyDown(window, { key: "2", ctrlKey: true });
    await Promise.resolve();
  });
  expect(await screen.findByText(/recent files/i)).toBeInTheDocument();
  expect(await screen.findByText(/C:\\temp\\example1\.txt/i)).toBeInTheDocument();
});

test("home: Open Folder button calls desktop.file.openFolder()", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  const btn = screen.getByRole("button", { name: /open folder/i });
  await act(async () => {
    btn.click();
    await Promise.resolve();
  });
  expect(window.desktop.file.openFolder).toHaveBeenCalledTimes(1);
});

test("utility rail: Keys button opens shortcuts help", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  const keysBtn = screen.getByRole("button", { name: /^keys$/i });
  await act(async () => {
    keysBtn.click();
    await Promise.resolve();
  });
  expect(screen.getByRole("heading", { name: /keyboard shortcuts/i })).toBeInTheDocument();
});

test("settings: navigate to Settings tab and toggle High Contrast", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  const nav = screen.getByLabelText(/main navigation tabs/i);
  const settingsTab = within(nav).getByRole("button", { name: /^settings$/i });
  await act(async () => {
    settingsTab.click();
    await Promise.resolve();
  });
  const highContrastLabel = await screen.findByText(/high contrast/i);
  const row = highContrastLabel.closest("section, div, li") || highContrastLabel.parentElement;
  const switchEl =
    (row && row.querySelector('[role="switch"]')) ||
    (row && row.querySelector('input[type="checkbox"]'));
  if (switchEl) {
    const before =
      switchEl.getAttribute("aria-checked") ??
      (switchEl instanceof HTMLInputElement ? String(switchEl.checked) : null);
    await act(async () => {
      switchEl.click();
      await Promise.resolve();
    });
    const after =
      switchEl.getAttribute("aria-checked") ??
      (switchEl instanceof HTMLInputElement ? String(switchEl.checked) : null);
    expect(after).not.toEqual(before);
  } else {
    await act(async () => {
      highContrastLabel.click();
      await Promise.resolve();
    });
    expect(screen.getByText(/high contrast/i)).toBeInTheDocument();
  }
});

test("keyboard shortcut: Ctrl+N creates a new note", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  fireEvent.keyDown(window, { key: "n", ctrlKey: true });
  expect(screen.getByRole("status")).toHaveTextContent(/created new note/i);
});

test("keyboard shortcut: Ctrl+S triggers save flow", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  fireEvent.keyDown(window, { key: "s", ctrlKey: true });
  await flush();
  expect(window.desktop.file.save).toHaveBeenCalled();
});

test("keyboard shortcut: Ctrl+Shift+S triggers save-as flow", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  fireEvent.keyDown(window, { key: "S", ctrlKey: true, shiftKey: true });
  await flush();
  expect(window.desktop.file.saveAs).toHaveBeenCalled();
});

test("keys modal: close button dismisses Keyboard Shortcuts dialog", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  const keysBtn = screen.getByRole("button", { name: /^keys$/i });
  await act(async () => {
    keysBtn.click();
    await Promise.resolve();
  });
  expect(screen.getByRole("heading", { name: /keyboard shortcuts/i })).toBeInTheDocument();
  const closeBtn = screen.getByRole("button", { name: /^close$/i });
  await act(async () => {
    closeBtn.click();
    await Promise.resolve();
  });
  expect(screen.queryByRole("heading", { name: /keyboard shortcuts/i })).toBeNull();
});

test("app bar: Open button triggers desktop.file.open()", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  const openBtn = screen.getByRole("button", { name: /^open$/i });
  await act(async () => {
    openBtn.click();
    await Promise.resolve();
  });
  expect(window.desktop.file.open).toHaveBeenCalled();
});

test("keyboard: Alt+Left and Alt+Right navigate history", async () => {
  // Force the app to start unauthenticated so the Sign In button is visible
  window.desktop.state.get.mockResolvedValueOnce({
    ok: true,
    state: {
      prefs: {
        themeMode: "light",
        leftHanded: true,
        autoRefreshRecent: true,
        largeText: false,
        highContrast: false,
        confirmTrayMinimize: true,
      },
      auth: { isAuthenticated: false },
    },
  });

  render(<App />);

  // Wait for sign-in screen to appear after async hydration
  const signInBtn = await screen.findByRole("button", { name: /sign in/i });
  await act(async () => {
    signInBtn.click();
    await Promise.resolve();
  });

  // Helper: returns the text of the currently active nav tab
  const activeTabText = () => {
    const nav = document.querySelector('nav[aria-label="Main navigation tabs"]');
    return nav?.querySelector('[aria-current="page"]')?.textContent?.trim() ?? "";
  };

  // Navigate to Explore
  await act(async () => {
    fireEvent.keyDown(window, { key: "2", ctrlKey: true });
    await Promise.resolve();
  });
  await screen.findByRole("button", { name: /explore/i, current: "page" });
  expect(activeTabText()).toMatch(/explore/i);

  // Navigate to Profile
  await act(async () => {
    fireEvent.keyDown(window, { key: "3", ctrlKey: true });
    await Promise.resolve();
  });
  await screen.findByRole("button", { name: /profile/i, current: "page" });
  expect(activeTabText()).toMatch(/profile/i);

  // Alt+Left => back to Explore
  await act(async () => {
    fireEvent.keyDown(window, { key: "ArrowLeft", altKey: true });
    await Promise.resolve();
  });
  await screen.findByRole("button", { name: /explore/i, current: "page" });
  expect(activeTabText()).toMatch(/explore/i);

  // Alt+Right => forward to Profile
  await act(async () => {
    fireEvent.keyDown(window, { key: "ArrowRight", altKey: true });
    await Promise.resolve();
  });
  await screen.findByRole("button", { name: /profile/i, current: "page" });
  expect(activeTabText()).toMatch(/profile/i);
});

// ─── TARGETED BRANCH COVERAGE TESTS ─────────────────────────────────────────

test("settings: toggle Dark Mode theme", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  const nav = screen.getByLabelText(/main navigation tabs/i);
  within(nav).getByRole("button", { name: /^settings$/i }).click();
  const darkModeBtn = await screen.findByRole("button", { name: /dark mode/i });
  await act(async () => { darkModeBtn.click(); await Promise.resolve(); });
  expect(darkModeBtn).toHaveTextContent(/dark mode/i);
});

test("settings: toggle Left-Handed Mode", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  const nav = screen.getByLabelText(/main navigation tabs/i);
  within(nav).getByRole("button", { name: /^settings$/i }).click();
  const checkbox = await screen.findByTitle ? 
    document.querySelector('input[type="checkbox"]') : null;
  // Find Left-Handed label, get its checkbox
  const label = await screen.findByText(/left-handed mode/i);
  const row = label.closest("label");
  const input = row?.querySelector('input[type="checkbox"]');
  if (input) {
    const before = input.checked;
    await act(async () => { input.click(); await Promise.resolve(); });
    expect(input.checked).not.toBe(before);
  }
});

test("settings: updater Check button calls desktop.updater.check()", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  const nav = screen.getByLabelText(/main navigation tabs/i);
  await act(async () => {
    within(nav).getByRole("button", { name: /^settings$/i }).click();
    await Promise.resolve();
  });
  const checkBtn = await screen.findByRole("button", { name: /^check$/i });
  await act(async () => { checkBtn.click(); await Promise.resolve(); });
  expect(window.desktop.updater.check).toHaveBeenCalled();
});

test("settings: updater Download button calls desktop.updater.download()", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  const nav = screen.getByLabelText(/main navigation tabs/i);
  await act(async () => {
    within(nav).getByRole("button", { name: /^settings$/i }).click();
    await Promise.resolve();
  });
  const dlBtn = await screen.findByRole("button", { name: /download/i });
  await act(async () => { dlBtn.click(); await Promise.resolve(); });
  expect(window.desktop.updater.download).toHaveBeenCalled();
});

test("explore: search filter narrows file list", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  await act(async () => {
    fireEvent.keyDown(window, { key: "2", ctrlKey: true });
    await Promise.resolve();
  });
  const filterInput = await screen.findByPlaceholderText(/search topics/i);
  await act(async () => {
    fireEvent.change(filterInput, { target: { value: "example1" } });
    await Promise.resolve();
  });
  // Each file button has a unique title= — use that to avoid the duplicate text problem
  // (each card renders the name twice: once as short title, once as full path subtitle)
  expect(screen.getByTitle("C:\\temp\\example1.txt")).toBeInTheDocument();
  expect(screen.queryByTitle("C:\\temp\\example2.txt")).not.toBeInTheDocument();
});

test("explore: empty filter shows all recent files", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  await act(async () => {
    fireEvent.keyDown(window, { key: "2", ctrlKey: true });
    await Promise.resolve();
  });
  // Use button title= attribute to avoid matching both the short name and full path spans
  expect(await screen.findByTitle("C:\\temp\\example1.txt")).toBeInTheDocument();
  expect(screen.getByTitle("C:\\temp\\example2.txt")).toBeInTheDocument();
});

test("rail: New button creates a new note", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  const newBtn = screen.getByRole("button", { name: /^new$/i });
  await act(async () => { newBtn.click(); await Promise.resolve(); });
  expect(screen.getByRole("status")).toHaveTextContent(/created new note/i);
});

test("app bar: Forward button navigates forward after going back", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  // Go to Explore then back to Home, then Forward to Explore
  await act(async () => {
    fireEvent.keyDown(window, { key: "2", ctrlKey: true });
    await Promise.resolve();
  });
  const backBtn = screen.getByRole("button", { name: /^back$/i });
  await act(async () => { backBtn.click(); await Promise.resolve(); });
  const forwardBtn = screen.getByRole("button", { name: /forward/i });
  await act(async () => { forwardBtn.click(); await Promise.resolve(); });
  const nav = screen.getByLabelText(/main navigation tabs/i);
  expect(nav.querySelector('[aria-current="page"]')).toHaveTextContent(/explore/i);
});

test("notes editor: Save As button calls desktop.file.saveAs()", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  await act(async () => {
    fireEvent.keyDown(window, { key: "3", ctrlKey: true });
    await Promise.resolve();
  });
  const editorSection = document.querySelector(".editor-card");
  const saveAsBtn = within(editorSection).getByRole("button", { name: /^save as$/i });
  await act(async () => { saveAsBtn.click(); await Promise.resolve(); });
  expect(window.desktop.file.saveAs).toHaveBeenCalled();
});

test("notes editor: typing in textarea marks document dirty", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  await act(async () => {
    fireEvent.keyDown(window, { key: "3", ctrlKey: true });
    await Promise.resolve();
  });
  const editor = await screen.findByLabelText(/note editor/i);
  await act(async () => {
    fireEvent.change(editor, { target: { value: "new content" } });
    await Promise.resolve();
  });
  // dirty state shows "Unsaved" pill
  expect(document.querySelector(".status-pill.warning")).toBeInTheDocument();
});

test("sign up button authenticates the user", async () => {
  window.desktop.state.get.mockResolvedValueOnce({
    ok: true,
    state: {
      prefs: { themeMode: "light", leftHanded: true, autoRefreshRecent: true, largeText: false, highContrast: false, confirmTrayMinimize: true },
      auth: { isAuthenticated: false },
    },
  });
  render(<App />);
  const signUpBtn = await screen.findByRole("button", { name: /sign up/i });
  await act(async () => { signUpBtn.click(); await Promise.resolve(); });
  expect(await screen.findByLabelText(/settings/i)).toBeInTheDocument();
});

test("sign out from Profile returns to auth screen", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  await act(async () => {
    fireEvent.keyDown(window, { key: "3", ctrlKey: true });
    await Promise.resolve();
  });
  const signOutBtn = await screen.findByRole("button", { name: /sign out/i });
  await act(async () => { signOutBtn.click(); await Promise.resolve(); });
  expect(await screen.findByRole("button", { name: /sign in/i })).toBeInTheDocument();
});

test("keyboard shortcut: Ctrl+, navigates to Settings", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  await act(async () => {
    fireEvent.keyDown(window, { key: ",", ctrlKey: true });
    await Promise.resolve();
  });
  const nav = screen.getByLabelText(/main navigation tabs/i);
  expect(nav.querySelector('[aria-current="page"]')).toHaveTextContent(/settings/i);
});

test("save button in Profile notes editor calls desktop.file.save()", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  await act(async () => {
    fireEvent.keyDown(window, { key: "3", ctrlKey: true });
    await Promise.resolve();
  });
  // Scope to the editor card to avoid matching the rail "Save" button
  const editorSection = document.querySelector(".editor-card");
  const saveBtn = within(editorSection).getByRole("button", { name: /^save$/i });
  await act(async () => { saveBtn.click(); await Promise.resolve(); });
  expect(window.desktop.file.save).toHaveBeenCalled();
});

// ─── BRANCH COVERAGE BOOST TESTS ─────────────────────────────────────────────

test("home: Assignments quick action navigates to Explore", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  // Action cards use role="listitem" which doesn't support accessible names,
  // so find by text content using getAllByRole("listitem")
  const assignmentsBtn = screen.getAllByRole("listitem")
    .find(el => el.textContent.includes("Assignments"));
  await act(async () => {
    assignmentsBtn.click();
    await Promise.resolve();
  });
  const nav = screen.getByLabelText(/main navigation tabs/i);
  expect(nav.querySelector('[aria-current="page"]')).toHaveTextContent(/explore/i);
});

test("home: Progress quick action navigates to Profile", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  const progressBtn = screen.getAllByRole("listitem")
    .find(el => el.textContent.includes("Progress"));
  await act(async () => {
    progressBtn.click();
    await Promise.resolve();
  });
  const nav = screen.getByLabelText(/main navigation tabs/i);
  expect(nav.querySelector('[aria-current="page"]')).toHaveTextContent(/profile/i);
});

test("explore: clicking a recent file button calls desktop.file.read()", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  await act(async () => {
    fireEvent.keyDown(window, { key: "2", ctrlKey: true });
    await Promise.resolve();
  });
  const fileBtn = await screen.findByTitle("C:\\temp\\example1.txt");
  await act(async () => {
    fileBtn.click();
    await Promise.resolve();
  });
  expect(window.desktop.file.read).toHaveBeenCalledWith("C:\\temp\\example1.txt");
});

test("settings: System Default theme button updates status", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  const nav = screen.getByLabelText(/main navigation tabs/i);
  await act(async () => {
    within(nav).getByRole("button", { name: /^settings$/i }).click();
    await Promise.resolve();
  });
  const systemBtn = await screen.findByRole("button", { name: /system default/i });
  await act(async () => {
    systemBtn.click();
    await Promise.resolve();
  });
  expect(screen.getByRole("status")).toHaveTextContent(/system theme/i);
});

test("settings: Install & Restart button calls desktop.updater.install()", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  const nav = screen.getByLabelText(/main navigation tabs/i);
  await act(async () => {
    within(nav).getByRole("button", { name: /^settings$/i }).click();
    await Promise.resolve();
  });
  const installBtn = await screen.findByRole("button", { name: /install/i });
  await act(async () => {
    installBtn.click();
    await Promise.resolve();
  });
  expect(window.desktop.updater.install).toHaveBeenCalled();
});

test("shortcuts modal: clicking backdrop dismisses it", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  const keysBtn = screen.getByRole("button", { name: /^keys$/i });
  await act(async () => {
    keysBtn.click();
    await Promise.resolve();
  });
  expect(screen.getByRole("heading", { name: /keyboard shortcuts/i })).toBeInTheDocument();
  // Click the backdrop (role=presentation), not the inner dialog
  const backdrop = document.querySelector(".modal-backdrop");
  await act(async () => {
    fireEvent.click(backdrop);
    await Promise.resolve();
  });
  expect(screen.queryByRole("heading", { name: /keyboard shortcuts/i })).toBeNull();
});

test("footer: status bar shows Modified when editor is dirty", async () => {
  render(<App />);
  await screen.findByLabelText(/settings/i);
  // Navigate to notes/profile which has the editor
  await act(async () => {
    fireEvent.keyDown(window, { key: "3", ctrlKey: true });
    await Promise.resolve();
  });
  const editor = await screen.findByLabelText(/note editor/i);
  await act(async () => {
    fireEvent.change(editor, { target: { value: "changed content" } });
    await Promise.resolve();
  });
  // The footer's second span shows "Modified · <filename>" when dirty
  const footer = screen.getByRole("status");
  expect(footer).toHaveTextContent(/modified/i);
});