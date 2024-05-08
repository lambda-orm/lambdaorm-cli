[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ConstraintsCommand

# Class: ConstraintsCommand

## Implements

- `CommandModule`

## Constructors

### new ConstraintsCommand()

> **new ConstraintsCommand**(): [`ConstraintsCommand`](ConstraintsCommand.md)

#### Returns

[`ConstraintsCommand`](ConstraintsCommand.md)

## Properties

### command

> **command**: `string` = `'constraints'`

#### Implementation of

`CommandModule.command`

#### Source

[src/lib/infrastructure/command/constraints.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/21cb7f501d995d5bcd76a7c59d5aabecb965f61a/src/lib/infrastructure/command/constraints.ts#L8)

***

### describe

> **describe**: `string` = `'Return constraints associated with the query'`

#### Implementation of

`CommandModule.describe`

#### Source

[src/lib/infrastructure/command/constraints.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/21cb7f501d995d5bcd76a7c59d5aabecb965f61a/src/lib/infrastructure/command/constraints.ts#L9)

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

[src/lib/infrastructure/command/constraints.ts:11](https://github.com/lambda-orm/lambdaorm-cli/blob/21cb7f501d995d5bcd76a7c59d5aabecb965f61a/src/lib/infrastructure/command/constraints.ts#L11)

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

[src/lib/infrastructure/command/constraints.ts:35](https://github.com/lambda-orm/lambdaorm-cli/blob/21cb7f501d995d5bcd76a7c59d5aabecb965f61a/src/lib/infrastructure/command/constraints.ts#L35)
