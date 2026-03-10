const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_STATE = {
  width: 1280,
  height: 840,
  x: undefined,
  y: undefined,
  isMaximized: false,
  isFullScreen: false,
};

function getStateFile(app) {
  return path.join(app.getPath('userData'), 'window-state.json');
}

function loadWindowState(app) {
  try {
    const raw = fs.readFileSync(getStateFile(app), 'utf8');
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function saveWindowState(app, win) {
  if (!win || win.isDestroyed() || win.isMinimized()) {
    return;
  }

  const bounds = win.isNormal() ? win.getBounds() : win.getNormalBounds();
  const payload = {
    ...bounds,
    isMaximized: win.isMaximized(),
    isFullScreen: win.isFullScreen(),
  };
  try {
    fs.mkdirSync(app.getPath('userData'), { recursive: true });
    fs.writeFileSync(getStateFile(app), JSON.stringify(payload, null, 2));
  } catch (error) {
    console.error('Failed to persist window state', error);
  }
}

module.exports = {
  loadWindowState,
  saveWindowState,
};
