[Lambda ORM](../README.md) / VersionCommand

# Class: VersionCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](VersionCommand.md#constructor)

### Properties

- [command](VersionCommand.md#command)
- [describe](VersionCommand.md#describe)

### Methods

- [builder](VersionCommand.md#builder)
- [handler](VersionCommand.md#handler)

## Constructors

### constructor

• **new VersionCommand**(): [`VersionCommand`](VersionCommand.md)

#### Returns

[`VersionCommand`](VersionCommand.md)

## Properties

### command

• **command**: `string` = `'version'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/version.ts:7](https://github.com/lambda-orm/lambdaorm-cli/blob/022d635/src/lib/infrastructure/command/version.ts#L7)

___

### describe

• **describe**: `string` = `'Prints lambdaorm version this project uses.'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/version.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/022d635/src/lib/infrastructure/command/version.ts#L8)

## Methods

### builder

▸ **builder**(`args`): `Argv`\<\{ `w`: `undefined` \| `string`  } & \{ `l`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`\<{}\> |

#### Returns

`Argv`\<\{ `w`: `undefined` \| `string`  } & \{ `l`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/version.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/022d635/src/lib/infrastructure/command/version.ts#L9)

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

[src/lib/infrastructure/command/version.ts:21](https://github.com/lambda-orm/lambdaorm-cli/blob/022d635/src/lib/infrastructure/command/version.ts#L21)
