const { Command } = require("commander");
const pkg = require("../package.json");

const name = pkg.name.split("/")[1];

function parseArgs(argv, options) {
  return new Command()
    .name(name)
    .arguments("<command>")
    .description("", {
      command: "a command to run with env variables",
    })
    .option("-f, --file <path>", "env file path", ".env.js")
    .helpOption("-h, --help", "display help")
    .addHelpText(
      "after",
      `
Examples:
  ${name} -f .env.js node -e "'console.log(process.env.ENV_VAR)'"
  ${name} -f .env.js echo \\$ENV_VAR
`
    )
    .passThroughOptions()
    .exitOverride((error) => {
      switch (error.code) {
        case "commander.help":
        case "commander.helpDisplayed":
          return;
        default:
          throw error;
      }
    })
    .parse(argv, options);
}

module.exports = parseArgs;

if (require.main === module) {
  const result = parseArgs();
  console.log({
    rawArgs: result.rawArgs,
    opts: result.opts(),
    args: result.args,
    commands: result.commands,
  });
}