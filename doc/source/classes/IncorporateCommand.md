[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / IncorporateCommand

# Class: IncorporateCommand

## Implements

- `CommandModule`

## Constructors

### new IncorporateCommand()

> **new IncorporateCommand**(): [`IncorporateCommand`](IncorporateCommand.md)

#### Returns

[`IncorporateCommand`](IncorporateCommand.md)

## Properties

### command

> **command**: `string` = `'incorporate'`

#### Implementation of

`CommandModule.command`

#### Source

[src/lib/infrastructure/command/incorporate.ts:7](https://github.com/lambda-orm/lambdaorm-cli/blob/bf280932c596613f9722830e8420d4049d392855/src/lib/infrastructure/command/incorporate.ts#L7)

***

### describe

> **describe**: `string` = `'Update schema and push source and import data.'`

#### Implementation of

`CommandModule.describe`

#### Source

[src/lib/infrastructure/command/incorporate.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/bf280932c596613f9722830e8420d4049d392855/src/lib/infrastructure/command/incorporate.ts#L8)

## Methods

### builder()

> **builder**(`args`): `Argv`\<`object` & `object` & `object` & `object` & `object` & `object`\>

#### Parameters

• **args**: `Argv`\<`object`\>

#### Returns

`Argv`\<`object` & `object` & `object` & `object` & `object` & `object`\>

#### Implementation of

`CommandModule.builder`

#### Source

[src/lib/infrastructure/command/incorporate.ts:10](https://github.com/lambda-orm/lambdaorm-cli/blob/bf280932c596613f9722830e8420d4049d392855/src/lib/infrastructure/command/incorporate.ts#L10)

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

[src/lib/infrastructure/command/incorporate.ts:38](https://github.com/lambda-orm/lambdaorm-cli/blob/bf280932c596613f9722830e8420d4049d392855/src/lib/infrastructure/command/incorporate.ts#L38)
