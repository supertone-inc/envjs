const { resolve } = require("path");
const parseEnvFile = require("./parseEnvFile");

const envFilePath = resolve(".env.js");

it("parses env file", () => {
  expect(parseEnvFile(envFilePath)).toEqual({ ENV_NAME: ".env.js" });
});

it("returns empty object with not existing files", () => {
  expect(parseEnvFile("not-exist.js")).toEqual({});
});
