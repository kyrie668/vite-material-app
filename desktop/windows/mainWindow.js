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
  console.log("111", 222);
  // if (isDev) {
  //   mainWindow.loadURL("http://localhost:8888/");
  // } else {
  //   const entryPath = path.resolve(__dirname, "../../dist/index.html");
  //   mainWindow.loadFile(entryPath);
  // }
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

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 600,

    webContents: {
      openDevTools: true, //不想要控制台直接把这段删除
    },
  });

  //不想要控制台直接把这下面段删除

  win.webContents.openDevTools();
}

module.exports = {
  getMainWindow,
  createMainWindow,
  mainWindowIsExist,
  createWindow
};
