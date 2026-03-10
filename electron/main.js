const {
  app,
  BrowserWindow,
  Menu,
  Tray,
  Notification,
  dialog,
  ipcMain,
  shell,
  nativeImage,
  screen,
} = require('electron');
const fs = require('node:fs/promises');
const path = require('node:path');
const { loadWindowState, saveWindowState } = require('./windowState');
const { asString, asOptionalString, createIpcGuard } = require('./ipcUtils');

const isMac = process.platform === 'darwin';
const isDev = Boolean(process.env.VITE_DEV_SERVER_URL);
const recentFiles = new Set();

let mainWindow = null;
let tray = null;
let stateSaveTimer = null;
let autoUpdater = null;
let ipcRegistered = false;
let updaterStatus = {
  supported: false,
  configured: false,
  state: 'idle',
  message: 'Auto-updates unavailable in development build',
  version: app.getVersion(),
  downloadedVersion: null,
};
let desktopState = {
  prefs: {
    themeMode: 'light',
    leftHanded: true,
    autoRefreshRecent: true,
    largeText: false,
    highContrast: false,
    confirmTrayMinimize: true,
  },
  auth: {
    isAuthenticated: false,
  },
};

const singleInstanceLock = app.requestSingleInstanceLock();
if (!singleInstanceLock) {
  app.quit();
}

function createTrayIcon() {
  const base64 =
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAVUlEQVR4AWNQ1v3/PwMDA8MABYwMjIyM/4eHh39GRkYGLBhoB5GJgYGB4f///xkZGRkYGRiYGLAAiQxkQYw0Q2QwRZg2gGg0MTEwMPz///8fGBgYgAEAM0wT4FfA9gEAAAAASUVORK5CYII=';
  const image = nativeImage.createFromDataURL(`data:image/png;base64,${base64}`);
  return image.resize({ width: 16, height: 16 });
}

function sendToRenderer(channel, payload) {
  if (mainWindow && !mainWindow.isDestroyed() && mainWindow.webContents) {
    mainWindow.webContents.send(channel, payload);
  }
}

function logError(scope, error) {
  const message = error?.stack || error?.message || String(error);
  console.error(`[${scope}] ${message}`);
}

function isFromMainWindow(event) {
  return Boolean(
    mainWindow &&
      !mainWindow.isDestroyed() &&
      event?.sender &&
      event.sender.id === mainWindow.webContents.id
  );
}

const withIpcGuard = createIpcGuard(isFromMainWindow);

function setUpdaterStatus(patch) {
  updaterStatus = { ...updaterStatus, ...patch };
  sendToRenderer('updater:status', updaterStatus);
  refreshTrayMenu();

  // Platform-specific: on Windows, surface key updater milestones as native notifications.
  if (process.platform === 'win32') {
    if (updaterStatus.state === 'downloaded') {
      try {
        new Notification({
          title: 'EduLense Desktop',
          body: 'Update downloaded. Use Help → Install Update and Restart.',
        }).show();
      } catch {
        // Notifications may be unavailable depending on OS policy.
      }
    }
    if (updaterStatus.state === 'available') {
      try {
        new Notification({
          title: 'EduLense Desktop',
          body: 'An update is available. Use Help → Download Available Update.',
        }).show();
      } catch {
        // ignore
      }
    }
  }
}

function getDesktopStateFile() {
  return path.join(app.getPath('userData'), 'desktop-state.json');
}

function normalizeDesktopState(value) {
  const next = value && typeof value === 'object' ? value : {};
  return {
    prefs: {
      ...desktopState.prefs,
      ...(next.prefs && typeof next.prefs === 'object' ? next.prefs : {}),
    },
    auth: {
      ...desktopState.auth,
      ...(next.auth && typeof next.auth === 'object' ? next.auth : {}),
      isAuthenticated: Boolean(next?.auth?.isAuthenticated ?? desktopState.auth.isAuthenticated),
    },
  };
}

async function loadDesktopState() {
  try {
    const raw = await fs.readFile(getDesktopStateFile(), 'utf8');
    desktopState = normalizeDesktopState(JSON.parse(raw));
  } catch {
    desktopState = normalizeDesktopState({});
  }
}

