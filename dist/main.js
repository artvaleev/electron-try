"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
try {
    require("electron-reloader")(module); // автоматический reload main.ts
}
catch (_) { }
const createWindow = () => {
    const win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });
    win.loadURL("http://localhost:3000");
};
electron_1.app.whenReady().then(createWindow);
