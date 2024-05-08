[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / BuildCommand

# Class: BuildCommand

## Implements

- `CommandModule`

## Constructors

### new BuildCommand()

> **new BuildCommand**(): [`BuildCommand`](BuildCommand.md)

#### Returns

[`BuildCommand`](BuildCommand.md)

## Properties

### command

> **command**: `string` = `'build'`

#### Implementation of

`CommandModule.command`

#### Source

[src/lib/infrastructure/command/build.ts:7](https://github.com/lambda-orm/lambdaorm-cli/blob/080307b936cf037d40e7a34519e601bc1e08bc51/src/lib/infrastructure/command/build.ts#L7)

***

### describe

> **describe**: `string` = `'build model, repositories'`

#### Implementation of

`CommandModule.describe`

#### Source

[src/lib/infrastructure/command/build.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/080307b936cf037d40e7a34519e601bc1e08bc51/src/lib/infrastructure/command/build.ts#L8)

## Methods

### builder()

> **builder**(`args`): `Argv`\<`object` & `object` & `object` & `object` & `object` & `object` & `object` & `object` & `object`\>

#### Parameters

• **args**: `Argv`\<`object`\>

#### Returns

`Argv`\<`object` & `object` & `object` & `object` & `object` & `object` & `object` & `object` & `object`\>

#### Implementation of

`CommandModule.builder`

#### Source

[src/lib/infrastructure/command/build.ts:10](https://github.com/lambda-orm/lambdaorm-cli/blob/080307b936cf037d40e7a34519e601bc1e08bc51/src/lib/infrastructure/command/build.ts#L10)

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

[src/lib/infrastructure/command/build.ts:47](https://github.com/lambda-orm/lambdaorm-cli/blob/080307b936cf037d40e7a34519e601bc1e08bc51/src/lib/infrastructure/command/build.ts#L47)
