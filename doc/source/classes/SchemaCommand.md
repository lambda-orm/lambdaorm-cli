[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / SchemaCommand

# Class: SchemaCommand

## Implements

- `CommandModule`

## Constructors

### new SchemaCommand()

> **new SchemaCommand**(): [`SchemaCommand`](SchemaCommand.md)

#### Returns

[`SchemaCommand`](SchemaCommand.md)

## Properties

### command

> **command**: `string` = `'schema'`

#### Implementation of

`CommandModule.command`

#### Source

[src/lib/infrastructure/command/schema.ts:7](https://github.com/lambda-orm/lambdaorm-cli/blob/3dd4e71487d712defd5e9b16aec23b71ec8cb5c4/src/lib/infrastructure/command/schema.ts#L7)

***

### describe

> **describe**: `string` = `'Return schema information'`

#### Implementation of

`CommandModule.describe`

#### Source

[src/lib/infrastructure/command/schema.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/3dd4e71487d712defd5e9b16aec23b71ec8cb5c4/src/lib/infrastructure/command/schema.ts#L8)

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

[src/lib/infrastructure/command/schema.ts:10](https://github.com/lambda-orm/lambdaorm-cli/blob/3dd4e71487d712defd5e9b16aec23b71ec8cb5c4/src/lib/infrastructure/command/schema.ts#L10)

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

[src/lib/infrastructure/command/schema.ts:34](https://github.com/lambda-orm/lambdaorm-cli/blob/3dd4e71487d712defd5e9b16aec23b71ec8cb5c4/src/lib/infrastructure/command/schema.ts#L34)
