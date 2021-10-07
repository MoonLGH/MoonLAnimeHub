const {
  app,
  BrowserWindow
} = require('electron');
const path = require('path');
const electron = require("electron")
const ipc = electron.ipcMain
const fs = require("fs")

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const {
  Notification
} = require('electron')

ipc.on("restart", function () {
  app.relaunch()
  app.exit()
})
let mainWindow;
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1250,
    height: 850,
    show: false,
    // resizable: false,
    // fullscreen: fal  se,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: __dirname + "./favicon.ico"
  });
  mainWindow.maximize()
  mainWindow.loadFile(path.join(__dirname, './main/index.html'));
  mainWindow.setMenuBarVisibility(false)
  mainWindow.show()

  if (Notification.isSupported() == true) {
    const notification = new Notification({
      title: 'App Started!',
      body: 'You Can Open The App Now',
      icon: path.join(__dirname, './favicon.ico')
    })

    notification.show()

    notification.on("click", () => {
      mainWindow.focus()
    })
  }
  mainWindow.on("close", (event) => {
    app.quit()
  })
};
const RPC = require('discord-rpc')
const rpc = new RPC.Client({
  transport: "ipc"
});

let time = Date.now();
let first = true
ipc.on("rpctrue", () => {

  if(first === true){
    rpc.login({
      clientId: "824681676546244618"
    })
  }

  rpc.on('ready', function () {
    rpc.setActivity({
      details: "Main Menu",
      state: "On Main Menu",
      largeImageKey: "logo",
      startTimestamp: time
    });

    // MainMenu
    ipc.on("mainmenu", function () {
      rpc.setActivity({
        details: "Main Menu",
        state: "On Main Menu",
        largeImageKey: "logo",
        startTimestamp: time
      });
    })

    //OD
    ipc.on("odmenu", function () {
      rpc.setActivity({
        details: "Otakudesu",
        state: "On Main Menu",
        largeImageKey: "logo",
        smallImageKey: "od",
        startTimestamp: time
      });
    })

    ipc.on("odanime", function (event, obj) {
      rpc.setActivity({
        details: "Otakudesu",
        state: `Viewing ${obj.titlebatch}`,
        largeImageKey: "od",
        smallImageKey: "logo",
        startTimestamp: time
      });
    })

    ipc.on("odanimeeps", function (event, obj) {
      rpc.setActivity({
        details: "Otakudesu",
        state: `Watching ${obj.title}`,
        largeImageKey: "od",
        smallImageKey: "logo",
        startTimestamp: time
      });
    })


    //KC
    ipc.on("kcmenu", function () {
      rpc.setActivity({
        details: "Komikcast",
        state: "On Main Menu",
        largeImageKey: "logo",
        smallImageKey: "kc",
        startTimestamp: time
      });
    })

    ipc.on("kckomik", function (event, obj) {
      rpc.setActivity({
        details: "Komikcast",
        state: `Viewing ${obj.title}`,
        largeImageKey: "kc",
        smallImageKey: "logo",
        startTimestamp: time
      });
    })
    ipc.on("kcchapter", function (event, obj) {
      rpc.setActivity({
        details: "Komikcast",
        state: `Reading ${obj.chapters}`,
        largeImageKey: "kc",
        smallImageKey: "logo",
        startTimestamp: time
      });
    })
  })

  frist = false
})

app.setAppUserModelId("MoonL Anime Hub")
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipc.on("send", async (event, obj) => {

  if (Notification.isSupported() == true) {
    const copied = {
      title: `Copied To The Clipboard`,
      body: `${obj.url}`,
      icon: path.join(__dirname, './favicon.ico')
    }

    new Notification(copied).show()
  }
})

let secwinexist
  ipc.on("openwin", function () {
    if(secwinexist === true){
      return secwin.focus()
    }
    secwin = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
      },
      icon: __dirname + "./favicon.ico"
    })
    secwin.loadFile(path.join(__dirname, './main/links.html'));
    secwin.setMenuBarVisibility(false)
    secwinexist = true

    secwin.on("close",()=>{
      secwinexist = false
    })
  })