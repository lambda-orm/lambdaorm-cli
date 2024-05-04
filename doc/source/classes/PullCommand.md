[Lambda ORM](../README.md) / PullCommand

# Class: PullCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](PullCommand.md#constructor)

### Properties

- [command](PullCommand.md#command)
- [describe](PullCommand.md#describe)

### Methods

- [builder](PullCommand.md#builder)
- [handler](PullCommand.md#handler)

## Constructors

### constructor

• **new PullCommand**(): [`PullCommand`](PullCommand.md)

#### Returns

[`PullCommand`](PullCommand.md)

## Properties

### command

• **command**: `string` = `'pull'`

#### Implementation of

CommandModule.command

#### Defined in

src/lib/infrastructure/command/pull.ts:7

___

### describe

• **describe**: `string` = `'Pull the stage with the sources'`

#### Implementation of

CommandModule.describe

#### Defined in

src/lib/infrastructure/command/pull.ts:8

## Methods

### builder

▸ **builder**(`args`): `Argv`\<\{ `w`: `unknown`  } & \{ `u`: `unknown`  } & \{ `e`: `unknown`  } & \{ `s`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`\<{}\> |

#### Returns

`Argv`\<\{ `w`: `unknown`  } & \{ `u`: `unknown`  } & \{ `e`: `unknown`  } & \{ `s`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

src/lib/infrastructure/command/pull.ts:10

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

src/lib/infrastructure/command/pull.ts:30
