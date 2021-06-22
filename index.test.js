const helloWorld = require(".");

test("helloWorld()", () => {
  expect(helloWorld()).toBe("Hello World!");
});
