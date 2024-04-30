[Lambda ORM](../README.md) / DropCommand

# Class: DropCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](DropCommand.md#constructor)

### Properties

- [command](DropCommand.md#command)
- [describe](DropCommand.md#describe)

### Methods

- [builder](DropCommand.md#builder)
- [handler](DropCommand.md#handler)

## Constructors

### constructor

• **new DropCommand**(): [`DropCommand`](DropCommand.md)

#### Returns

[`DropCommand`](DropCommand.md)

## Properties

### command

• **command**: `string` = `'drop'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/drop.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/22e01eb56df1185ee0c19ee197e9e34eddd33507/src/lib/infrastructure/command/drop.ts#L8)

___

### describe

• **describe**: `string` = `'Removes all database objects but not the database.'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/drop.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/22e01eb56df1185ee0c19ee197e9e34eddd33507/src/lib/infrastructure/command/drop.ts#L9)

## Methods

### builder

▸ **builder**(`args`): `Argv`\<\{ `w`: `undefined` \| `string`  } & \{ `s`: `undefined` \| `string`  } & \{ `e`: `undefined` \| `string`  } & \{ `o`: `undefined` \| `string`  } & \{ `f`: `unknown`  } & \{ `u`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`\<{}\> |

#### Returns

`Argv`\<\{ `w`: `undefined` \| `string`  } & \{ `s`: `undefined` \| `string`  } & \{ `e`: `undefined` \| `string`  } & \{ `o`: `undefined` \| `string`  } & \{ `f`: `unknown`  } & \{ `u`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/drop.ts:11](https://github.com/lambda-orm/lambdaorm-cli/blob/22e01eb56df1185ee0c19ee197e9e34eddd33507/src/lib/infrastructure/command/drop.ts#L11)

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

[src/lib/infrastructure/command/drop.ts:43](https://github.com/lambda-orm/lambdaorm-cli/blob/22e01eb56df1185ee0c19ee197e9e34eddd33507/src/lib/infrastructure/command/drop.ts#L43)
