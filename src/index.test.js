const { execSync } = require("child_process");

const script = `node src/index`;

function createTestCommand(testScript) {
  return `node -e ${JSON.stringify(
    JSON.stringify(`\
      const assert = require("assert");\
      ${testScript}\
  `)
  )}`;
}

it("runs without env file", () => {
  const result = execSync(`${script} -f not-exists.js echo it works!`, {
    encoding: "utf8",
  });

  expect(result.trim()).toBe("it works!");
});

it("sets env variables", () => {
  const testCommand = createTestCommand(
    `assert.strictEqual(process.env.ENV_VAR, ".env.js");`
  );

  execSync(`${script} ${testCommand}`);
});

it("substitutes env variables for command", () => {
  const result = execSync(`${script} echo \\$ENV_VAR`, {
    encoding: "utf8",
  });

  expect(result.trim()).toBe(".env.js");
});

it("overwrites existing values", () => {
  const outerCommand = (command) =>
    `${script} -f .env.js ${JSON.stringify(command)}`;

  const innerCommand = (command) =>
    `${script} -f .env.json ${JSON.stringify(command)}`;

  const testCommand = createTestCommand(
    `assert.strictEqual(process.env.ENV_VAR, ".env.json");`
  );

  execSync(outerCommand(innerCommand(testCommand)));
});
