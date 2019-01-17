# enhanced-sketchtool

## Install

```
$ npm i -D enhanced-sketchtool
$ yarn add -D enhanced-sketchtool
```

## CLI Usage

```
$ npx sketchtool help
$ yarn sketchtool help
```

## Node Usage

```js
import {sketchtool, sketchtoolSync} from 'enhanced-sketchtool'

async function getSketchHelp () {
  const {stdout, status} = await sketchtool(['help']) // node style cb available too!
  if (status !== 0) {
    throw new Error('halp')
  }
  return stdout
}

// you want to print to this process' stdout
// (thus preventing useful return values)?
await sketchtool(['help'], {stdio: 'inherit'})

// you want sync?
sketchtoolSync(['help'], {/* ... spawnSync options */})
```

## Contribution

PRs are most welcome!

## Roadmap

- get a better name
- higher level option api
  - possibly parse `help` cmd to validate this?
- in-memory sketch dumps / parsing
