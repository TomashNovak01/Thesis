window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };
  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

const { contextBridge, ipcRenderer } = require("electron");

const WINDOW_API = {
  goTo: (url) => ipcRenderer.send("goTo", url),
  readFile: (...args) => ipcRenderer.invoke("readFile", args),
  readFileOnPath: (...args) => ipcRenderer.invoke("readFileOnPath", args),
  writeFile: (...args) => ipcRenderer.invoke("writeFile", args),
  chooseFile: (args) => ipcRenderer.invoke("chooseFile", args),
  showMessageBox: (options) => ipcRenderer.invoke("showMessageBox", options),
  showSaveDialog: (options) => ipcRenderer.invoke("showSaveDialog", options),
  saveExcel: (options) => ipcRenderer.invoke("saveExcel", options),
  triggerSelectFileDialog: (args) =>
    ipcRenderer.on("triggerSelectFileDialog", args),
};

contextBridge.exposeInMainWorld("electronAPI", WINDOW_API);
