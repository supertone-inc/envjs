const { Command } = require("commander");
const pkg = require("../package.json");

const name = pkg.name.split("/")[1];

const parser = new Command()
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

module.exports = (...args) => parser.parse(...args);
module.exports.parser = parser;
