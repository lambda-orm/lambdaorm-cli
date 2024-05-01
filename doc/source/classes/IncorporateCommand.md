[Lambda ORM](../README.md) / IncorporateCommand

# Class: IncorporateCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](IncorporateCommand.md#constructor)

### Properties

- [command](IncorporateCommand.md#command)
- [describe](IncorporateCommand.md#describe)

### Methods

- [builder](IncorporateCommand.md#builder)
- [handler](IncorporateCommand.md#handler)

## Constructors

### constructor

• **new IncorporateCommand**(): [`IncorporateCommand`](IncorporateCommand.md)

#### Returns

[`IncorporateCommand`](IncorporateCommand.md)

## Properties

### command

• **command**: `string` = `'incorporate'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/incorporate.ts:7](https://github.com/lambda-orm/lambdaorm-cli/blob/ac662ffb95b5ea5c1f510552aa936bbca8f873e4/src/lib/infrastructure/command/incorporate.ts#L7)

___

### describe

• **describe**: `string` = `'Update schema and sync source and import data.'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/incorporate.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/ac662ffb95b5ea5c1f510552aa936bbca8f873e4/src/lib/infrastructure/command/incorporate.ts#L8)

## Methods

### builder

▸ **builder**(`args`): `Argv`\<\{ `w`: `unknown`  } & \{ `u`: `unknown`  } & \{ `s`: `unknown`  } & \{ `e`: `unknown`  } & \{ `d`: `unknown`  } & \{ `n`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`\<{}\> |

#### Returns

`Argv`\<\{ `w`: `unknown`  } & \{ `u`: `unknown`  } & \{ `s`: `unknown`  } & \{ `e`: `unknown`  } & \{ `d`: `unknown`  } & \{ `n`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/incorporate.ts:10](https://github.com/lambda-orm/lambdaorm-cli/blob/ac662ffb95b5ea5c1f510552aa936bbca8f873e4/src/lib/infrastructure/command/incorporate.ts#L10)

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

[src/lib/infrastructure/command/incorporate.ts:38](https://github.com/lambda-orm/lambdaorm-cli/blob/ac662ffb95b5ea5c1f510552aa936bbca8f873e4/src/lib/infrastructure/command/incorporate.ts#L38)
