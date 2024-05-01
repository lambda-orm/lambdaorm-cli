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

• **new ExecuteCommand**(): [`ExecuteCommand`](ExecuteCommand.md)

#### Returns

[`ExecuteCommand`](ExecuteCommand.md)

## Properties

### command

• **command**: `string` = `'execute'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/execute.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/14d16881d84bca907357404b9877523e8b96697b/src/lib/infrastructure/command/execute.ts#L8)

___

### describe

• **describe**: `string` = `'Execute an query expression'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/execute.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/14d16881d84bca907357404b9877523e8b96697b/src/lib/infrastructure/command/execute.ts#L9)

## Methods

### builder

▸ **builder**(`args`): `Argv`\<\{ `w`: `unknown`  } & \{ `s`: `unknown`  } & \{ `q`: `unknown`  } & \{ `d`: `unknown`  } & \{ `e`: `unknown`  } & \{ `o`: `unknown`  } & \{ `u`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`\<{}\> |

#### Returns

`Argv`\<\{ `w`: `unknown`  } & \{ `s`: `unknown`  } & \{ `q`: `unknown`  } & \{ `d`: `unknown`  } & \{ `e`: `unknown`  } & \{ `o`: `unknown`  } & \{ `u`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/execute.ts:11](https://github.com/lambda-orm/lambdaorm-cli/blob/14d16881d84bca907357404b9877523e8b96697b/src/lib/infrastructure/command/execute.ts#L11)

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

[src/lib/infrastructure/command/execute.ts:43](https://github.com/lambda-orm/lambdaorm-cli/blob/14d16881d84bca907357404b9877523e8b96697b/src/lib/infrastructure/command/execute.ts#L43)
