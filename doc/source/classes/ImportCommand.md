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

• **new ImportCommand**()

## Properties

### command

• **command**: `string` = `'import'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/import.ts:8](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/33c1fce/src/lib/infrastructure/command/import.ts#L8)

___

### describe

• **describe**: `string` = `'Import data from file to database'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/import.ts:9](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/33c1fce/src/lib/infrastructure/command/import.ts#L9)

## Methods

### builder

▸ **builder**(`args`): `Argv`<{ `w`: `unknown`  } & { `s`: `unknown`  } & { `d`: `unknown`  } & { `e`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`<{}\> |

#### Returns

`Argv`<{ `w`: `unknown`  } & { `s`: `unknown`  } & { `d`: `unknown`  } & { `e`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/import.ts:11](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/33c1fce/src/lib/infrastructure/command/import.ts#L11)

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

[src/lib/infrastructure/command/import.ts:31](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/33c1fce/src/lib/infrastructure/command/import.ts#L31)
