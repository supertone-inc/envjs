const { execSync } = require("child_process");
const { resolve } = require("path");

const { createArgParser } = require("./parseArgs");
const parseEnvFile = require("./parseEnvFile");
const replaceEnvVars = require("./replaceEnvVars");

function main() {
  const argParser = createArgParser();

  if (process.argv.length === 2) {
    argParser.help();
    return;
  }

  const program = argParser.parse();

  const options = program.opts();
  const envFilePath = resolve(options.file);
  const env = { ...process.env, ...parseEnvFile(envFilePath), ...options.env };
  const command = replaceEnvVars(program.args.join(" "), env);

  execSync(command, { env, stdio: "inherit" });
}

if (require.main === module) {
  main();
} else {
  module.exports = main;
}
