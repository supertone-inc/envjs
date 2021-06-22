module.exports = function envjs(env) {
  const convertedEnv = {};

  for (const [key, value] of Object.entries(env)) {
    process.env[key] = value;
    convertedEnv[key] = process.env[key];
  }

  return convertedEnv;
};
