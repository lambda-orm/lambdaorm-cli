[Lambda ORM](../README.md) / SchemaCommand

# Class: SchemaCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](SchemaCommand.md#constructor)

### Properties

- [command](SchemaCommand.md#command)
- [describe](SchemaCommand.md#describe)

### Methods

- [builder](SchemaCommand.md#builder)
- [handler](SchemaCommand.md#handler)

## Constructors

### constructor

• **new SchemaCommand**(): [`SchemaCommand`](SchemaCommand.md)

#### Returns

[`SchemaCommand`](SchemaCommand.md)

## Properties

### command

• **command**: `string` = `'schema'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/schema.ts:7](https://github.com/lambda-orm/lambdaorm-cli/blob/c3d941920149f3313c114d966471af58639b5720/src/lib/infrastructure/command/schema.ts#L7)

___

### describe

• **describe**: `string` = `'Return schema information'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/schema.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/c3d941920149f3313c114d966471af58639b5720/src/lib/infrastructure/command/schema.ts#L8)

## Methods

### builder

▸ **builder**(`args`): `Argv`\<\{ `w`: `unknown`  } & \{ `u`: `unknown`  } & \{ `p`: `unknown`  } & \{ `e`: `unknown`  } & \{ `o`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`\<{}\> |

#### Returns

`Argv`\<\{ `w`: `unknown`  } & \{ `u`: `unknown`  } & \{ `p`: `unknown`  } & \{ `e`: `unknown`  } & \{ `o`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/schema.ts:10](https://github.com/lambda-orm/lambdaorm-cli/blob/c3d941920149f3313c114d966471af58639b5720/src/lib/infrastructure/command/schema.ts#L10)

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

[src/lib/infrastructure/command/schema.ts:34](https://github.com/lambda-orm/lambdaorm-cli/blob/c3d941920149f3313c114d966471af58639b5720/src/lib/infrastructure/command/schema.ts#L34)
