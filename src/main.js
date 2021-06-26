const { execSync } = require("child_process");
const { resolve } = require("path");

const parseArgs = require("./parseArgs");
const parseEnvFile = require("./parseEnvFile");
const replaceEnvVars = require("./replaceEnvVars");

function main() {
  if (process.argv.length === 2) {
    parseArgs.parser.help();
    return;
  }

  const program = parseArgs();

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
