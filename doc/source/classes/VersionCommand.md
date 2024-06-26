[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / VersionCommand

# Class: VersionCommand

## Implements

- `CommandModule`

## Constructors

### new VersionCommand()

> **new VersionCommand**(): [`VersionCommand`](VersionCommand.md)

#### Returns

[`VersionCommand`](VersionCommand.md)

## Properties

### command

> **command**: `string` = `'version'`

#### Implementation of

`CommandModule.command`

#### Source

[src/lib/infrastructure/command/version.ts:7](https://github.com/lambda-orm/lambdaorm-cli/blob/c851a8bb292deae2db02453930bc8e326462dbb4/src/lib/infrastructure/command/version.ts#L7)

***

### describe

> **describe**: `string` = `'Prints lambdaorm version this project uses.'`

#### Implementation of

`CommandModule.describe`

#### Source

[src/lib/infrastructure/command/version.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/c851a8bb292deae2db02453930bc8e326462dbb4/src/lib/infrastructure/command/version.ts#L8)

## Methods

### builder()

> **builder**(`args`): `Argv`\<`object` & `object`\>

#### Parameters

• **args**: `Argv`\<`object`\>

#### Returns

`Argv`\<`object` & `object`\>

#### Implementation of

`CommandModule.builder`

#### Source

[src/lib/infrastructure/command/version.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/c851a8bb292deae2db02453930bc8e326462dbb4/src/lib/infrastructure/command/version.ts#L9)

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

[src/lib/infrastructure/command/version.ts:21](https://github.com/lambda-orm/lambdaorm-cli/blob/c851a8bb292deae2db02453930bc8e326462dbb4/src/lib/infrastructure/command/version.ts#L21)
