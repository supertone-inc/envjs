const parseArgs = require("./parseArgs");

const script = "node src/parseArgs";

it("parses --file option correctly", () => {
  function parseOptions(command) {
    return parseArgs(`${command} dummy-argument`.split(" ")).opts();
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
