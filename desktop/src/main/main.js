const path = require("path");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const { setMenu } = require("./other/Menu");
const { saveExcel } = require("./other/saveExcel");
const {
  SetupDirectory,
  ReadFile,
  WriteFile,
  ReadFileOnPath,
} = require("./other/Utils");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1720,
    height: 880,
    minWidth: 1080,
    minHeight: 770,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon:
      process.env.NODE_ENV === "development"
        ? path.join(process.cwd(), "src/renderer/assets/logo.webp")
        : path.join(__dirname, "src/renderer/assets/logo.webp"),
  });

  if (process.env.NODE_ENV === "development")
    mainWindow.loadURL("http://localhost:3000/");
  else mainWindow.loadURL("http://192.168.0.32:3000/");

  setMenu(mainWindow);
  SetupDirectory();

  ipcMain.on("goTo", (event, url) => mainWindow.loadURL(url));

  mainWindow.once("ready-to-show", () => mainWindow.show());
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("chooseFile", async (event, args) => {
  const f = await dialog.showOpenDialog({
    properties: ["openFile"],
    ...args,
  });

  return f;
});

ipcMain.handle("showMessageBox", async (event, options) => {
  const answer = await dialog.showMessageBox(options);
  return answer;
});

ipcMain.handle("readFile", async (event, args) => {
  const data = await ReadFile(...args);
  return data;
});

ipcMain.handle("readFileOnPath", async (event, args) => {
  const data = await ReadFileOnPath(...args);
  return data;
});

ipcMain.handle("writeFile", async (event, args) => {
  await WriteFile(...args);
  return "done";
});

ipcMain.handle("showSaveDialog", async (event, options) => {
  const answer = await dialog.showSaveDialog(options);
  return answer;
});

ipcMain.handle("saveExcel", async (event, options) => {
  const answer = await saveExcel(options);
  return answer;
});
