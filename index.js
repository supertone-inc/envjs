#!/usr/bin/env node

function setEnv(env) {
  for (const [key, value] of Object.entries(env)) {
    process.env[key] = value;
  }
}

function main() {
  const { execSync } = require("child_process");
  const { existsSync } = require("fs");
  const path = require("path");

  const yargs = require("yargs/yargs");
  const { hideBin } = require("yargs/helpers");

  const pkg = require("./package.json");

  const { argv, showHelp } = yargs(hideBin(process.argv))
    .usage("$0 [options] -- <command>")
    .example(`$0 -- npm install ${pkg.name} --save-dev`)
    .example(`$0 -e env.json -- npm install ${pkg.name} --save-dev`)
    .option("env-file", {
      alias: "e",
      default: "env.js",
      description: "A file to load (*.js|*.json)",
    });

  const envFilePath = path.resolve(process.cwd(), argv.envFile);

  if (existsSync(envFilePath)) {
    setEnv(require(envFilePath));
  }

  const command = argv._.join(" ");

  if (!command) {
    showHelp();
    return;
  }

  execSync(command, { stdio: "inherit" });
}

if (require.main === module) {
  main();
} else {
  module.exports = setEnv;
}
