# @supertone/envjs

[![npm (scoped)](https://img.shields.io/npm/v/@supertone/envjs)](https://www.npmjs.com/package/@supertone/envjs)
[![Test](https://github.com/supertone-inc/envjs/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/supertone-inc/envjs/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/supertone-inc/envjs/branch/main/graph/badge.svg?token=WR97D6K6RG)](https://codecov.io/gh/supertone-inc/envjs)

Executes commands using an environment from a `.js` file.

## Installation

```sh
npm install --save-dev @supertone/envjs
```

## Usage

```sh
Usage: envjs [options] <command>

Arguments:
  command            a command to run with env variables

Options:
  -f, --file <path>  env file path (default: ".env.js")
  -h, --help         display help

Examples:
  envjs node -e "'console.log(process.env.ENV_VAR)'"
  envjs echo \$ENV_VAR
```

For example in `package.json`:

```json
{
  "scripts": {
    "test": "envjs -f .env.test.js jest",
    "start": "envjs -f .env.dev.js http-server -p \\$PORT"
  }
}
```
