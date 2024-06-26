[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / DropCommand

# Class: DropCommand

## Implements

- `CommandModule`

## Constructors

### new DropCommand()

> **new DropCommand**(): [`DropCommand`](DropCommand.md)

#### Returns

[`DropCommand`](DropCommand.md)

## Properties

### command

> **command**: `string` = `'drop'`

#### Implementation of

`CommandModule.command`

#### Source

[src/lib/infrastructure/command/drop.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/c851a8bb292deae2db02453930bc8e326462dbb4/src/lib/infrastructure/command/drop.ts#L8)

***

### describe

> **describe**: `string` = `'Removes all database objects but not the database.'`

#### Implementation of

`CommandModule.describe`

#### Source

[src/lib/infrastructure/command/drop.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/c851a8bb292deae2db02453930bc8e326462dbb4/src/lib/infrastructure/command/drop.ts#L9)

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

[src/lib/infrastructure/command/drop.ts:11](https://github.com/lambda-orm/lambdaorm-cli/blob/c851a8bb292deae2db02453930bc8e326462dbb4/src/lib/infrastructure/command/drop.ts#L11)

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

[src/lib/infrastructure/command/drop.ts:43](https://github.com/lambda-orm/lambdaorm-cli/blob/c851a8bb292deae2db02453930bc8e326462dbb4/src/lib/infrastructure/command/drop.ts#L43)
