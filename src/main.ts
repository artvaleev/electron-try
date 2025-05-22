import { app, BrowserWindow } from "electron";
import * as path from "path";

try {
  require("electron-reloader")(module); // автоматический reload main.ts
} catch (_) {}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadURL("http://localhost:3000");
};

app.whenReady().then(createWindow);