const Path = require("path");
const Chalk = require("chalk");
const FileSystem = require("fs");
const Vite = require("vite");

function buildRenderer() {
  return Vite.build({
    configFile: Path.join(__dirname, "..", "vite.config.js"),
    base: "./",
    mode: "production",
  });
}

function buildMain() {
  return "ok";
}

FileSystem.rmSync(Path.join(__dirname, "..", "build"), {
  recursive: true,
  force: true,
});

console.log(Chalk.blueBright("Transpiling renderer & main..."));

Promise.allSettled(
  [buildRenderer(), buildMain()].then(() => {
    console.log(
      Chalk.greenBright(
        "Renderer & main successfully transpiled (ready to be build with electron-builder)"
      )
    );
  })
);
