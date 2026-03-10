require('@testing-library/jest-dom');

// Provide a default mock for the Electron preload API so React tests can run in JSDOM.
// Individual tests can override any method as needed.
if (!globalThis.window) {
  globalThis.window = {};
}

if (!window.desktop) {
  const noop = () => {};
  const asyncOk = async (payload = {}) => ({ ok: true, ...payload });

  window.desktop = {
    appInfo: { platform: 'test' },
    file: {
      open: async () => ({ ok: true, canceled: true }),
      save: async () => ({ ok: true, canceled: true }),
      saveAs: async () => ({ ok: true, canceled: true }),
      read: async () => ({ ok: true, filePath: 'mock.md', content: 'hello' }),
      write: async () => ({ ok: true }),
      openFolder: async () => ({ ok: true, canceled: true }),
      listDir: async () => ({ ok: true, folderPath: '/tmp', entries: [] }),
      showOpenDialog: asyncOk,
    },
    app: {
      toggleTrayWindow: asyncOk,
      getRecentFiles: async () => ({ ok: true, files: [] }),
      showItemInFolder: asyncOk,
      openPath: asyncOk,
    },
    state: {
      get: async () => ({ ok: true, state: { prefs: {}, auth: { isAuthenticated: false } } }),
      save: asyncOk,
    },
    updater: {
      getStatus: async () => ({ ok: true, status: { state: 'idle', message: 'Updater mocked' } }),
      check: asyncOk,
      download: asyncOk,
      install: asyncOk,
    },
    onMenuCommand: (cb) => {
      noop(cb);
      return () => {};
    },
    onWindowAction: (cb) => {
      noop(cb);
      return () => {};
    },
    onUpdaterStatus: (cb) => {
      noop(cb);
      return () => {};
    },
  };
}
