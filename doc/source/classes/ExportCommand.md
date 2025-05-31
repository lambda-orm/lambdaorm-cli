[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / ExportCommand

# Class: ExportCommand

Defined in: [src/lib/infrastructure/command/export.ts:7](https://github.com/lambda-orm/lambdaorm-cli/blob/691de9d83e6a6eaee062e55c63d94349c5c73948/src/lib/infrastructure/command/export.ts#L7)

## Implements

- `CommandModule`

## Constructors

### Constructor

> **new ExportCommand**(): `ExportCommand`

#### Returns

`ExportCommand`

## Properties

### command

> **command**: `string` = `'export'`

Defined in: [src/lib/infrastructure/command/export.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/691de9d83e6a6eaee062e55c63d94349c5c73948/src/lib/infrastructure/command/export.ts#L8)

string (or array of strings) that executes this command when given on the command line, first string may contain positional args

#### Implementation of

`CommandModule.command`

***

### describe

> **describe**: `string` = `'Export data from a database'`

Defined in: [src/lib/infrastructure/command/export.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/691de9d83e6a6eaee062e55c63d94349c5c73948/src/lib/infrastructure/command/export.ts#L9)

string used as the description for the command in help text, use `false` for a hidden command

#### Implementation of

`CommandModule.describe`

## Methods

### builder()

> **builder**(`args`): `Argv`\<`object` & `object` & `object` & `object` & `object` & `object`\>

Defined in: [src/lib/infrastructure/command/export.ts:11](https://github.com/lambda-orm/lambdaorm-cli/blob/691de9d83e6a6eaee062e55c63d94349c5c73948/src/lib/infrastructure/command/export.ts#L11)

object declaring the options the command accepts, or a function accepting and returning a yargs instance

#### Parameters

##### args

`Argv`

#### Returns

`Argv`\<`object` & `object` & `object` & `object` & `object` & `object`\>

#### Implementation of

`CommandModule.builder`

***

### handler()

> **handler**(`args`): `Promise`\<`void`\>

Defined in: [src/lib/infrastructure/command/export.ts:38](https://github.com/lambda-orm/lambdaorm-cli/blob/691de9d83e6a6eaee062e55c63d94349c5c73948/src/lib/infrastructure/command/export.ts#L38)

a function which will be passed the parsed argv.

#### Parameters

##### args

###### _

(`string` \| `number`)[]

Non-option arguments

###### $0

`string`

The script name or node command

#### Returns

`Promise`\<`void`\>

#### Implementation of

`CommandModule.handler`