async function persistDesktopState() {
  try {
    await fs.mkdir(app.getPath('userData'), { recursive: true });
    await fs.writeFile(getDesktopStateFile(), JSON.stringify(desktopState, null, 2), 'utf8');
    return { ok: true, state: desktopState };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

function getVisibleWindowState(rawState) {
  const displays = screen.getAllDisplays();
  const state = { ...rawState };
  const hasCoords = Number.isFinite(state.x) && Number.isFinite(state.y);

  if (!hasCoords) {
    return state;
  }

  const visible = displays.some((display) => {
    const { x, y, width, height } = display.workArea;
    return (
      state.x < x + width - 80 &&
      state.x + Math.max(80, state.width || 0) > x &&
      state.y < y + height - 80 &&
      state.y + Math.max(80, state.height || 0) > y
    );
  });

  if (visible) return state;

  return {
    ...state,
    x: undefined,
    y: undefined,
  };
}

function focusAndShowMainWindow() {
  if (!mainWindow || mainWindow.isDestroyed()) {
    createMainWindow();
    return;
  }
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.show();
  mainWindow.focus();
}

function queueWindowStateSave() {
  clearTimeout(stateSaveTimer);
  stateSaveTimer = setTimeout(() => saveWindowState(app, mainWindow), 250);
}

function buildMenu() {
  const template = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideOthers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' },
            ],
          },
        ]
      : []),
    {
      label: 'File',
      submenu: [
        { label: 'New Note', accelerator: 'CmdOrCtrl+N', click: () => sendToRenderer('menu:command', 'file:new') },
        { label: 'Open File...', accelerator: 'CmdOrCtrl+O', click: () => sendToRenderer('menu:command', 'file:open') },
        { label: 'Open Folder...', accelerator: 'CmdOrCtrl+Shift+O', click: () => sendToRenderer('menu:command', 'file:openFolder') },
        { type: 'separator' },
        { label: 'Save', accelerator: 'CmdOrCtrl+S', click: () => sendToRenderer('menu:command', 'file:save') },
        { label: 'Save As...', accelerator: 'CmdOrCtrl+Shift+S', click: () => sendToRenderer('menu:command', 'file:saveAs') },
        { type: 'separator' },
        { label: 'Show Current File in Folder', accelerator: 'CmdOrCtrl+Shift+R', click: () => sendToRenderer('menu:command', 'file:reveal') },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        { label: 'Find', accelerator: 'CmdOrCtrl+F', click: () => sendToRenderer('menu:command', 'edit:find') },
      ],
    },
    {
      label: 'View',
      submenu: [
        { label: 'Dashboard', accelerator: 'CmdOrCtrl+1', click: () => sendToRenderer('menu:command', 'nav:home') },
        { label: 'Courses', accelerator: 'CmdOrCtrl+2', click: () => sendToRenderer('menu:command', 'nav:files') },
        { label: 'Notes', accelerator: 'CmdOrCtrl+3', click: () => sendToRenderer('menu:command', 'nav:notes') },
        { label: 'Settings', accelerator: 'CmdOrCtrl+,', click: () => sendToRenderer('menu:command', 'nav:settings') },
        { type: 'separator' },
        { label: 'Back', accelerator: 'Alt+Left', click: () => sendToRenderer('menu:command', 'nav:back') },
        { label: 'Forward', accelerator: 'Alt+Right', click: () => sendToRenderer('menu:command', 'nav:forward') },
        { type: 'separator' },
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        { label: 'Keyboard Shortcuts', accelerator: 'CmdOrCtrl+/', click: () => sendToRenderer('menu:command', 'help:shortcuts') },
        { type: 'separator' },
        { label: 'Check for Updates', click: () => checkForUpdates(false) },
        { label: 'Download Available Update', click: () => downloadUpdate() },
        { label: 'Install Update and Restart', click: () => quitAndInstallUpdate() },
        { type: 'separator' },
        { label: 'Project Repository', click: () => shell.openExternal('https://github.com/umgc/2026_spring.git') },
        {
          label: 'About EduLense Desktop',
          click: () => {
            dialog.showMessageBox({
              type: 'info',
              title: 'About EduLense Desktop',
              message: `EduLense Desktop v${app.getVersion()}`,
              detail: 'Electron + React desktop app with native menus, tray, file system integration, window persistence, and auto-update wiring.',
            });
          },
        },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function createMainWindow() {
  const state = getVisibleWindowState(loadWindowState(app));

  mainWindow = new BrowserWindow({
    width: Math.max(980, state.width || 1280),
    height: Math.max(680, state.height || 840),
    x: state.x,
    y: state.y,
    minWidth: 980,
    minHeight: 680,
    title: 'EduLense Desktop',
    autoHideMenuBar: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
    },
  });

  mainWindow.on('resize', queueWindowStateSave);
  mainWindow.on('move', queueWindowStateSave);
  mainWindow.on('maximize', queueWindowStateSave);
  mainWindow.on('unmaximize', queueWindowStateSave);
  mainWindow.on('enter-full-screen', queueWindowStateSave);
  mainWindow.on('leave-full-screen', queueWindowStateSave);
  mainWindow.on('close', () => saveWindowState(app, mainWindow));
  mainWindow.on('ready-to-show', () => {
    if (state.isMaximized) mainWindow.maximize();
    if (state.isFullScreen) mainWindow.setFullScreen(true);
    mainWindow.show();
    sendToRenderer('updater:status', updaterStatus);
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('minimize', () => sendToRenderer('window:action', 'minimize'));

  mainWindow.on('close', async (event) => {
    if (app.isQuitting) return;
    event.preventDefault();
    if (desktopState.prefs.confirmTrayMinimize) {
      const choice = dialog.showMessageBoxSync(mainWindow, {
        type: 'question',
        buttons: ['Hide to Tray', 'Quit App', 'Cancel'],
        defaultId: 0,
        cancelId: 2,
        title: 'Close EduLense Desktop',
        message: 'What would you like to do?',
        detail: 'EduLense Desktop can continue running in the system tray.',
      });
      if (choice === 2) {
        return;
      }
      if (choice === 1) {
        app.isQuitting = true;
        setImmediate(() => app.quit());
        return;
      }
    }
    mainWindow.hide();
    sendToRenderer('window:action', 'hidden-to-tray');
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  if (isDev) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), 'dist', 'index.html'));
  }

  return mainWindow;
}

function toggleMainWindow() {
  if (!mainWindow || mainWindow.isDestroyed()) {
    createMainWindow();
    return true;
  }
  if (mainWindow.isVisible()) {
    mainWindow.hide();
    return false;
  }
  focusAndShowMainWindow();
  return true;
}

function createTray() {
  if (tray) return tray;
  tray = new Tray(createTrayIcon());
  tray.setToolTip('EduLense Desktop');
  tray.on('click', () => toggleMainWindow());
  tray.on('double-click', () => focusAndShowMainWindow());
  refreshTrayMenu();
  return tray;
}

function refreshTrayMenu() {
  if (!tray) return;

  const recentItems = [...recentFiles]
    .reverse()
    .slice(0, 5)
    .map((filePath) => ({
      label: path.basename(filePath),
      sublabel: filePath,
      click: () => sendToRenderer('menu:command', { type: 'openRecent', filePath }),
    }));

  tray.setToolTip(`EduLense Desktop${updaterStatus.state === 'downloaded' ? ' (Update Ready)' : ''}`);
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: 'Show / Hide', click: () => toggleMainWindow() },
      { label: 'Check for Updates', click: () => checkForUpdates(false) },
      ...(updaterStatus.state === 'downloaded' ? [{ label: 'Install Update and Restart', click: () => quitAndInstallUpdate() }] : []),
      { type: 'separator' },
      {
        label: 'Open Recent Files',
        submenu: recentItems.length
          ? [
              ...recentItems,
              { type: 'separator' },
              { label: 'Refresh in App', click: () => sendToRenderer('menu:command', 'app:refreshRecentFiles') },
            ]
          : [{ label: 'No recent files', enabled: false }],
      },
      { type: 'separator' },
      {
        label: 'Quit',
        click: () => {
          app.isQuitting = true;
          app.quit();
        },
      },
    ])
  );
}

