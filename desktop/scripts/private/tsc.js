const ChildProcess = require("child_process");
const Chalk = require("chalk");

function compile(directory) {
  return new Promise((resolve, rejects) => {
    const tscProcess = ChildProcess.exec("tsc", {
      cwd: directory,
    });

    tscProcess.stdout.on("data", (data) =>
      process.stdout.write(
        Chalk.yellowBright(`[tsc]`) + Chalk.write(data.toString())
      )
    );

    tscProcess.on("exit", (exitCode) => {
      if (exitCode > 0) rejects(exitCode);
      else resolve();
    });
  });
}
