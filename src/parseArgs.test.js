const { execSync } = require("child_process");

const script = "node src/parseArgs";

function getArgv(command) {
  const result = execSync(command, { encoding: "utf8" });

  try {
    return JSON.parse(result);
  } catch (error) {
    console.debug(result);

    throw error;
  }
}

it("parses arguments", () => {
  const argv = getArgv(`${script} -f .env.json 'echo $ENV_NAME'`);

  expect(argv).toEqual({
    _: ["echo $ENV_NAME"],
    f: ".env.json",
    file: ".env.json",
    $0: "envjs",
  });
});
