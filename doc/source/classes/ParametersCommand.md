[Lambda ORM](../README.md) / ParametersCommand

# Class: ParametersCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](ParametersCommand.md#constructor)

### Properties

- [command](ParametersCommand.md#command)
- [describe](ParametersCommand.md#describe)

### Methods

- [builder](ParametersCommand.md#builder)
- [handler](ParametersCommand.md#handler)

## Constructors

### constructor

• **new ParametersCommand**()

## Properties

### command

• **command**: `string` = `'execute'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/parameters.ts:8](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/d4bb448/src/lib/infrastructure/command/parameters.ts#L8)

___

### describe

• **describe**: `string` = `'Return parameters associated with the query expression'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/parameters.ts:9](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/d4bb448/src/lib/infrastructure/command/parameters.ts#L9)

## Methods

### builder

▸ **builder**(`args`): `Argv`<{ `w`: `unknown`  } & { `q`: `unknown`  } & { `o`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`<{}\> |

#### Returns

`Argv`<{ `w`: `unknown`  } & { `q`: `unknown`  } & { `o`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/parameters.ts:11](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/d4bb448/src/lib/infrastructure/command/parameters.ts#L11)

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

[src/lib/infrastructure/command/parameters.ts:27](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/d4bb448/src/lib/infrastructure/command/parameters.ts#L27)
