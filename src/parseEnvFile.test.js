const { resolve } = require("path");
const parseEnvFile = require("./parseEnvFile");

it("parses env file", () => {
  expect(parseEnvFile(resolve(".env.js"))).toEqual({ ENV_VAR: ".env.js" });
});

it("returns empty object when file not exists", () => {
  expect(parseEnvFile("not-exist.js")).toEqual({});
});
