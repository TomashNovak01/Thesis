const { app, dialog } = require("electron");
const fsPromise = require("fs/promises");
const path = require("path");
const fs = require("fs");

async function SetupDirectory() {
  try {
    const WORK_DIR = app.getPath("userData");
    const FIELD_ACT_DIR = path.join(WORK_DIR, "FieldAct");
    const FIELD_ACT_FILE = path.join(FIELD_ACT_DIR, "FieldActList.json");

    await fsPromise.mkdir(FIELD_ACT_DIR, { recursive: true });
    const dirIn = await fsPromise.readdir(FIELD_ACT_DIR);

    if (!dirIn.includes("FieldActList.json"))
      await fsPromise.writeFile(FIELD_ACT_FILE, JSON.stringify([]));
  } catch (error) {
    console.log(error);
  }
}

async function WriteFile({
  FILE_NAME,
  data,
  MODULE_DIR_NAME = "FiledAct",
  PATH,
}) {
  try {
    let FILE_PATH;

    if (!FILE_NAME && PATH) FILE_PATH = PATH;
    else if (FILE_NAME) {
      const WORK_DIR = app.getPath("userData");
      const MODULE_DIR = path.join(WORK_DIR, MODULE_DIR_NAME);

      FILE_PATH = path.join(MODULE_DIR, FILE_NAME);
    }

    const payload =
      typeof data === "string" ? data : JSON.stringify(data, null, 2);
    await fsPromise.writeFile(FILE_PATH, payload);
  } catch (error) {
    console.log(error);
  }
}

async function ReadFile({
  FILE_NAME = false,
  MODULE_DIR_NAME = "FieldAct",
  PATH = false,
}) {
  try {
    let FILE_PATH;

    if (!FILE_NAME && PATH) FILE_PATH = PATH;
    else if (FILE_NAME) {
      const WORK_DIR = app.getPath("userData");
      const MODULE_DIR = path.join(WORK_DIR, MODULE_DIR_NAME);

      FILE_PATH = path.join(MODULE_DIR, FILE_NAME);
    } else throw new Error("Не достаточно данных для получения файла");

    const data = await fsPromise.readFile(FILE_PATH);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function ReadFileOnPath(path) {
  try {
    const data = await fsPromise.readFile(path);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function saveExcel({ title, name, workbook }) {
  try {
    const answer = await dialog.showSaveDialog({ title, defaultPath: name });
    const path = answer.filePath;

    await writeExcelFile(path, workbook.xlsx);
    return "ok";
  } catch (error) {
    console.log(error);
  }
}

function writeExcelFile(path, wb) {
  const stream = fs.createWriteStream(path);

  return new Promise((resolve, reject) => {
    stream.on("finish", () => {
      resolve();
    });
    stream.on("error", (error) => {
      reject(error);
    });

    wb.write(stream, options).then(() => {
      stream.end();
    });
  });
}

module.exports = {
  SetupDirectory,
  WriteFile,
  ReadFile,
  ReadFileOnPath,
  saveExcel,
};
