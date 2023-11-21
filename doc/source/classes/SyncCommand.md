[Lambda ORM](../README.md) / SyncCommand

# Class: SyncCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](SyncCommand.md#constructor)

### Properties

- [command](SyncCommand.md#command)
- [describe](SyncCommand.md#describe)

### Methods

- [builder](SyncCommand.md#builder)
- [handler](SyncCommand.md#handler)

## Constructors

### constructor

• **new SyncCommand**()

## Properties

### command

• **command**: `string` = `'sync'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/sync.ts:8](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/5ca540d/src/lib/infrastructure/command/sync.ts#L8)

___

### describe

• **describe**: `string` = `'Synchronize database/s.'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/sync.ts:9](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/5ca540d/src/lib/infrastructure/command/sync.ts#L9)

## Methods

### builder

▸ **builder**(`args`): `Argv`<{ `w`: `unknown`  } & { `s`: `unknown`  } & { `e`: `unknown`  } & { `o`: `unknown`  } & { `f`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`<{}\> |

#### Returns

`Argv`<{ `w`: `unknown`  } & { `s`: `unknown`  } & { `e`: `unknown`  } & { `o`: `unknown`  } & { `f`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/sync.ts:11](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/5ca540d/src/lib/infrastructure/command/sync.ts#L11)

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

[src/lib/infrastructure/command/sync.ts:34](https://github.com/FlavioLionelRita/lambdaorm-cli/blob/5ca540d/src/lib/infrastructure/command/sync.ts#L34)
