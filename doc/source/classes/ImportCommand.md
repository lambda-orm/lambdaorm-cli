[Lambda ORM](../README.md) / ImportCommand

# Class: ImportCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](ImportCommand.md#constructor)

### Properties

- [command](ImportCommand.md#command)
- [describe](ImportCommand.md#describe)

### Methods

- [builder](ImportCommand.md#builder)
- [handler](ImportCommand.md#handler)

## Constructors

### constructor

• **new ImportCommand**(): [`ImportCommand`](ImportCommand.md)

#### Returns

[`ImportCommand`](ImportCommand.md)

## Properties

### command

• **command**: `string` = `'import'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/import.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/c3d941920149f3313c114d966471af58639b5720/src/lib/infrastructure/command/import.ts#L8)

___

### describe

• **describe**: `string` = `'Import data from file to database'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/import.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/c3d941920149f3313c114d966471af58639b5720/src/lib/infrastructure/command/import.ts#L9)

## Methods

### builder

▸ **builder**(`args`): `Argv`\<\{ `w`: `unknown`  } & \{ `s`: `unknown`  } & \{ `d`: `unknown`  } & \{ `e`: `unknown`  } & \{ `u`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`\<{}\> |

#### Returns

`Argv`\<\{ `w`: `unknown`  } & \{ `s`: `unknown`  } & \{ `d`: `unknown`  } & \{ `e`: `unknown`  } & \{ `u`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/import.ts:11](https://github.com/lambda-orm/lambdaorm-cli/blob/c3d941920149f3313c114d966471af58639b5720/src/lib/infrastructure/command/import.ts#L11)

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

[src/lib/infrastructure/command/import.ts:35](https://github.com/lambda-orm/lambdaorm-cli/blob/c3d941920149f3313c114d966471af58639b5720/src/lib/infrastructure/command/import.ts#L35)
