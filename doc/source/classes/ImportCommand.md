[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ImportCommand

# Class: ImportCommand

## Implements

- `CommandModule`

## Constructors

### new ImportCommand()

> **new ImportCommand**(): [`ImportCommand`](ImportCommand.md)

#### Returns

[`ImportCommand`](ImportCommand.md)

## Properties

### command

> **command**: `string` = `'import'`

#### Implementation of

`CommandModule.command`

#### Source

[src/lib/infrastructure/command/import.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/3dd4e71487d712defd5e9b16aec23b71ec8cb5c4/src/lib/infrastructure/command/import.ts#L8)

***

### describe

> **describe**: `string` = `'Import data from file to database'`

#### Implementation of

`CommandModule.describe`

#### Source

[src/lib/infrastructure/command/import.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/3dd4e71487d712defd5e9b16aec23b71ec8cb5c4/src/lib/infrastructure/command/import.ts#L9)

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

[src/lib/infrastructure/command/import.ts:11](https://github.com/lambda-orm/lambdaorm-cli/blob/3dd4e71487d712defd5e9b16aec23b71ec8cb5c4/src/lib/infrastructure/command/import.ts#L11)

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

[src/lib/infrastructure/command/import.ts:35](https://github.com/lambda-orm/lambdaorm-cli/blob/3dd4e71487d712defd5e9b16aec23b71ec8cb5c4/src/lib/infrastructure/command/import.ts#L35)
