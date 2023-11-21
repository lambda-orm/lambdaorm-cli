[Lambda ORM](../README.md) / ExecuteCommand

# Class: ExecuteCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](ExecuteCommand.md#constructor)

### Properties

- [command](ExecuteCommand.md#command)
- [describe](ExecuteCommand.md#describe)

### Methods

- [builder](ExecuteCommand.md#builder)
- [handler](ExecuteCommand.md#handler)

## Constructors

### constructor

• **new ExecuteCommand**()

## Properties

### command

• **command**: `string` = `'execute'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/execute.ts:8](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/77e2297/src/lib/infrastructure/command/execute.ts#L8)

___

### describe

• **describe**: `string` = `'Execute an expression or return metadata information'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/execute.ts:9](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/77e2297/src/lib/infrastructure/command/execute.ts#L9)

## Methods

### builder

▸ **builder**(`args`): `Argv`<{ `w`: `unknown`  } & { `s`: `unknown`  } & { `q`: `unknown`  } & { `d`: `unknown`  } & { `e`: `unknown`  } & { `o`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`<{}\> |

#### Returns

`Argv`<{ `w`: `unknown`  } & { `s`: `unknown`  } & { `q`: `unknown`  } & { `d`: `unknown`  } & { `e`: `unknown`  } & { `o`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/execute.ts:11](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/77e2297/src/lib/infrastructure/command/execute.ts#L11)

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

[src/lib/infrastructure/command/execute.ts:39](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/77e2297/src/lib/infrastructure/command/execute.ts#L39)
