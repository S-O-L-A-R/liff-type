# liff-type (deprecated)

[![npm version](https://badge.fury.io/js/liff-type.svg)](https://badge.fury.io/js/liff-type) [![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/microsoft/TypeScript) [![Maintenance](https://img.shields.io/badge/Maintained%3F-no-red.svg)](https://bitbucket.org/lbesson/ansi-colors)

Type definition for LINE Frontend Framework

### Deprecated

Now LINE publishs official [liff](https://www.npmjs.com/package/@line/liff) at npmjs with typescript! So this package won't be no longer maintainance :) See ya.

Please visit [@line/liff](https://www.npmjs.com/package/@line/liff)

### Installation

```
npm i -D liff-type
```

### Usage

In `.tsconfig`, add `liff-type` to `types` in `compilerOptions`

```
{
    "compilerOptions": {
        "types": ["liff-type"]
    }
}
```

In your code, you can access `liff` directly as global variable without window! 

![example](doc/example.png)

### Versioning

Major and Minor Version are matched with LIFF SDK.

Patch is bug fixed or improvement.
