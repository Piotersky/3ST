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
        preload: path.join(__dirname, "./src/main/mainPreload.js"),
      },
    });

    this.window.once("ready-to-show", () => {
      this.window.show();

      if (this.position.maximized) {
        this.window.maximize();
      }
    });

    this.handleMessages(this.window);

    this.window.loadFile("./main.html");
  }

  showMessage(message) {
    console.log("showMessage trapped");
    console.log(message);
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
    ipcMain.on("get", function() {
      console.log("get")
      let language = storage.get("lang");
      // if (language) {
      // } else {
      //   storage.set("lang", "en");
      //   language = "en";
      // }
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
