[**Lambda ORM**](../README.md)

***

[Lambda ORM](../README.md) / VersionCommand

# Class: VersionCommand

Defined in: [src/lib/infrastructure/command/version.ts:6](https://github.com/lambda-orm/lambdaorm-cli/blob/13ba67f82da56ad016f8e1dfde55096d88f4a8c9/src/lib/infrastructure/command/version.ts#L6)

## Implements

- `CommandModule`

## Constructors

### Constructor

> **new VersionCommand**(): `VersionCommand`

#### Returns

`VersionCommand`

## Properties

### command

> **command**: `string` = `'version'`

Defined in: [src/lib/infrastructure/command/version.ts:7](https://github.com/lambda-orm/lambdaorm-cli/blob/13ba67f82da56ad016f8e1dfde55096d88f4a8c9/src/lib/infrastructure/command/version.ts#L7)

string (or array of strings) that executes this command when given on the command line, first string may contain positional args

#### Implementation of

`CommandModule.command`

***

### describe

> **describe**: `string` = `'Prints lambdaorm version this project uses.'`

Defined in: [src/lib/infrastructure/command/version.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/13ba67f82da56ad016f8e1dfde55096d88f4a8c9/src/lib/infrastructure/command/version.ts#L8)

string used as the description for the command in help text, use `false` for a hidden command

#### Implementation of

`CommandModule.describe`

## Methods

### builder()

> **builder**(`args`): `Argv`\<`object` & `object`\>

Defined in: [src/lib/infrastructure/command/version.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/13ba67f82da56ad016f8e1dfde55096d88f4a8c9/src/lib/infrastructure/command/version.ts#L9)

object declaring the options the command accepts, or a function accepting and returning a yargs instance

#### Parameters

##### args

`Argv`

#### Returns

`Argv`\<`object` & `object`\>

#### Implementation of

`CommandModule.builder`

***

### handler()

> **handler**(`args`): `Promise`\<`void`\>

Defined in: [src/lib/infrastructure/command/version.ts:21](https://github.com/lambda-orm/lambdaorm-cli/blob/13ba67f82da56ad016f8e1dfde55096d88f4a8c9/src/lib/infrastructure/command/version.ts#L21)

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
