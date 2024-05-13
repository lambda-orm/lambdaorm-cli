[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / MetadataCommand

# Class: MetadataCommand

## Implements

- `CommandModule`

## Constructors

### new MetadataCommand()

> **new MetadataCommand**(): [`MetadataCommand`](MetadataCommand.md)

#### Returns

[`MetadataCommand`](MetadataCommand.md)

## Properties

### command

> **command**: `string` = `'metadata'`

#### Implementation of

`CommandModule.command`

#### Source

[src/lib/infrastructure/command/metadata.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/dace2b05c77d16db7d4083f062bd769d40136970/src/lib/infrastructure/command/metadata.ts#L8)

***

### describe

> **describe**: `string` = `'Return metadata associated with the query'`

#### Implementation of

`CommandModule.describe`

#### Source

[src/lib/infrastructure/command/metadata.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/dace2b05c77d16db7d4083f062bd769d40136970/src/lib/infrastructure/command/metadata.ts#L9)

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

[src/lib/infrastructure/command/metadata.ts:11](https://github.com/lambda-orm/lambdaorm-cli/blob/dace2b05c77d16db7d4083f062bd769d40136970/src/lib/infrastructure/command/metadata.ts#L11)

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

[src/lib/infrastructure/command/metadata.ts:35](https://github.com/lambda-orm/lambdaorm-cli/blob/dace2b05c77d16db7d4083f062bd769d40136970/src/lib/infrastructure/command/metadata.ts#L35)
