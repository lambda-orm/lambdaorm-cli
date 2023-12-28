[Lambda ORM](../README.md) / InitCommand

# Class: InitCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](InitCommand.md#constructor)

### Properties

- [command](InitCommand.md#command)
- [describe](InitCommand.md#describe)

### Methods

- [builder](InitCommand.md#builder)
- [handler](InitCommand.md#handler)

## Constructors

### constructor

• **new InitCommand**(): [`InitCommand`](InitCommand.md)

#### Returns

[`InitCommand`](InitCommand.md)

## Properties

### command

• **command**: `string` = `'init'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/init.ts:6](https://github.com/lambda-orm/lambdaorm-cli/blob/d0a833b/src/lib/infrastructure/command/init.ts#L6)

___

### describe

• **describe**: `string` = `'Generates lambdaorm project structure.'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/init.ts:7](https://github.com/lambda-orm/lambdaorm-cli/blob/d0a833b/src/lib/infrastructure/command/init.ts#L7)

## Methods

### builder

▸ **builder**(`args`): `Argv`\<\{ `w`: `string`  } & \{ `s`: `unknown`  } & \{ `d`: `unknown`  } & \{ `c`: `unknown`  } & \{ `data-path`: `unknown`  } & \{ `u`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`\<{}\> |

#### Returns

`Argv`\<\{ `w`: `string`  } & \{ `s`: `unknown`  } & \{ `d`: `unknown`  } & \{ `c`: `unknown`  } & \{ `data-path`: `unknown`  } & \{ `u`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/init.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/d0a833b/src/lib/infrastructure/command/init.ts#L9)

___

### handler

▸ **handler**(`args`): `Promise`\<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `Object` | - |
| `args.$0` | `string` | The script name or node command |
| `args._` | (`string` \| `number`)[] | Non-option arguments |

#### Returns

`Promise`\<`void`\>

#### Implementation of

CommandModule.handler

#### Defined in

[src/lib/infrastructure/command/init.ts:38](https://github.com/lambda-orm/lambdaorm-cli/blob/d0a833b/src/lib/infrastructure/command/init.ts#L38)
