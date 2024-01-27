const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const isDevelopment = process.env.NODE_ENV === "development";
let mainWindow = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1160,
    height: 752,
    minHeight: 632,
    minWidth: 960,
    show: false,
    frame: true,
    maximizable: true,
    resizable: true,
    title: "metarial-app",
    webPreferences: {
      nodeIntegration: true,
      preload: path.resolve(__dirname, "../utils/contextBridge.js"),
    },
    icon: path.resolve(__dirname, "../../public/logo.png"),
  });

  if (isDevelopment) {
    mainWindow.loadURL("http://localhost:5174/");
  } else {
    const entryPath = path.resolve(__dirname, "../../dist/index.html");
    mainWindow.loadFile(entryPath);
  }

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

module.exports = {
  getMainWindow,
  createMainWindow,
  mainWindowIsExist,
};
