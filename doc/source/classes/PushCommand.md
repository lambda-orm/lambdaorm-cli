[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / PushCommand

# Class: PushCommand

## Implements

- `CommandModule`

## Constructors

### new PushCommand()

> **new PushCommand**(): [`PushCommand`](PushCommand.md)

#### Returns

[`PushCommand`](PushCommand.md)

## Properties

### command

> **command**: `string` = `'push'`

#### Implementation of

`CommandModule.command`

#### Source

[src/lib/infrastructure/command/push.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/bf280932c596613f9722830e8420d4049d392855/src/lib/infrastructure/command/push.ts#L8)

***

### describe

> **describe**: `string` = `'Synchronize database/s.'`

#### Implementation of

`CommandModule.describe`

#### Source

[src/lib/infrastructure/command/push.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/bf280932c596613f9722830e8420d4049d392855/src/lib/infrastructure/command/push.ts#L9)

## Methods

### builder()

> **builder**(`args`): `Argv`\<`object` & `object` & `object` & `object` & `object`\>

#### Parameters

• **args**: `Argv`\<`object`\>

#### Returns

`Argv`\<`object` & `object` & `object` & `object` & `object`\>

#### Implementation of

`CommandModule.builder`

#### Source

[src/lib/infrastructure/command/push.ts:11](https://github.com/lambda-orm/lambdaorm-cli/blob/bf280932c596613f9722830e8420d4049d392855/src/lib/infrastructure/command/push.ts#L11)

***

### handler()

> **handler**(`args`): `Promise`\<`void`\>

#### Parameters

• **args**

• **args.$0**: `string`

The script name or node command

• **args.\_**: (`string` \| `number`)[]

Non-option arguments

#### Returns

`Promise`\<`void`\>

#### Implementation of

`CommandModule.handler`

#### Source

[src/lib/infrastructure/command/push.ts:34](https://github.com/lambda-orm/lambdaorm-cli/blob/bf280932c596613f9722830e8420d4049d392855/src/lib/infrastructure/command/push.ts#L34)