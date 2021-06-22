# @supertone/envjs

Loads environment variables from `.js` or `.json` files.

## Installation

```sh
npm install --save-dev @supertone/envjs
```

## Usage

```sh
Usage: envjs [options] -- '<command_to_execute>'

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -f, --file     JS or JSON file to load            [string] [default: "env.js"]

Examples:
  envjs -f env.js -- 'echo $ENV_VAR'
  envjs -f env.js -- 'node -e "console.log(process.env)"'
```

For example in `package.json`:

```json
{
  "scripts": {
    "start-a": "envjs -- 'http-server -p $PORT_A'",
    "start-b": "envjs -- 'http-server -p $PORT_B'",
    "build-production": "envjs -f env.production.js -- 'npm build'"
  }
}
```
