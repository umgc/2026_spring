import React from "react";
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

function makeDesktopMock({
  isAuthenticated = true,
  updaterState = "idle",
  updaterMessage = "Updater unavailable",
} = {}) {
  return {
    file: {
      open: jest.fn().mockResolvedValue({
        ok: true,
        canceled: false,
        filePath: "C:\\notes\\lecture.md",
        content: "# Opened Note\n\nHello from disk.",
      }),
      save: jest.fn().mockResolvedValue({
        ok: true,
        canceled: false,
        filePath: "C:\\notes\\lecture.md",
      }),
      saveAs: jest.fn().mockResolvedValue({
        ok: true,
        canceled: false,
        filePath: "C:\\notes\\lecture-copy.md",
      }),
      read: jest.fn().mockResolvedValue({
        ok: true,
        content: "# Recent File\n\nOpened from recent file list.",
      }),
      openFolder: jest.fn().mockResolvedValue({
        ok: true,
        canceled: false,
        folderPath: "C:\\notes",
      }),
    },
    state: {
      get: jest.fn().mockResolvedValue({
        ok: true,
        state: {
          prefs: {
            themeMode: "dark",
            autoRefreshRecent: true,
            largeText: false,
            highContrast: false,
            confirmTrayMinimize: true,
          },
          auth: { isAuthenticated },
        },
      }),
      save: jest.fn().mockResolvedValue({ ok: true }),
    },
    updater: {
      getStatus: jest.fn().mockResolvedValue({
        status: {
          state: updaterState,
          message: updaterMessage,
        },
      }),
      check: jest.fn().mockResolvedValue({ ok: true }),
      download: jest.fn().mockResolvedValue({ ok: true }),
      install: jest.fn().mockResolvedValue({ ok: true }),
    },
    app: {
      toggleTrayWindow: jest.fn(),
    },
    onUpdaterStatus: jest.fn((callback) => {
      void callback;
      return () => {};
    }),
    onMenuCommand: jest.fn((callback) => {
      void callback;
      return () => {};
    }),
  };
}

function installDesktopMock(options = {}) {
  const desktop = makeDesktopMock(options);
  window.desktop = desktop;
  return desktop;
}

async function renderAuthenticatedApp() {
  const desktop = installDesktopMock({ isAuthenticated: true });
  const user = userEvent.setup();
  render(<App />);
  await screen.findByRole("navigation", { name: /main navigation tabs/i });
  return { user, desktop };
}

async function renderUnauthenticatedApp() {
  const desktop = installDesktopMock({ isAuthenticated: false });
  const user = userEvent.setup();
  render(<App />);
  await screen.findByRole("button", { name: /sign in/i });
  return { user, desktop };
}

beforeEach(() => {
  jest.clearAllMocks();
  installDesktopMock();
});

