[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ParametersCommand

# Class: ParametersCommand

## Implements

- `CommandModule`

## Constructors

### new ParametersCommand()

> **new ParametersCommand**(): [`ParametersCommand`](ParametersCommand.md)

#### Returns

[`ParametersCommand`](ParametersCommand.md)

## Properties

### command

> **command**: `string` = `'parameters'`

#### Implementation of

`CommandModule.command`

#### Source

[src/lib/infrastructure/command/parameters.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/3f38d7e69dfd7028b92806d59016ec42d18cdf64/src/lib/infrastructure/command/parameters.ts#L8)

***

### describe

> **describe**: `string` = `'Return parameters associated with the query'`

#### Implementation of

`CommandModule.describe`

#### Source

[src/lib/infrastructure/command/parameters.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/3f38d7e69dfd7028b92806d59016ec42d18cdf64/src/lib/infrastructure/command/parameters.ts#L9)

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

[src/lib/infrastructure/command/parameters.ts:11](https://github.com/lambda-orm/lambdaorm-cli/blob/3f38d7e69dfd7028b92806d59016ec42d18cdf64/src/lib/infrastructure/command/parameters.ts#L11)

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

[src/lib/infrastructure/command/parameters.ts:35](https://github.com/lambda-orm/lambdaorm-cli/blob/3f38d7e69dfd7028b92806d59016ec42d18cdf64/src/lib/infrastructure/command/parameters.ts#L35)
