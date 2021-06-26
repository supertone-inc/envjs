const { Command } = require("commander");
const pkg = require("../package.json");

const name = pkg.name.split("/")[1];

function createArgParser() {
  return new Command()
    .name(name)
    .argument("<command>", "a command to run with env variables")
    .option("-f, --file <path>", "env file path", ".env.js")
    .helpOption("-h, --help", "display help")
    .addHelpText(
      "after",
      `
Examples:
${name} node -e "'console.log(process.env.ENV_VAR)'"
${name} echo \\$ENV_VAR
`
    )
    .passThroughOptions();
}

module.exports = function parseArgs(argv, options) {
  return createArgParser().parse(argv, options);
};

module.exports.createArgParser = createArgParser;
