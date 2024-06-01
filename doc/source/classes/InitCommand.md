[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / InitCommand

# Class: InitCommand

## Implements

- `CommandModule`

## Constructors

### new InitCommand()

> **new InitCommand**(): [`InitCommand`](InitCommand.md)

#### Returns

[`InitCommand`](InitCommand.md)

## Properties

### command

> **command**: `string` = `'init'`

#### Implementation of

`CommandModule.command`

#### Source

[src/lib/infrastructure/command/init.ts:6](https://github.com/lambda-orm/lambdaorm-cli/blob/c851a8bb292deae2db02453930bc8e326462dbb4/src/lib/infrastructure/command/init.ts#L6)

***

### describe

> **describe**: `string` = `'Generates lambdaorm project structure.'`

#### Implementation of

`CommandModule.describe`

#### Source

[src/lib/infrastructure/command/init.ts:7](https://github.com/lambda-orm/lambdaorm-cli/blob/c851a8bb292deae2db02453930bc8e326462dbb4/src/lib/infrastructure/command/init.ts#L7)

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

[src/lib/infrastructure/command/init.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/c851a8bb292deae2db02453930bc8e326462dbb4/src/lib/infrastructure/command/init.ts#L9)

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

[src/lib/infrastructure/command/init.ts:38](https://github.com/lambda-orm/lambdaorm-cli/blob/c851a8bb292deae2db02453930bc8e326462dbb4/src/lib/infrastructure/command/init.ts#L38)
