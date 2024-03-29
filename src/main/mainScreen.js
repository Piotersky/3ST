const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const path = require("path");
const Store = require("electron-store");
const storage = new Store();

class MainScreen {
  window;

  position = {
    width: 1000,
    height: 600,
    maximized: true,
  };

  constructor() {
    this.window = new BrowserWindow({
      width: this.position.width,
      height: this.position.height,
      title: "3ST",
      show: false,
      removeMenu: true,
      acceptFirstMouse: true,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: true,
            contextIsolation: true,
        preload: path.join(__dirname, "./mainPreload.js"),
        devTools: storage.get("devTools"),
      },
    });

    this.window.once("ready-to-show", () => {
      this.window.show();

      if (this.position.maximized) {
        this.window.maximize();
      }
    });

    this.handleMessages(this.window);

    this.window.loadFile("./src/main/main.html");
  }

  showMessage(message) {
    console.log("showMessage trapped");
    this.window.webContents.send("updateMessage", message);
  }

  close() {
    this.window.close();
    ipcMain.removeAllListeners();
  }

  hide() {
    this.window.hide();
  }

  handleMessages(win) {
    ipcMain.on('devTools_on', function(s) {
      storage.set("devTools", true);
    })
    ipcMain.on('devTools_off', function() {
      storage.set("devTools", false);
    })
    ipcMain.on("get", function() {
      let language = storage.get("lang");
      win.webContents.send("lang", language)
    });
    ipcMain.on("set_en", function() {
      storage.set("lang", "en")
    })
    ipcMain.on("set_pl", function() {
      storage.set("lang", "pl")
    })
  }
}

module.exports = MainScreen;
