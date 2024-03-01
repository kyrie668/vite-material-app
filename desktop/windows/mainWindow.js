const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");
// const isDevelopment = import.meta.env.DEV;
// const isDev = process.env.IS_DEV === true;
let mainWindow = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1160,
    height: 752,
    minHeight: 632,
    minWidth: 960,
    show: false,
    frame: false,
    maximizable: true,
    movable: true,
    titleBarStyle: "hidden",
    resizable: true,
    title: "metarial-app",
    webPreferences: {
      contextIsolation: true,
      preload: path.resolve(__dirname, "../utils/contextBridge.js"),
      sandbox: false
    },
    icon: path.resolve(__dirname, "../../public/logo.png"),
  });
  // if (isDev) {
  //   mainWindow.loadURL("http://localhost:8888/");
  // } else {
  //   const entryPath = path.resolve(__dirname, "../../dist/index.html");
  //   mainWindow.loadFile(entryPath);
  // }
  mainWindow.setMenu(null);
  mainWindow.loadURL("http://localhost:8888/");
  mainWindow.webContents.openDevTools();
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
}
function mainWindowIsExist() {
  return mainWindow && !mainWindow.isDestroyed();
}

function getMainWindow() {
  return mainWindow;
}

function openDevTools() {
  mainWindow.webContents.openDevTools();
}

module.exports = {
  getMainWindow,
  createMainWindow,
  mainWindowIsExist,
  openDevTools,
};
