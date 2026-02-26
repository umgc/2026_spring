const { contextBridge, ipcRenderer } = require('electron');

function onChannel(channel, callback) {
  if (typeof callback !== 'function') {
    throw new Error('callback must be a function');
  }
  const listener = (_event, payload) => callback(payload);
  ipcRenderer.on(channel, listener);
  return () => ipcRenderer.removeListener(channel, listener);
}

const desktopApi = Object.freeze({
  appInfo: {
    platform: process.platform,
  },
  file: Object.freeze({
    open: () => ipcRenderer.invoke('file:open'),
    save: (payload) => ipcRenderer.invoke('file:save', payload),
    saveAs: (payload) => ipcRenderer.invoke('file:saveAs', payload),
    read: (filePath) => ipcRenderer.invoke('file:read', filePath),
    write: (payload) => ipcRenderer.invoke('file:write', payload),
    openFolder: () => ipcRenderer.invoke('folder:open'),
    listDir: (folderPath) => ipcRenderer.invoke('fs:listDir', folderPath),
    showOpenDialog: () => ipcRenderer.invoke('dialog:openFiles'),
  }),
  app: Object.freeze({
    toggleTrayWindow: () => ipcRenderer.invoke('app:toggleMainWindow'),
    getRecentFiles: () => ipcRenderer.invoke('app:getRecentFiles'),
    showItemInFolder: (filePath) => ipcRenderer.invoke('app:showItemInFolder', filePath),
    openPath: (targetPath) => ipcRenderer.invoke('app:openPath', targetPath),
  }),
  state: Object.freeze({
    get: () => ipcRenderer.invoke('state:get'),
    save: (state) => ipcRenderer.invoke('state:save', state),
  }),
  updater: Object.freeze({
    getStatus: () => ipcRenderer.invoke('updater:getStatus'),
    check: () => ipcRenderer.invoke('updater:check'),
    download: () => ipcRenderer.invoke('updater:download'),
    install: () => ipcRenderer.invoke('updater:install'),
  }),
  onMenuCommand: (callback) => onChannel('menu:command', callback),
  onWindowAction: (callback) => onChannel('window:action', callback),
  onUpdaterStatus: (callback) => onChannel('updater:status', callback),
});

contextBridge.exposeInMainWorld('desktop', desktopApi);
