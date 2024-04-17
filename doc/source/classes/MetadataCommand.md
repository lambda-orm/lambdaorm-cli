[Lambda ORM](../README.md) / MetadataCommand

# Class: MetadataCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](MetadataCommand.md#constructor)

### Properties

- [command](MetadataCommand.md#command)
- [describe](MetadataCommand.md#describe)

### Methods

- [builder](MetadataCommand.md#builder)
- [handler](MetadataCommand.md#handler)

## Constructors

### constructor

• **new MetadataCommand**(): [`MetadataCommand`](MetadataCommand.md)

#### Returns

[`MetadataCommand`](MetadataCommand.md)

## Properties

### command

• **command**: `string` = `'metadata'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/metadata.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/28e2a3b89c46bb863a4f422bc081a7c4d74baed3/src/lib/infrastructure/command/metadata.ts#L8)

___

### describe

• **describe**: `string` = `'Return metadata associated with the query expression'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/metadata.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/28e2a3b89c46bb863a4f422bc081a7c4d74baed3/src/lib/infrastructure/command/metadata.ts#L9)

## Methods

### builder

▸ **builder**(`args`): `Argv`\<\{ `w`: `unknown`  } & \{ `q`: `unknown`  } & \{ `e`: `unknown`  } & \{ `o`: `unknown`  } & \{ `u`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`\<{}\> |

#### Returns

`Argv`\<\{ `w`: `unknown`  } & \{ `q`: `unknown`  } & \{ `e`: `unknown`  } & \{ `o`: `unknown`  } & \{ `u`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/metadata.ts:11](https://github.com/lambda-orm/lambdaorm-cli/blob/28e2a3b89c46bb863a4f422bc081a7c4d74baed3/src/lib/infrastructure/command/metadata.ts#L11)

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

[src/lib/infrastructure/command/metadata.ts:35](https://github.com/lambda-orm/lambdaorm-cli/blob/28e2a3b89c46bb863a4f422bc081a7c4d74baed3/src/lib/infrastructure/command/metadata.ts#L35)
