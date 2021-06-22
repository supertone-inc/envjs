const envjs = require(".");

test("sets env variables", () => {
  envjs(require("./env.sample.js"));

  expect(process.env.STRING).toBe("1");
  expect(process.env.NUMBER).toBe("1");
  expect(process.env.BOOLEAN_TRUE).toBe("true");
  expect(process.env.BOOLEAN_FALSE).toBe("false");
  expect(process.env.NULL).toBe("null");
  expect(process.env.UNDEFINED).toBe("undefined");
  expect(process.env.ARRAY).toBe("1,1,true,false,,");
  expect(process.env.OBJECT).toBe("[object Object]");
});

test("returns converted env variables", () => {
  const env = envjs(require("./env.sample.js"));

  expect(process.env).toStrictEqual(expect.objectContaining(env));
});
