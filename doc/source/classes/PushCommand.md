[Lambda ORM](../README.md) / PushCommand

# Class: PushCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](PushCommand.md#constructor)

### Properties

- [command](PushCommand.md#command)
- [describe](PushCommand.md#describe)

### Methods

- [builder](PushCommand.md#builder)
- [handler](PushCommand.md#handler)

## Constructors

### constructor

• **new PushCommand**(): [`PushCommand`](PushCommand.md)

#### Returns

[`PushCommand`](PushCommand.md)

## Properties

### command

• **command**: `string` = `'push'`

#### Implementation of

CommandModule.command

#### Defined in

src/lib/infrastructure/command/push.ts:8

___

### describe

• **describe**: `string` = `'Synchronize database/s.'`

#### Implementation of

CommandModule.describe

#### Defined in

src/lib/infrastructure/command/push.ts:9

## Methods

### builder

▸ **builder**(`args`): `Argv`\<\{ `w`: `unknown`  } & \{ `s`: `unknown`  } & \{ `e`: `unknown`  } & \{ `o`: `unknown`  } & \{ `f`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`\<{}\> |

#### Returns

`Argv`\<\{ `w`: `unknown`  } & \{ `s`: `unknown`  } & \{ `e`: `unknown`  } & \{ `o`: `unknown`  } & \{ `f`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

src/lib/infrastructure/command/push.ts:11

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

src/lib/infrastructure/command/push.ts:34
