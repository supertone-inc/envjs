const { Command } = require("commander");
const pkg = require("../package.json");

const name = pkg.name.split("/")[1];

module.exports = function parseArgs(argv, options) {
  return new Command()
    .name(name)
    .arguments("<command>")
    .description("", {
      command: "command to run with env variables",
    })
    .option("-f, --file <path>", "env file path", ".env.js")
    .option("-e, --env <key=value...>", "additional env key pairs")
    .helpOption("-h, --help", "display help")
    .addHelpText(
      "after",
      `
Examples:
  ${name} node -e "'console.log(process.env.ENV_VAR)'"
  ${name} echo \\$ENV_VAR
`
    )
    .passThroughOptions()
    .parse(argv, options);
};
