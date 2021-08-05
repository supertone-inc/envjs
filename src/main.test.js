const { execSync } = require("child_process");

const script = `node src/main`;

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
  execSync(
    `${script} ${createTestCommand(
      `assert.strictEqual(process.env.ENV_VAR, ".env.js");`
    )}`
  );

  execSync(
    `${script} -e ENV_VAR=.env.json -- ${createTestCommand(
      `assert.strictEqual(process.env.ENV_VAR, ".env.json");`
    )}`
  );
});

it("substitutes env variables for command", () => {
  expect(
    execSync(`${script} echo \\$ENV_VAR`, {
      encoding: "utf8",
    }).trim()
  ).toBe(".env.js");

  expect(
    execSync(`${script} -e ENV_VAR=.env.json -- echo \\$ENV_VAR`, {
      encoding: "utf8",
    }).trim()
  ).toBe(".env.json");
});

it("overwrites existing values", () => {
  const outerCommand = (command) =>
    `${script} -f .env.js -e ENV_VAR_INLINE=.env.inline.js -- ${JSON.stringify(
      command
    )}`;

  const innerCommand = (command) =>
    `${script} -f .env.json -e ENV_VAR_INLINE=.env.inline.json -- ${JSON.stringify(
      command
    )}`;

  const testCommand = `node -e ${JSON.stringify(`\
      const assert = require("assert");\
      assert.strictEqual(process.env.ENV_VAR, ".env.json");\
      assert.strictEqual(process.env.ENV_VAR_INLINE, ".env.inline.json");\
  `)}`;

  execSync(outerCommand(innerCommand(testCommand)));
});