function addRecentFile(filePath) {
  if (!filePath) return;
  recentFiles.delete(filePath);
  recentFiles.add(filePath);
  while (recentFiles.size > 10) {
    const first = recentFiles.values().next().value;
    recentFiles.delete(first);
  }
  if (typeof app.addRecentDocument === 'function') {
    app.addRecentDocument(filePath);
  }
  refreshTrayMenu();
}

async function openFileDialog() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Text', extensions: ['txt', 'md', 'json'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  });

  if (canceled || !filePaths[0]) return { canceled: true };
  const filePath = filePaths[0];
  const content = await fs.readFile(filePath, 'utf8');
  addRecentFile(filePath);
  return { canceled: false, filePath, content };
}

async function openFolderDialog() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  if (canceled || !filePaths[0]) return { canceled: true };
  const folderPath = filePaths[0];
  const entries = await fs.readdir(folderPath, { withFileTypes: true });
  return {
    canceled: false,
    folderPath,
    entries: entries.map((entry) => ({
      name: entry.name,
      path: path.join(folderPath, entry.name),
      isDirectory: entry.isDirectory(),
      isFile: entry.isFile(),
    })),
  };
}

async function saveFileToPath(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content ?? '', 'utf8');
  addRecentFile(filePath);
  return { canceled: false, filePath };
}

