const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const MainScreen = require("./src/main/mainScreen");
const Globals = require("./globals");
const { autoUpdater, AppUpdater } = require("electron-updater");

let curWindow;

//Basic flags
autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

function createWindow() {
  curWindow = new MainScreen();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });

  autoUpdater.checkForUpdates();
  curWindow.showMessage(`0`);
});

/*New Update Available*/
autoUpdater.on("update-available", (info) => {
  curWindow.showMessage(`1`);
  let pth = autoUpdater.downloadUpdate();
  curWindow.showMessage(pth);
});

autoUpdater.on("update-not-available", (info) => {
  curWindow.showMessage(`2`);
});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", (info) => {
  curWindow.showMessage(`3`);
  setTimeout(function() {
    autoUpdater.quitAndInstall();
  }, 1000)
});

autoUpdater.on("error", (info) => {
  curWindow.showMessage(info);
});




//Global exception handler
process.on("uncaughtException", function (err) {
  console.log(err);
});

app.on("window-all-closed", function () {
  if (process.platform != "darwin") app.quit();
});