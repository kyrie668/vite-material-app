"use strict";
const { app, globalShortcut } = require("electron");
const { createMainWindow, createWindow, getMainWindow } = require("./windows/mainWindow");
const { initTray, getTray } = require("./windows/systemTray");
app.on("ready", () => {
  createMainWindow();
  initTray();
});
app.on("certificate-error", (event, webContents, url, error, certificate, callback) => {
  event.preventDefault();
  callback(true);
});
app.on("before-quit", () => {
  console.log("app before-quit");
});
app.on("window-all-closed", function() {
  console.log("window-all-closed");
});
app.on("activate", function() {
  console.log("activate");
});
app.on("quit", function() {
  console.log("quit");
  getTray() && getTray().destroy();
});
app.on("will-quit", function() {
  console.log("will-quit");
});
app.on("will-finish-launching", function() {
  console.log("will-finish-launching");
});
app.on("window-min", function() {
  getMainWindow().minimize();
});
app.on("window-max", function() {
  if (getMainWindow().isMaximized()) {
    getMainWindow().restore();
  } else {
    getMainWindow().maximize();
  }
});
app.on("window-close", function() {
  getMainWindow().close();
});
