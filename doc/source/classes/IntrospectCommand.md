[Lambda ORM](../README.md) / IntrospectCommand

# Class: IntrospectCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](IntrospectCommand.md#constructor)

### Properties

- [command](IntrospectCommand.md#command)
- [describe](IntrospectCommand.md#describe)

### Methods

- [builder](IntrospectCommand.md#builder)
- [handler](IntrospectCommand.md#handler)

## Constructors

### constructor

• **new IntrospectCommand**(): [`IntrospectCommand`](IntrospectCommand.md)

#### Returns

[`IntrospectCommand`](IntrospectCommand.md)

## Properties

### command

• **command**: `string` = `'introspect'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/introspect.ts:7](https://github.com/lambda-orm/lambdaorm-cli/blob/46d2ee4abdbb3912cd4638a69aacd78368c5fb5d/src/lib/infrastructure/command/introspect.ts#L7)

___

### describe

• **describe**: `string` = `'Read and analyze data and update schemas'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/introspect.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/46d2ee4abdbb3912cd4638a69aacd78368c5fb5d/src/lib/infrastructure/command/introspect.ts#L8)

## Methods

### builder

▸ **builder**(`args`): `Argv`\<\{ `w`: `unknown`  } & \{ `u`: `unknown`  } & \{ `e`: `unknown`  } & \{ `d`: `unknown`  } & \{ `n`: `unknown`  } & \{ `o`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`\<{}\> |

#### Returns

`Argv`\<\{ `w`: `unknown`  } & \{ `u`: `unknown`  } & \{ `e`: `unknown`  } & \{ `d`: `unknown`  } & \{ `n`: `unknown`  } & \{ `o`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/introspect.ts:10](https://github.com/lambda-orm/lambdaorm-cli/blob/46d2ee4abdbb3912cd4638a69aacd78368c5fb5d/src/lib/infrastructure/command/introspect.ts#L10)

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

[src/lib/infrastructure/command/introspect.ts:38](https://github.com/lambda-orm/lambdaorm-cli/blob/46d2ee4abdbb3912cd4638a69aacd78368c5fb5d/src/lib/infrastructure/command/introspect.ts#L38)
