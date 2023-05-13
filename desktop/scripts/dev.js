process.env.NODE_ENV = "development";

const Vite = require("vite");
const ChildProcess = require("child_process");
const Path = require("path");
const Chalk = require("chalk");
const Chokidar = require("chokidar");
const Electron = require("electron");
const FileSystem = require("fs");

let viteServer = null;
let electronProcess = null;
let electronProcessLocker = false;
let rendererPort = 0;

async function startRenderer() {
  viteServer = await Vite.createServer({
    configFile: Path.join(__dirname, "..", "vite.config.js"),
    mode: "development",
  });

  return viteServer.listen();
}

async function startElectron() {
  if (electronProcess) return;

  const args = [
    Path.join(__dirname, "..", "src", "main", "main.js"),
    rendererPort,
  ];

  electronProcess = ChildProcess.spawn(Electron, args);
  electronProcessLocker = false;

  electronProcess.stdout.on("data", (data) =>
    process.stdout.write(
      Chalk.blueBright(`[electron] `) + Chalk.white(data.toString())
    )
  );

  electronProcess.stderr.on("data", (data) =>
    process.stderr.write(
      Chalk.blueBright(`[electron] `) + Chalk.white(data.toString())
    )
  );

  electronProcess.on("exit", () => stop());
}

function restartElectron() {
  if (electronProcess) {
    electronProcess.removeAllListeners("exit");
    electronProcess.kill();
    electronProcess = null;
  }

  if (!electronProcessLocker) {
    electronProcessLocker = true;
    startElectron();
  }
}

function copyStaticFiles() {
  copy("static");
}

function copy(path) {
  FileSystem.cpSync(
    Path.join(__dirname, "..", "src", "main", path),
    Path.join(__dirname, "..", "build", "main", path),
    { recursive: true }
  );
}

function stop() {
  viteServer.close();
  process.exit();
}

async function start() {
  console.log(Chalk.greenBright("======================================"));
  console.log(Chalk.greenBright("Starting Electron + Vite Dev Server..."));
  console.log(Chalk.greenBright("======================================"));

  const devServer = await startRenderer();
  rendererPort = devServer.config.server.port;

  copyStaticFiles();
  startElectron();

  const path = Path.join(__dirname, "..", "src", "main");

  Chokidar.watch(path, {
    cwd: path,
  }).on("change", (path) => {
    console.log(
      Chalk.blueBright(`[electron] `) + `Change in ${path}. reloading...  🚀`
    );

    if (path.startsWith(Path.join("static", "/"))) copy(path);

    restartElectron();
  });
}

start();
