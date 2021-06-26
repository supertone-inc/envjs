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
  command                   command to run with env variables

Options:
  -f, --file <path>         env file path (default: ".env.js")
  -e, --env <key=value...>  additional env key-value pairs
  -h, --help                display help

Note:
  - You must escape "$" with "\$" for using env variables in command line.
  - If you use variadic options(e.g. -e, --env) directly before <command>,
    insert "--" between [option] and <command> to distinguish them.

Examples:
  envjs echo \$ENV_VAR
  envjs -f .env.json echo \$ENV_VAR
  envjs -e ENV_VAR=value -- echo \$ENV_VAR
  envjs -f .env.json -e ENV_VAR=value -- echo \$ENV_VAR
  envjs -e ENV_VAR=value -f .env.json echo \$ENV_VAR
```

For example in `package.json`:

```json
{
  "scripts": {
    "test": "envjs -f .env.test.js jest",
    "start": "envjs -f .env.dev.js http-server -p \\$PORT",
    "build": "envjs -e NODE_ENV=production -- webpack"
  }
}
```
