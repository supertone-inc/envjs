# @supertone/envjs

[![npm (scoped)](https://img.shields.io/npm/v/@supertone/envjs)](https://www.npmjs.com/package/@supertone/envjs)
[![Test](https://github.com/supertone-inc/envjs/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/supertone-inc/envjs/actions/workflows/test.yml)

Loads environment variables from `.js` or `.json` files.

## Installation

```sh
npm install --save-dev @supertone/envjs
```

## Usage

```sh
Usage: envjs [options] '<command_to_execute>'

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -f, --file     JS or JSON file to load            [string] [default: "env.js"]

Examples:
  envjs -f env.js 'echo $ENV_VAR'
  envjs -f env.js 'node -e "console.log(process.env.ENV_VAR)"'
```

For example in `package.json`:

```json
{
  "scripts": {
    "start": "envjs 'http-server -p $PORT'",
    "build": "envjs -f env.production.js 'npm build'"
  }
}
```
