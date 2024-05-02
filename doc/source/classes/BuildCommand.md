[Lambda ORM](../README.md) / BuildCommand

# Class: BuildCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](BuildCommand.md#constructor)

### Properties

- [command](BuildCommand.md#command)
- [describe](BuildCommand.md#describe)

### Methods

- [builder](BuildCommand.md#builder)
- [handler](BuildCommand.md#handler)

## Constructors

### constructor

• **new BuildCommand**(): [`BuildCommand`](BuildCommand.md)

#### Returns

[`BuildCommand`](BuildCommand.md)

## Properties

### command

• **command**: `string` = `'build'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/build.ts:7](https://github.com/lambda-orm/lambdaorm-cli/blob/0e60ad6143e4d95ec4d3dcec8275a5b9b4620bfd/src/lib/infrastructure/command/build.ts#L7)

___

### describe

• **describe**: `string` = `'build model, repositories'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/build.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/0e60ad6143e4d95ec4d3dcec8275a5b9b4620bfd/src/lib/infrastructure/command/build.ts#L8)

## Methods

### builder

▸ **builder**(`args`): `Argv`\<\{ `w`: `undefined` \| `string`  } & \{ `l`: `unknown`  } & \{ `m`: `unknown`  } & \{ `r`: `unknown`  } & \{ `a`: `unknown`  } & \{ `src-path`: `unknown`  } & \{ `data-path`: `unknown`  } & \{ `domain-path`: `unknown`  } & \{ `u`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`\<{}\> |

#### Returns

`Argv`\<\{ `w`: `undefined` \| `string`  } & \{ `l`: `unknown`  } & \{ `m`: `unknown`  } & \{ `r`: `unknown`  } & \{ `a`: `unknown`  } & \{ `src-path`: `unknown`  } & \{ `data-path`: `unknown`  } & \{ `domain-path`: `unknown`  } & \{ `u`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/build.ts:10](https://github.com/lambda-orm/lambdaorm-cli/blob/0e60ad6143e4d95ec4d3dcec8275a5b9b4620bfd/src/lib/infrastructure/command/build.ts#L10)

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

[src/lib/infrastructure/command/build.ts:47](https://github.com/lambda-orm/lambdaorm-cli/blob/0e60ad6143e4d95ec4d3dcec8275a5b9b4620bfd/src/lib/infrastructure/command/build.ts#L47)
