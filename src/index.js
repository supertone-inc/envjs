const { execSync } = require("child_process");
const { resolve } = require("path");

const parseArgs = require("./parseArgs");
const parseEnvFile = require("./parseEnvFile");

function main() {
  const { argv, showHelp } = parseArgs(process.argv);
  const command = argv._.join(" ");

  if (!command) {
    showHelp();
    return;
  }

  const envFilePath = resolve(argv.file);
  const env = parseEnvFile(envFilePath);

  return execSync(command, {
    env: { ...process.env, ...env },
    stdio: "inherit",
  });
}

if (require.main === module) {
  main();
}
