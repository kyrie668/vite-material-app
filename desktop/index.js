const { app, globalShortcut, ipcMain } = require("electron");
const { createMainWindow, openDevTools, getMainWindow } = require("./windows/mainWindow");
const { initTray, getTray } = require("./windows/systemTray");

app.on("ready", () => {
  createMainWindow();
  initTray();
  globalShortcut.register("CommandOrControl+Shift+i", function () {
    openDevTools();
  });
});
app.on("certificate-error", (event, webContents, url, error, certificate, callback) => {
  event.preventDefault();
  callback(true);
});
app.on("before-quit", () => {
  console.log("app before-quit");
});
app.on("window-all-closed", function () {
  // 解除注册的全局快捷键
  globalShortcut.unregisterAll();

  console.log("window-all-closed");
});
app.on("activate", function () {
  console.log("activate");
});
app.on("quit", function () {
  console.log("quit");
  getTray() && getTray().destroy();
});
app.on("will-quit", function () {
  console.log("will-quit");
});
app.on("will-finish-launching", function () {
  console.log("will-finish-launching");
});
//接收最小化命令
app.on("window-min", function () {
  console.log("min");
  getMainWindow().minimize();
});
//接收最大化命令
app.on("window-max", function () {
  if (getMainWindow().isMaximized()) {
    getMainWindow().restore();
  } else {
    getMainWindow().maximize();
  }
});
//接收关闭命令
app.on("window-close", function () {
  getMainWindow().close();
});
ipcMain.on("window-min", () => {
  getMainWindow().minimize();
});
ipcMain.on("window-max", () => {
  if (getMainWindow().isMaximized()) {
    getMainWindow().restore();
  } else {
    getMainWindow().maximize();
  }
});
ipcMain.on("window-close", () => {
  getMainWindow().close();
  getTray() && getTray().destroy();
});
