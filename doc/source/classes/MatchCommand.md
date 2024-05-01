[Lambda ORM](../README.md) / MatchCommand

# Class: MatchCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](MatchCommand.md#constructor)

### Properties

- [command](MatchCommand.md#command)
- [describe](MatchCommand.md#describe)

### Methods

- [builder](MatchCommand.md#builder)
- [handler](MatchCommand.md#handler)

## Constructors

### constructor

• **new MatchCommand**(): [`MatchCommand`](MatchCommand.md)

#### Returns

[`MatchCommand`](MatchCommand.md)

## Properties

### command

• **command**: `string` = `'match'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/match.ts:7](https://github.com/lambda-orm/lambdaorm-cli/blob/ac662ffb95b5ea5c1f510552aa936bbca8f873e4/src/lib/infrastructure/command/match.ts#L7)

___

### describe

• **describe**: `string` = `'Match the stage with the sources'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/match.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/ac662ffb95b5ea5c1f510552aa936bbca8f873e4/src/lib/infrastructure/command/match.ts#L8)

## Methods

### builder

▸ **builder**(`args`): `Argv`\<\{ `w`: `unknown`  } & \{ `u`: `unknown`  } & \{ `e`: `unknown`  } & \{ `s`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`\<{}\> |

#### Returns

`Argv`\<\{ `w`: `unknown`  } & \{ `u`: `unknown`  } & \{ `e`: `unknown`  } & \{ `s`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/match.ts:10](https://github.com/lambda-orm/lambdaorm-cli/blob/ac662ffb95b5ea5c1f510552aa936bbca8f873e4/src/lib/infrastructure/command/match.ts#L10)

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

[src/lib/infrastructure/command/match.ts:30](https://github.com/lambda-orm/lambdaorm-cli/blob/ac662ffb95b5ea5c1f510552aa936bbca8f873e4/src/lib/infrastructure/command/match.ts#L30)
