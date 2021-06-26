const parseArgs = require("./parseArgs");

function createArgv(command) {
  return `argv[0] ${command}`.split(" ");
}

it("parses --file option correctly", () => {
  function parseOptions(command) {
    return parseArgs(createArgv(command)).opts();
  }

  expect(parseOptions(`envjs <command>`)).toEqual({
    file: ".env.js",
  });

  expect(parseOptions(`envjs -f .env1.js <command>`)).toEqual({
    file: ".env1.js",
  });

  expect(parseOptions(`envjs -f .env1.js -f .env2.js <command>`)).toEqual({
    file: ".env2.js",
  });
});

it("parses arguments correctly", () => {
  function parseArguments(command) {
    return parseArgs(createArgv(command)).args;
  }

  expect(
    parseArguments(
      `envjs <command> $ENV_VAR \$ENV_VAR -o <o> --option <option>`
    )
  ).toEqual([
    "<command>",
    "$ENV_VAR",
    "$ENV_VAR",
    "-o",
    "<o>",
    "--option",
    "<option>",
  ]);
});

it("distinguishes --file option for command", () => {
  const result = parseArgs(
    createArgv("envjs -f .env.json <command> -f <file>")
  );

  expect(result.opts()).toEqual({ file: ".env.json" });
  expect(result.args).toEqual(["<command>", "-f", "<file>"]);
});
