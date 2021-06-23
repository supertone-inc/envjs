const replaceEnvVars = require("./replaceEnvVars");

const envVarNames = [
  "$v",
  "$vv",
  "$vV",
  "$v0",
  "$v_",

  "$V",
  "$Vv",
  "$VV",
  "$V0",
  "$V_",

  "$_",
  "$_v",
  "$_V",
  "$_0",
  "$__",
];

const env = Object.fromEntries(
  envVarNames.map((name) => {
    const key = name.slice(1);
    const value = `value-${key}`;

    return [key, value];
  })
);

const delimiter = "";

it("replaces env vars", () => {
  const string = envVarNames.join(delimiter);
  const result = replaceEnvVars(string, env);
  const expected = Object.values(env).join(delimiter);

  expect(result).toBe(expected);
});

it("replaces escaped env vars", () => {
  const string = envVarNames.map((name) => `\\${name}`).join(delimiter);
  const result = replaceEnvVars(string, env);
  const expected = Object.values(env).join(delimiter);

  expect(result).toBe(expected);
});

it("replaces not exist env vars with empty string", () => {
  const string = envVarNames
    .map((name) => `${name}_NOT_EXITSTS`)
    .join(delimiter);
  const result = replaceEnvVars(string, env);
  const expected = envVarNames.map(() => "").join(delimiter);

  expect(result).toBe(expected);
});
