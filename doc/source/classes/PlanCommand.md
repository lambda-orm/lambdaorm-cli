[Lambda ORM](../README.md) / PlanCommand

# Class: PlanCommand

## Implements

- `CommandModule`

## Table of contents

### Constructors

- [constructor](PlanCommand.md#constructor)

### Properties

- [command](PlanCommand.md#command)
- [describe](PlanCommand.md#describe)

### Methods

- [builder](PlanCommand.md#builder)
- [handler](PlanCommand.md#handler)

## Constructors

### constructor

• **new PlanCommand**(): [`PlanCommand`](PlanCommand.md)

#### Returns

[`PlanCommand`](PlanCommand.md)

## Properties

### command

• **command**: `string` = `'plan'`

#### Implementation of

CommandModule.command

#### Defined in

[src/lib/infrastructure/command/plan.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/46d2ee4abdbb3912cd4638a69aacd78368c5fb5d/src/lib/infrastructure/command/plan.ts#L8)

___

### describe

• **describe**: `string` = `'Return plan execution of query expression'`

#### Implementation of

CommandModule.describe

#### Defined in

[src/lib/infrastructure/command/plan.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/46d2ee4abdbb3912cd4638a69aacd78368c5fb5d/src/lib/infrastructure/command/plan.ts#L9)

## Methods

### builder

▸ **builder**(`args`): `Argv`\<\{ `w`: `unknown`  } & \{ `s`: `unknown`  } & \{ `q`: `unknown`  } & \{ `e`: `unknown`  } & \{ `o`: `unknown`  } & \{ `u`: `unknown`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Argv`\<{}\> |

#### Returns

`Argv`\<\{ `w`: `unknown`  } & \{ `s`: `unknown`  } & \{ `q`: `unknown`  } & \{ `e`: `unknown`  } & \{ `o`: `unknown`  } & \{ `u`: `unknown`  }\>

#### Implementation of

CommandModule.builder

#### Defined in

[src/lib/infrastructure/command/plan.ts:11](https://github.com/lambda-orm/lambdaorm-cli/blob/46d2ee4abdbb3912cd4638a69aacd78368c5fb5d/src/lib/infrastructure/command/plan.ts#L11)

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

[src/lib/infrastructure/command/plan.ts:39](https://github.com/lambda-orm/lambdaorm-cli/blob/46d2ee4abdbb3912cd4638a69aacd78368c5fb5d/src/lib/infrastructure/command/plan.ts#L39)