function setupAutoUpdater() {
  if (isDev) {
    setUpdaterStatus({ supported: false, configured: false, state: 'dev', message: 'Auto-updates disabled in development' });
    return;
  }

  try {
    ({ autoUpdater } = require('electron-updater'));
  } catch {
    setUpdaterStatus({ supported: false, configured: false, state: 'missing', message: 'electron-updater dependency not installed' });
    return;
  }

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;

  setUpdaterStatus({ supported: true, configured: true, state: 'idle', message: 'Updater ready' });

  autoUpdater.on('checking-for-update', () => setUpdaterStatus({ state: 'checking', message: 'Checking for updates...' }));
  autoUpdater.on('update-available', (info) =>
    setUpdaterStatus({ state: 'available', message: `Update ${info.version} available`, availableVersion: info.version, downloadedVersion: null })
  );
  autoUpdater.on('update-not-available', () => setUpdaterStatus({ state: 'idle', message: 'No updates available', availableVersion: null }));
  autoUpdater.on('download-progress', (progress) =>
    setUpdaterStatus({ state: 'downloading', message: `Downloading update... ${Math.round(progress.percent || 0)}%`, downloadProgress: progress.percent || 0 })
  );
  autoUpdater.on('update-downloaded', (info) =>
    setUpdaterStatus({ state: 'downloaded', message: `Update ${info.version} downloaded. Restart to install.`, downloadedVersion: info.version })
  );
  autoUpdater.on('error', (error) => setUpdaterStatus({ state: 'error', message: error?.message || 'Updater error' }));
}

async function checkForUpdates(silent = true) {
  if (!autoUpdater) {
    if (!silent) {
      dialog.showMessageBox({ type: 'info', message: 'Auto-updates are not available in this build.' });
    }
    return { ok: false, status: updaterStatus };
  }

  try {
    const result = await autoUpdater.checkForUpdates();
    return { ok: true, status: updaterStatus, result: Boolean(result) };
  } catch (error) {
    setUpdaterStatus({ state: 'error', message: error.message });
    if (!silent) {
      dialog.showErrorBox('Update Check Failed', error.message);
    }
    return { ok: false, error: error.message, status: updaterStatus };
  }
}

async function downloadUpdate() {
  if (!autoUpdater) return { ok: false, status: updaterStatus };
  try {
    await autoUpdater.downloadUpdate();
    return { ok: true, status: updaterStatus };
  } catch (error) {
    setUpdaterStatus({ state: 'error', message: error.message });
    return { ok: false, error: error.message, status: updaterStatus };
  }
}

function quitAndInstallUpdate() {
  if (!autoUpdater || updaterStatus.state !== 'downloaded') {
    return { ok: false, status: updaterStatus };
  }
  app.isQuitting = true;
  setImmediate(() => autoUpdater.quitAndInstall(false, true));
  return { ok: true };
}

