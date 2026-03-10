/**
 * @jest-environment node
 */

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { loadWindowState, saveWindowState } = require('../windowState');

function makeTempUserData() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'edulence-windowstate-'));
}

function makeApp(userDataPath) {
  return {
    getPath: (key) => {
      if (key !== 'userData') throw new Error('unexpected path key');
      return userDataPath;
    },
  };
}

function makeWindow(bounds = { width: 800, height: 600, x: 10, y: 10 }) {
  let destroyed = false;
  return {
    isDestroyed: () => destroyed,
    destroy: () => {
      destroyed = true;
    },
    isMinimized: () => false,
    isNormal: () => true,
    getBounds: () => bounds,
    getNormalBounds: () => bounds,
    isMaximized: () => false,
    isFullScreen: () => false,
  };
}

describe('windowState', () => {
  test('loadWindowState returns defaults when no file exists', () => {
    const userData = makeTempUserData();
    const state = loadWindowState(makeApp(userData));
    expect(state.width).toBeGreaterThan(0);
    expect(state.height).toBeGreaterThan(0);
    expect(state.isMaximized).toBe(false);
  });

  test('saveWindowState writes bounds and loadWindowState restores them', () => {
    const userData = makeTempUserData();
    const app = makeApp(userData);
    const win = makeWindow({ width: 1111, height: 777, x: 22, y: 33 });

    saveWindowState(app, win);
    const loaded = loadWindowState(app);
    expect(loaded.width).toBe(1111);
    expect(loaded.height).toBe(777);
    expect(loaded.x).toBe(22);
    expect(loaded.y).toBe(33);
  });
});
