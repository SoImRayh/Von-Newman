import { ipcMain } from "electron";

ipcMain.on('teste', (event, arg) => {
    console.log('testando');
})
