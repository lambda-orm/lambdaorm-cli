[Lambda ORM](../README.md) / UpdateCommand

# Class: UpdateCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](UpdateCommand.md#constructor)

### Properties

- [command](UpdateCommand.md#command)
- [describe](UpdateCommand.md#describe)

### Methods

- [builder](UpdateCommand.md#builder)
- [handler](UpdateCommand.md#handler)

## Constructors

### constructor

• **new UpdateCommand**()

## Properties

### command

• **command**: `string` = `'update'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/update.ts:6](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/5ca540d/src/lib/infrastructure/command/update.ts#L6)

___

### describe

• **describe**: `string` = `'Update workspace.'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/update.ts:7](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/5ca540d/src/lib/infrastructure/command/update.ts#L7)

## Methods

### builder

▸ **builder**(`args`): `Argv`<{ `w`: `undefined` \| `string`  } & { `l`: `unknown`  } & { `only-model`: `unknown`  } & { `src-path`: `unknown`  } & { `data-path`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`<{}\> |

#### Returns

`Argv`<{ `w`: `undefined` \| `string`  } & { `l`: `unknown`  } & { `only-model`: `unknown`  } & { `src-path`: `unknown`  } & { `data-path`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/update.ts:9](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/5ca540d/src/lib/infrastructure/command/update.ts#L9)

___

### handler

▸ **handler**(`args`): `Promise`<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `Object` | - |
| `args.$0` | `string` | The script name or node command |
| `args._` | (`string` \| `number`)[] | Non-option arguments |

#### Returns

`Promise`<`void`\>

#### Implementation of

CommandModule.handler

#### Defined in

[src/lib/infrastructure/command/update.ts:34](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/5ca540d/src/lib/infrastructure/command/update.ts#L34)
