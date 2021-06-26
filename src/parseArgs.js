const { Command } = require("commander");
const pkg = require("../package.json");

const name = pkg.name.split("/")[1];

function createArgParser() {
  return new Command()
    .name(name)
    .argument("<command>", "command to run with env variables")
    .option("-f, --file <path>", "env file path", ".env.js")
    .option("-e, --env <key=value...>", "additional env key-value pairs")
    .helpOption("-h, --help", "display help")
    .addHelpText(
      "after",
      `
Note:
  - You must escape "$" with "\\$" for using env variables in command line.
  - If you use variadic options(e.g. -e, --env) directly before <command>,
    insert "--" between [option] and <command> to distinguish them.

Examples:
  ${name} echo \\$ENV_VAR
  ${name} -f .env.json echo \\$ENV_VAR
  ${name} -e ENV_VAR=value -- echo \\$ENV_VAR
  ${name} -f .env.json -e ENV_VAR=value -- echo \\$ENV_VAR
  ${name} -e ENV_VAR=value -f .env.json echo \\$ENV_VAR
`
    )
    .passThroughOptions();
}

module.exports = (...args) => createArgParser().parse(...args);
module.exports.createArgParser = createArgParser;
