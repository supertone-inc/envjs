const { existsSync } = require("fs");

function mapValues(obj, convert) {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    result[key] = convert(value);
  }

  return result;
}

module.exports = function (path) {
  if (!existsSync(path)) {
    return {};
  }

  const envObject = require(path);

  return mapValues(envObject, String);
};
