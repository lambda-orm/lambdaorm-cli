[Lambda ORM](../README.md) / ExportCommand

# Class: ExportCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](ExportCommand.md#constructor)

### Properties

- [command](ExportCommand.md#command)
- [describe](ExportCommand.md#describe)

### Methods

- [builder](ExportCommand.md#builder)
- [handler](ExportCommand.md#handler)

## Constructors

### constructor

• **new ExportCommand**(): [`ExportCommand`](ExportCommand.md)

#### Returns

[`ExportCommand`](ExportCommand.md)

## Properties

### command

• **command**: `string` = `'export'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/export.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/5395a39/src/lib/infrastructure/command/export.ts#L8)

___

### describe

• **describe**: `string` = `'Export data from a database'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/export.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/5395a39/src/lib/infrastructure/command/export.ts#L9)

## Methods

### builder

▸ **builder**(`args`): `Argv`\<\{ `w`: `unknown`  } & \{ `s`: `unknown`  } & \{ `e`: `unknown`  } & \{ `t`: `unknown`  } & \{ `f`: `unknown`  } & \{ `u`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`\<{}\> |

#### Returns

`Argv`\<\{ `w`: `unknown`  } & \{ `s`: `unknown`  } & \{ `e`: `unknown`  } & \{ `t`: `unknown`  } & \{ `f`: `unknown`  } & \{ `u`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/export.ts:11](https://github.com/lambda-orm/lambdaorm-cli/blob/5395a39/src/lib/infrastructure/command/export.ts#L11)

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

[src/lib/infrastructure/command/export.ts:38](https://github.com/lambda-orm/lambdaorm-cli/blob/5395a39/src/lib/infrastructure/command/export.ts#L38)
