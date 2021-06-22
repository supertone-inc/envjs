const { execSync } = require("child_process");
const envjs = require("./envjs");

test("runs without env file", () => {
  envjs.load("not-exists.js");
});

test("loads env variables", () => {
  envjs.load();

  expect(process.env.STRING).toBe("1");
  expect(process.env.NUMBER).toBe("1");
  expect(process.env.BOOLEAN_TRUE).toBe("true");
  expect(process.env.BOOLEAN_FALSE).toBe("false");
  expect(process.env.NULL).toBe("null");
  expect(process.env.UNDEFINED).toBe("undefined");
  expect(process.env.ARRAY).toBe("1,1,true,false,,");
  expect(process.env.OBJECT).toBe("[object Object]");
});

test("overwrites existing env variables", () => {
  envjs.load("./.env.a.js");
  envjs.load("./.env.b.js");

  expect(process.env.A).toBe("a");
  expect(process.env.B).toBe("b");
  expect(process.env.C).toBe("c from b");
});

test("CLI runs without env file", () => {
  const result = execSync("node envjs -f not-exists.js echo 'it works!'", {
    encoding: "utf8",
  });

  expect(result).toBe("it works!\n");
});

test("CLI sets env variables", () => {
  const script = `\
const assert = require("assert");\
\
assert.strictEqual(process.env.STRING, "1");\
assert.strictEqual(process.env.NUMBER, "1");\
assert.strictEqual(process.env.BOOLEAN_TRUE, "true");\
assert.strictEqual(process.env.BOOLEAN_FALSE, "false");\
assert.strictEqual(process.env.NULL, "null");\
assert.strictEqual(process.env.UNDEFINED, "undefined");\
assert.strictEqual(process.env.ARRAY, "1,1,true,false,,");\
assert.strictEqual(process.env.OBJECT, "[object Object]");\
`;

  execSync(`node envjs ${JSON.stringify(`node -e ${JSON.stringify(script)}`)}`);
});

test("CLI substitutes env variables for command", () => {
  const command = `\
node envjs \
'\
echo $STRING;\
echo $NUMBER;\
echo $BOOLEAN_TRUE;\
echo $BOOLEAN_FALSE;\
echo $NULL;\
echo $UNDEFINED;\
echo $ARRAY;\
echo $OBJECT;\
'\
`;

  const result = execSync(command, { encoding: "utf8" });

  const expected = `\
1\n\
1\n\
true\n\
false\n\
null\n\
undefined\n\
1,1,true,false,,\n\
[object Object]\n\
`;

  expect(result).toBe(expected);
});

test("CLI preserves most inner values", () => {
  const script = `\
const assert = require("assert");\
\
assert.strictEqual(process.env.A, "a");\
assert.strictEqual(process.env.B, "b");\
assert.strictEqual(process.env.C, "c from b");\
`;

  execSync(
    `node envjs -f .env.a.js ${JSON.stringify(
      `node envjs -f .env.b.js ${JSON.stringify(
        `node -e ${JSON.stringify(script)}`
      )}`
    )}`
  );
});
