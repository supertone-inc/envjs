const { execSync } = require("child_process");

const script = `node src/index.js`;

it("runs without env file", () => {
  const result = execSync(`${script} -f not-exists.js echo 'it works!'`, {
    encoding: "utf8",
  });

  expect(result.trim()).toBe("it works!");
});

it("sets env variables", () => {
  const jsScript = `\
const assert = require("assert");\
assert.strictEqual(process.env.ENV_NAME, ".env.js");\
`;

  execSync(
    `${script} ${JSON.stringify(`node -e ${JSON.stringify(jsScript)}`)}`
  );
});

it("substitutes env variables for command", () => {
  const result = execSync(`${script} 'echo $ENV_NAME'`, { encoding: "utf8" });

  expect(result.trim()).toBe(".env.js");
});

it("overwrites existing values", () => {
  const jsScript = `\
const assert = require("assert");\
assert.strictEqual(process.env.ENV_NAME, ".env.json");\
`;

  execSync(
    `${script} ${JSON.stringify(
      `${script} -f .env.json ${JSON.stringify(
        `node -e ${JSON.stringify(jsScript)}`
      )}`
    )}`
  );
});
