import "@testing-library/jest-dom";

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('not wrapped in act')) return;
    originalError(...args);
  };
});

afterAll(() => { console.error = originalError; });
beforeEach(() => {
  window.desktop = {
    appInfo: { platform: "test" },

    file: {
      open: jest.fn().mockResolvedValue({ canceled: true }),
      save: jest.fn().mockResolvedValue({ ok: true, canceled: false }),
      saveAs: jest.fn().mockResolvedValue({ ok: true, canceled: false }),
      read: jest.fn().mockResolvedValue({ ok: false }),
      write: jest.fn().mockResolvedValue({ ok: true }),
      openFolder: jest.fn().mockResolvedValue({ canceled: true }),
      listDir: jest.fn().mockResolvedValue({ ok: true, entries: [] }),
      showOpenDialog: jest.fn().mockResolvedValue({ canceled: true }),
    },

    app: {
      toggleTrayWindow: jest.fn().mockResolvedValue({ visible: true }),
      getRecentFiles: jest.fn().mockResolvedValue({
        ok: true,
        files: [
          "C:\\temp\\example1.txt",
          "C:\\temp\\example2.txt",
        ],
      }),
      showItemInFolder: jest.fn().mockResolvedValue({ ok: true }),
      goBack: jest.fn(),
      goForward: jest.fn(),
      openPath: jest.fn().mockResolvedValue({ ok: true, result: "" }),
    },

    state: {
      get: jest.fn().mockResolvedValue({
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
          auth: { isAuthenticated: true },
        },
      }),
      save: jest.fn().mockResolvedValue({ ok: true }),
    },

    updater: {
      getStatus: jest.fn().mockResolvedValue({
        status: { state: "idle", message: "ok" },
      }),
      check: jest.fn(),
      download: jest.fn(),
      install: jest.fn(),
    },

    onMenuCommand: jest.fn(() => () => {}),
    onWindowAction: jest.fn(() => () => {}),
    onUpdaterStatus: jest.fn(() => () => {}),
  };
});