describe("App", () => {
  test("renders auth screen when desktop state says user is signed out", async () => {
    await renderUnauthenticatedApp();

    expect(screen.getByRole("heading", { name: /welcome to edulense/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
  });

  test("sign in moves user into the main app shell", async () => {
    const { user } = await renderUnauthenticatedApp();

    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByRole("heading", { name: /^dashboard$/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /main navigation tabs/i })).toBeInTheDocument();
  });

  test("create account also moves user into the main app shell", async () => {
    const { user } = await renderUnauthenticatedApp();

    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(await screen.findByRole("heading", { name: /^dashboard$/i })).toBeInTheDocument();
  });

  test("dashboard renders summary content after hydration", async () => {
    await renderAuthenticatedApp();

    expect(screen.getByRole("heading", { name: /^dashboard$/i })).toBeInTheDocument();
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dashboard summary statistics/i)).toBeInTheDocument();
    expect(screen.getByText(/active courses/i)).toBeInTheDocument();
  });

  test("skip link focuses the main content region", async () => {
    const { user } = await renderAuthenticatedApp();

    await user.click(screen.getByRole("link", { name: /skip to main content/i }));

    expect(document.activeElement).toHaveAttribute("id", "main-content");
  });

  test("topbar settings button navigates to settings page", async () => {
    const { user } = await renderAuthenticatedApp();

    const banner = screen.getAllByRole("banner")[0];
    await user.click(within(banner).getByRole("button", { name: /^settings$/i }));

    expect(await screen.findByRole("heading", { name: /^settings$/i })).toBeInTheDocument();
  });

  test("sidebar navigation can move between courses, help, and dashboard", async () => {
    const { user } = await renderAuthenticatedApp();
    const nav = screen.getByRole("navigation", { name: /main navigation tabs/i });

    await user.click(within(nav).getByRole("button", { name: /courses, 8 items/i }));
    expect(await screen.findByRole("heading", { name: /^courses$/i })).toBeInTheDocument();

    await user.click(within(nav).getByRole("button", { name: /^help$/i }));
    expect(await screen.findByRole("heading", { name: /^help$/i })).toBeInTheDocument();

    await user.click(within(nav).getByRole("button", { name: /^dashboard$/i }));
    expect(await screen.findByRole("heading", { name: /^dashboard$/i })).toBeInTheDocument();
  });

  test("keyboard shortcuts navigate across major sections", async () => {
    await renderAuthenticatedApp();

    fireEvent.keyDown(window, { key: "2", ctrlKey: true });
    expect(await screen.findByRole("heading", { name: /^courses$/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "3", ctrlKey: true });
    expect(await screen.findByRole("heading", { name: /^notes$/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: ",", ctrlKey: true });
    expect(await screen.findByRole("heading", { name: /^settings$/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "1", ctrlKey: true });
    expect(await screen.findByRole("heading", { name: /^dashboard$/i })).toBeInTheDocument();
  });

  test("alt+left and alt+right navigate history", async () => {
    await renderAuthenticatedApp();

    fireEvent.keyDown(window, { key: "2", ctrlKey: true });
    await screen.findByRole("heading", { name: /^courses$/i });

    fireEvent.keyDown(window, { key: "3", ctrlKey: true });
    await screen.findByRole("heading", { name: /^notes$/i });

    fireEvent.keyDown(window, { key: "ArrowLeft", altKey: true });
    expect(await screen.findByRole("heading", { name: /^courses$/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "ArrowRight", altKey: true });
    expect(await screen.findByRole("heading", { name: /^notes$/i })).toBeInTheDocument();
  });

  test("courses page search narrows results", async () => {
    const { user } = await renderAuthenticatedApp();

    fireEvent.keyDown(window, { key: "2", ctrlKey: true });
    await screen.findByRole("heading", { name: /^courses$/i });

    const search = screen.getByRole("searchbox", { name: /search courses/i });
    await user.clear(search);
    await user.type(search, "biology");

    expect(screen.getByRole("button", { name: /biology/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /advanced calculus/i })).not.toBeInTheDocument();
  });

  test("courses page tab filters switch visible courses", async () => {
    const { user } = await renderAuthenticatedApp();

    fireEvent.keyDown(window, { key: "2", ctrlKey: true });
    await screen.findByRole("heading", { name: /^courses$/i });

    await user.click(screen.getByRole("tab", { name: /completed/i }));
    expect(screen.getByRole("button", { name: /biology/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /modern art/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /advanced calculus/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: /favorites/i }));
    expect(screen.getByRole("button", { name: /advanced calculus/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /computer science/i })).toBeInTheDocument();
  });

  test("notes page supports searching and selecting notes", async () => {
    const { user } = await renderAuthenticatedApp();

    fireEvent.keyDown(window, { key: "3", ctrlKey: true });
    await screen.findByRole("heading", { name: /^notes$/i });

    const search = screen.getByRole("searchbox", { name: /search notes/i });
    await user.clear(search);
    await user.type(search, "physics");

    expect(screen.getByRole("button", { name: /physics lab notes/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /calculus lecture 15/i })).not.toBeInTheDocument();

    await user.clear(search);
    await user.click(screen.getByRole("button", { name: /calculus lecture 15/i }));
    expect(screen.getByRole("status")).toHaveTextContent(/viewing calculus lecture 15/i);
  });

  test("new note action and ctrl+n both create notes", async () => {
    const { user } = await renderAuthenticatedApp();

    fireEvent.keyDown(window, { key: "3", ctrlKey: true });
    await screen.findByRole("heading", { name: /^notes$/i });

    await user.click(screen.getByRole("button", { name: /create new note/i }));
    expect(screen.getByRole("status")).toHaveTextContent(/created new note/i);

    fireEvent.keyDown(window, { key: "n", ctrlKey: true });
    expect(screen.getByRole("status")).toHaveTextContent(/created new note/i);
  });

  test("editing and saving note uses desktop file APIs", async () => {
    const { user, desktop } = await renderAuthenticatedApp();

    fireEvent.keyDown(window, { key: "3", ctrlKey: true });
    await screen.findByRole("heading", { name: /^notes$/i });

    const editor = screen.getByRole("textbox", { name: /note editor content/i });
    await user.clear(editor);
    await user.type(editor, "Updated content for testing");

    expect(screen.getByText(/^unsaved$/i)).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/unsaved changes/i);

    await user.click(screen.getByRole("button", { name: /save note$/i }));
    expect(desktop.file.save).toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: /save note as/i }));
    expect(desktop.file.saveAs).toHaveBeenCalled();
  });

  test("ctrl+o, ctrl+s, and ctrl+shift+s call desktop file actions", async () => {
    const { desktop } = await renderAuthenticatedApp();

    fireEvent.keyDown(window, { key: "o", ctrlKey: true });
    await waitFor(() => expect(desktop.file.open).toHaveBeenCalled());

    fireEvent.keyDown(window, { key: "s", ctrlKey: true });
    await waitFor(() => expect(desktop.file.save).toHaveBeenCalled());

    fireEvent.keyDown(window, { key: "S", ctrlKey: true, shiftKey: true });
    await waitFor(() => expect(desktop.file.saveAs).toHaveBeenCalled());
  });

  test("shortcut modal opens with ctrl+/ and closes with the close button", async () => {
    const { user } = await renderAuthenticatedApp();

    fireEvent.keyDown(window, { key: "/", ctrlKey: true });
    expect(await screen.findByRole("heading", { name: /keyboard shortcuts/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /close shortcuts dialog/i }));
    expect(screen.queryByRole("heading", { name: /keyboard shortcuts/i })).not.toBeInTheDocument();
  });

  test("settings page toggles and updater action work", async () => {
    const { user, desktop } = await renderAuthenticatedApp();

    fireEvent.keyDown(window, { key: ",", ctrlKey: true });
    await screen.findByRole("heading", { name: /^settings$/i });

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(3);

    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    await user.click(checkboxes[2]);

    await user.click(screen.getByRole("button", { name: /check for updates/i }));
    expect(desktop.updater.check).toHaveBeenCalled();
  });

  test("theme radio group supports keyboard movement", async () => {
    await renderAuthenticatedApp();

    fireEvent.keyDown(window, { key: ",", ctrlKey: true });
    await screen.findByRole("heading", { name: /^settings$/i });

    const dark = screen.getByRole("radio", { name: /dark/i });
    dark.focus();

    fireEvent.keyDown(dark, { key: "ArrowRight" });

    expect(screen.getByRole("radio", { name: /light/i })).toHaveFocus();
  });

  test("help page shows accessibility content", async () => {
    const { user } = await renderAuthenticatedApp();
    const nav = screen.getByRole("navigation", { name: /main navigation tabs/i });

    await user.click(within(nav).getByRole("button", { name: /^help$/i }));

    expect(await screen.findByText(/desktop accessibility checklist/i)).toBeInTheDocument();
    expect(screen.getByText(/all features are reachable with keyboard navigation/i)).toBeInTheDocument();
  });
});