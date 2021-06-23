const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { name } = require("../package.json");

function parseArgs(argv) {
  return yargs(hideBin(argv))
    .scriptName(name.split("/")[1])
    .locale("en")
    .usage("Usage: $0 [options] '<command>'")
    .example(`$0 -f .env.js 'echo $ENV_VAR'`)
    .example(`$0 -f .env.js 'node -e "console.log(process.env.ENV_VAR)"'`)
    .option("file", {
      alias: "f",
      default: ".env.js",
      description: "Custom env file path",
    });
}

module.exports = parseArgs;

if (require.main === module) {
  const { argv } = parseArgs(process.argv);
  console.log(JSON.stringify(argv));
}
