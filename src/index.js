const { execSync } = require("child_process");
const { resolve } = require("path");

const parseArgs = require("./parseArgs");
const parseEnvFile = require("./parseEnvFile");

function main() {
  const program = parseArgs();
  const command = program.args.join(" ");

  if (!command) {
    program.help();
    return;
  }

  const envFilePath = resolve(program.opts().file);
  const env = parseEnvFile(envFilePath);

  return execSync(command, {
    env: { ...process.env, ...env },
    stdio: "inherit",
  });
}

if (require.main === module) {
  main();
}
