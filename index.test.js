const setEnv = require(".");

test("function sets env variables", () => {
  setEnv(require("./env.sample.js"));

  expect(process.env.STRING).toBe("1");
  expect(process.env.NUMBER).toBe("1");
  expect(process.env.BOOLEAN_TRUE).toBe("true");
  expect(process.env.BOOLEAN_FALSE).toBe("false");
  expect(process.env.NULL).toBe("null");
  expect(process.env.UNDEFINED).toBe("undefined");
  expect(process.env.ARRAY).toBe("1,1,true,false,,");
  expect(process.env.OBJECT).toBe("[object Object]");
});

test("CLI sets env variables", () => {
  const { execSync } = require("child_process");

  const script = `\
const assert = require("assert");\
\
assert.strictEqual(process.env.STRING, "1");\
assert.strictEqual(process.env.STRING, "1");\
assert.strictEqual(process.env.NUMBER, "1");\
assert.strictEqual(process.env.BOOLEAN_TRUE, "true");\
assert.strictEqual(process.env.BOOLEAN_FALSE, "false");\
assert.strictEqual(process.env.NULL, "null");\
assert.strictEqual(process.env.UNDEFINED, "undefined");\
assert.strictEqual(process.env.ARRAY, "1,1,true,false,,");\
assert.strictEqual(process.env.OBJECT, "[object Object]");\
`;

  execSync(
    `./index.js -e env.sample.js -- node -e '${JSON.stringify(script)}'`
  );
});
