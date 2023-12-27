[Lambda ORM](../README.md) / ConstraintsCommand

# Class: ConstraintsCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](ConstraintsCommand.md#constructor)

### Properties

- [command](ConstraintsCommand.md#command)
- [describe](ConstraintsCommand.md#describe)

### Methods

- [builder](ConstraintsCommand.md#builder)
- [handler](ConstraintsCommand.md#handler)

## Constructors

### constructor

• **new ConstraintsCommand**(): [`ConstraintsCommand`](ConstraintsCommand.md)

#### Returns

[`ConstraintsCommand`](ConstraintsCommand.md)

## Properties

### command

• **command**: `string` = `'constraints'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/constraints.ts:8](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/38fc82c/src/lib/infrastructure/command/constraints.ts#L8)

___

### describe

• **describe**: `string` = `'Return constraints associated with the query expression'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/constraints.ts:9](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/38fc82c/src/lib/infrastructure/command/constraints.ts#L9)

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

[src/lib/infrastructure/command/constraints.ts:11](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/38fc82c/src/lib/infrastructure/command/constraints.ts#L11)

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

[src/lib/infrastructure/command/constraints.ts:35](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/38fc82c/src/lib/infrastructure/command/constraints.ts#L35)