function registerIpc() {
  // Guard against duplicate registrations in dev/reload scenarios.
  if (ipcRegistered) {
    [
      'file:open',
      'folder:open',
      'fs:listDir',
      'file:read',
      'file:write',
      'file:save',
      'file:saveAs',
      'dialog:openFiles',
      'app:toggleMainWindow',
      'app:getRecentFiles',
      'app:showItemInFolder',
      'app:openPath',
      'state:get',
      'state:save',
      'updater:getStatus',
      'updater:check',
      'updater:download',
      'updater:install',
    ].forEach((channel) => ipcMain.removeHandler(channel));
  }
  ipcRegistered = true;

  ipcMain.handle('file:open', withIpcGuard(async () => openFileDialog()));

  ipcMain.handle('folder:open', withIpcGuard(async () => openFolderDialog()));

  ipcMain.handle(
    'fs:listDir',
    withIpcGuard(async (_event, folderPath) => {
      const safeFolderPath = asString(folderPath, 'folderPath');
      const entries = await fs.readdir(safeFolderPath, { withFileTypes: true });
      return {
        ok: true,
        folderPath: safeFolderPath,
        entries: entries.map((entry) => ({
          name: entry.name,
          path: path.join(safeFolderPath, entry.name),
          isDirectory: entry.isDirectory(),
          isFile: entry.isFile(),
        })),
      };
    })
  );

  ipcMain.handle(
    'file:read',
    withIpcGuard(async (_event, filePath) => {
      const safeFilePath = asString(filePath, 'filePath');
      const content = await fs.readFile(safeFilePath, 'utf8');
      addRecentFile(safeFilePath);
      return { ok: true, filePath: safeFilePath, content };
    })
  );

  ipcMain.handle(
    'file:write',
    withIpcGuard(async (_event, payload) => {
      const filePath = asString(payload?.filePath, 'filePath');
      const content = asOptionalString(payload?.content, 'content');
      return { ok: true, ...(await saveFileToPath(filePath, content)) };
    })
  );

  ipcMain.handle(
    'file:save',
    withIpcGuard(async (_event, payload) => {
      const filePath = payload?.filePath;
      const content = asOptionalString(payload?.content, 'content');
      if (typeof filePath === 'string' && filePath.length > 0) {
        return { ok: true, ...(await saveFileToPath(filePath, content)) };
      }
      const result = await dialog.showSaveDialog({
        defaultPath: 'untitled-note.md',
        filters: [
          { name: 'Markdown', extensions: ['md'] },
          { name: 'Text', extensions: ['txt'] },
          { name: 'All Files', extensions: ['*'] },
        ],
      });
      if (result.canceled || !result.filePath) return { ok: true, canceled: true };
      return { ok: true, ...(await saveFileToPath(result.filePath, content)) };
    })
  );

  ipcMain.handle(
    'file:saveAs',
    withIpcGuard(async (_event, payload) => {
      const content = asOptionalString(payload?.content, 'content');
      const result = await dialog.showSaveDialog({ defaultPath: 'untitled-note.md' });
      if (result.canceled || !result.filePath) return { ok: true, canceled: true };
      return { ok: true, ...(await saveFileToPath(result.filePath, content)) };
    })
  );

  ipcMain.handle(
    'dialog:openFiles',
    withIpcGuard(async () => {
      const result = await dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] });
      return { ok: true, ...result };
    })
  );

  ipcMain.handle('app:toggleMainWindow', withIpcGuard(async () => ({ visible: toggleMainWindow() })));
  ipcMain.handle('app:getRecentFiles', withIpcGuard(async () => ({ ok: true, files: [...recentFiles].reverse() })));
  ipcMain.handle(
    'app:showItemInFolder',
    withIpcGuard(async (_event, filePath) => {
      const safeFilePath = asString(filePath, 'filePath');
      shell.showItemInFolder(safeFilePath);
      return { ok: true };
    })
  );
  ipcMain.handle(
    'app:openPath',
    withIpcGuard(async (_event, targetPath) => ({ ok: true, result: await shell.openPath(asString(targetPath, 'targetPath')) }))
  );
  ipcMain.handle('state:get', withIpcGuard(async () => ({ ok: true, state: desktopState })));
  ipcMain.handle(
    'state:save',
    withIpcGuard(async (_event, incomingState) => {
      desktopState = normalizeDesktopState(incomingState);
      return persistDesktopState();
    })
  );

  ipcMain.handle('updater:getStatus', withIpcGuard(async () => ({ ok: true, status: updaterStatus })));
  ipcMain.handle('updater:check', withIpcGuard(async () => checkForUpdates(false)));
  ipcMain.handle('updater:download', withIpcGuard(async () => downloadUpdate()));
  ipcMain.handle('updater:install', withIpcGuard(async () => quitAndInstallUpdate()));
}

app.on('second-instance', (_event, _argv) => {
  focusAndShowMainWindow();
});

app.whenReady().then(() => {
  return loadDesktopState();
}).then(() => {
  buildMenu();
  registerIpc();
  setupAutoUpdater();
  createMainWindow();
  createTray();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    } else {
      focusAndShowMainWindow();
    }
  });
});

app.on('before-quit', () => {
  app.isQuitting = true;
  clearTimeout(stateSaveTimer);
  if (tray && !tray.isDestroyed?.()) {
    tray.destroy();
  }
});

app.on('window-all-closed', () => {
  if (isMac) {
    return;
  }
  // Keep running for tray integration on Windows/Linux.
});

process.on('uncaughtException', (error) => {
  logError('uncaughtException', error);
  dialog.showErrorBox('Unexpected Error', error?.message || 'Unknown error');
});

process.on('unhandledRejection', (reason) => {
  logError('unhandledRejection', reason);
});
