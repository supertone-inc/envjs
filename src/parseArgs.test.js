const parseArgs = require("./parseArgs");

const script = "node src/parseArgs";

it("parses --file option correctly", () => {
  function parseOptions(command) {
    return parseArgs(command.split(" ")).opts();
  }

  expect(parseOptions(`${script}`)).toEqual({
    file: ".env.js",
  });

  expect(parseOptions(`${script} -f .env1.js`)).toEqual({
    file: ".env1.js",
  });

  expect(parseOptions(`${script} -f .env1.js -f .env2.js`)).toEqual({
    file: ".env2.js",
  });

  expect(parseOptions(`${script} --file .env1.js`)).toEqual({
    file: ".env1.js",
  });

  expect(parseOptions(`${script} --file .env1.js -f .env2.js`)).toEqual({
    file: ".env2.js",
  });
});

it("parses --env option correctly", () => {
  function parseOptions(command) {
    return parseArgs(command.split(" ")).opts();
  }

  const defaultOptions = { file: ".env.js" };

  expect(parseOptions(`${script} -e ENV_VAR0=env-var0`)).toEqual({
    ...defaultOptions,
    env: ["ENV_VAR0=env-var0"],
  });

  expect(
    parseOptions(`${script} -e ENV_VAR0=env-var0 ENV_VAR1=env-var1`)
  ).toEqual({
    ...defaultOptions,
    env: ["ENV_VAR0=env-var0", "ENV_VAR1=env-var1"],
  });

  expect(
    parseOptions(`${script} -e ENV_VAR0=env-var0 -e ENV_VAR1=env-var1`)
  ).toEqual({
    ...defaultOptions,
    env: ["ENV_VAR0=env-var0", "ENV_VAR1=env-var1"],
  });

  expect(
    parseOptions(`${script} -e ENV_VAR0=env-var0 -e ENV_VAR0=env-var1`)
  ).toEqual({
    ...defaultOptions,
    env: ["ENV_VAR0=env-var0", "ENV_VAR0=env-var1"],
  });

  expect(parseOptions(`${script} --env ENV_VAR0=env-var0`)).toEqual({
    ...defaultOptions,
    env: ["ENV_VAR0=env-var0"],
  });

  expect(
    parseOptions(`${script} --env ENV_VAR0=env-var0 ENV_VAR1=env-var1`)
  ).toEqual({
    ...defaultOptions,
    env: ["ENV_VAR0=env-var0", "ENV_VAR1=env-var1"],
  });

  expect(
    parseOptions(`${script} --env ENV_VAR0=env-var0 --env ENV_VAR1=env-var1`)
  ).toEqual({
    ...defaultOptions,
    env: ["ENV_VAR0=env-var0", "ENV_VAR1=env-var1"],
  });

  expect(
    parseOptions(`${script} --env ENV_VAR0=env-var0 --env ENV_VAR0=env-var1`)
  ).toEqual({
    ...defaultOptions,
    env: ["ENV_VAR0=env-var0", "ENV_VAR0=env-var1"],
  });
});

it("parses arguments correctly", () => {
  function parseArguments(command) {
    return parseArgs(command.split(" ")).args;
  }

  expect(parseArguments(`${script} echo $ENV_VAR \$ENV_VAR -f file`)).toEqual([
    "echo",
    "$ENV_VAR",
    "$ENV_VAR",
    "-f",
    "file",
  ]);
});
