const { execSync } = require("child_process");
const { resolve } = require("path");

const parseArgs = require("./parseArgs");
const parseEnvFile = require("./parseEnvFile");
const replaceEnvVars = require("./replaceEnvVars");

function main() {
  const program = parseArgs();

  if (!program.args.length) {
    program.help();
    return;
  }

  const envFilePath = resolve(program.opts().file);
  const env = { ...process.env, ...parseEnvFile(envFilePath) };
  const command = replaceEnvVars(program.args.join(" "), env);

  execSync(command, { env, stdio: "inherit" });
}

if (require.main === module) {
  main();
} else {
  module.exports = main;
}