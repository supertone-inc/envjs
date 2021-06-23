#!/usr/bin/env node

const { existsSync } = require("fs");
const { resolve } = require("path");

function load(path = resolve(process.cwd(), ".env.js")) {
  if (!existsSync(path)) {
    return;
  }

  const env = require(path);

  for (const [key, value] of Object.entries(env)) {
    process.env[key] = value;
  }
}

function main() {
  const { execSync } = require("child_process");

  const yargs = require("yargs/yargs");
  const { hideBin } = require("yargs/helpers");

  const { name } = require("./package.json");

  const { argv, showHelp } = yargs(hideBin(process.argv))
    .scriptName(name.split("/")[1])
    .locale("en")
    .usage("Usage: $0 [options] '<command>'")
    .example(`$0 -f .env.js 'echo $ENV_VAR'`)
    .example(`$0 -f .env.js 'node -e "console.log(process.env.ENV_VAR)"'`)
    .option("file", {
      alias: "f",
      default: ".env.js",
      normalize: true,
      description: "Custom env file path",
    });

  const path = resolve(process.cwd(), argv.file);

  load(path);

  const command = argv._.join(" ");

  if (!command) {
    showHelp();
    return;
  }

  execSync(command, { stdio: "inherit" });
}

if (require.main === module) {
  main();
}
