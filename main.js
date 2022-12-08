// const { app, BrowserWindow, ipcMain } = require("electron");
// const { path } = require("path");

// // Keep a global reference of the window object, if you don't, the window will
// // be closed automatically when the JavaScript object is garbage collected.
// let win;

// function createWindow() {
//   win = new BrowserWindow({
//     width: 900,
//     height: 900,
//     title: "Wizualizacja trójkąta",
//     webPreferences: {
//       nodeIntegration: true, // is default value after Electron v5
//       contextIsolation: false, // protect against prototype pollution
//       enableRemoteModule: false, // turn off remote
//       devTools: true,
//     },
//   });

//   // Load app
//   win.loadFile(path.join(__dirname, "preload.html"));
//   // rest of code..
// }

// app.on("ready", createWindow);

// ipcMain.on("mainFile", () => {
//   win.loadFile(path.join(__dirname, "index.html"));
// });

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

///////////////////////////////////////////////////////////////////

// const {app, BrowserWindow} = require('electron')
// const path = require('path')
// const url = require('url')

// let window = null


// // Wait until the app is ready
// app.once('ready', () => {
//   // Create a new window
//   window = new BrowserWindow({
//     // Set the initial width to 800px
//     width: 800,
//     // Set the initial height to 600px
//     height: 600,
//     // Set the default background color of the window to match the CSS
//     // background color of the page, this prevents any white flickering

//     // Don't show the window until it's ready, this prevents any white flickering
//     show: false
//   })

//   // Load a URL in the window to the local index.html path
//   window.loadURL(url.format({
//     pathname: path.join(__dirname, './index.html'),
//     protocol: 'file:',
//     slashes: true
//   }))

//   // Show window when page is ready
//   window.once('ready-to-show', () => {
//     window.show()
//   })
// })

const { app, BrowserWindow, ipcMain } = require('electron');

let updateWin;

const createWindow = () => {
  updateWin = new BrowserWindow({
    width: 10000,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    frame: false,
    resizable: false,
  });

  updateWin.loadFile('src/update.html');
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('openIndex', (event) => {
  const createWindow = () => {
    const indexWin = new BrowserWindow({
      width: 1000,
      height: 900,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
      },
      frame: true,
      resizable: true,
    });
  
    indexWin.loadFile('src/index.html');
  };
  createWindow()
  updateWin.destroy()
});