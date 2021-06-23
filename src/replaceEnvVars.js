const regex = /\\?\$[a-zA-Z_][a-zA-Z0-9_]*/gm;

module.exports = function replaceEnvVars(string, env) {
  return string.replace(regex, (name) => {
    const key = name.replace(/\\?\$/, "");
    return env[key] || "";
  });
};
