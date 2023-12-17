[Lambda ORM](../README.md) / ModelCommand

# Class: ModelCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](ModelCommand.md#constructor)

### Properties

- [command](ModelCommand.md#command)
- [describe](ModelCommand.md#describe)

### Methods

- [builder](ModelCommand.md#builder)
- [handler](ModelCommand.md#handler)

## Constructors

### constructor

• **new ModelCommand**(): [`ModelCommand`](ModelCommand.md)

#### Returns

[`ModelCommand`](ModelCommand.md)

## Properties

### command

• **command**: `string` = `'model'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/model.ts:8](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/0fbf2e6/src/lib/infrastructure/command/model.ts#L8)

___

### describe

• **describe**: `string` = `'Return model that will be returned in the query execution'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/model.ts:9](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/0fbf2e6/src/lib/infrastructure/command/model.ts#L9)

## Methods

### builder

▸ **builder**(`args`): `Argv`\<\{ `w`: `unknown`  } & \{ `q`: `unknown`  } & \{ `e`: `unknown`  } & \{ `o`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`\<{}\> |

#### Returns

`Argv`\<\{ `w`: `unknown`  } & \{ `q`: `unknown`  } & \{ `e`: `unknown`  } & \{ `o`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/model.ts:11](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/0fbf2e6/src/lib/infrastructure/command/model.ts#L11)

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

[src/lib/infrastructure/command/model.ts:31](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/0fbf2e6/src/lib/infrastructure/command/model.ts#L31)
