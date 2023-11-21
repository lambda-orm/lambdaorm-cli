[Lambda ORM](../README.md) / InitCommand

# Class: InitCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](InitCommand.md#constructor)

### Properties

- [command](InitCommand.md#command)
- [describe](InitCommand.md#describe)

### Methods

- [builder](InitCommand.md#builder)
- [handler](InitCommand.md#handler)

## Constructors

### constructor

• **new InitCommand**()

## Properties

### command

• **command**: `string` = `'init'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/init.ts:5](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/d330cd2/src/lib/infrastructure/command/init.ts#L5)

___

### describe

• **describe**: `string` = `'Generates lambdaorm project structure.'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/init.ts:6](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/d330cd2/src/lib/infrastructure/command/init.ts#L6)

## Methods

### builder

▸ **builder**(`args`): `Argv`<{ `w`: `string`  } & { `l`: `unknown`  } & { `s`: `unknown`  } & { `d`: `unknown`  } & { `c`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`<{}\> |

#### Returns

`Argv`<{ `w`: `string`  } & { `l`: `unknown`  } & { `s`: `unknown`  } & { `d`: `unknown`  } & { `c`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/init.ts:8](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/d330cd2/src/lib/infrastructure/command/init.ts#L8)

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

[src/lib/infrastructure/command/init.ts:33](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/d330cd2/src/lib/infrastructure/command/init.ts#L33)
