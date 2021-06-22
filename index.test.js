const { execSync } = require("child_process");
const setEnv = require(".");

test("The function sets env variables", () => {
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

test("CLI runs without env file", () => {
  const result = execSync("./index.js -e not-exists.js echo 'it works!'", {
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

  execSync(
    `./index.js -e env.sample.js -- node -e '${JSON.stringify(script)}'`
  );
});

test("CLI substitutes env variables for command", () => {
  const command =
    "\
./index.js -e env.sample.js -- \
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
";

  const result = execSync(command, { encoding: "utf8" });

  const expected =
    "\
1\n\
1\n\
true\n\
false\n\
null\n\
undefined\n\
1,1,true,false,,\n\
[object Object]\n\
";

  expect(result).toBe(expected);
});
