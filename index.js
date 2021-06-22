module.exports = function envjs(env) {
  for (const [key, value] of Object.entries(env)) {
    process.env[key] = value;
  }
};
