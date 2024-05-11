[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ModelCommand

# Class: ModelCommand

## Implements

- `CommandModule`

## Constructors

### new ModelCommand()

> **new ModelCommand**(): [`ModelCommand`](ModelCommand.md)

#### Returns

[`ModelCommand`](ModelCommand.md)

## Properties

### command

> **command**: `string` = `'model'`

#### Implementation of

`CommandModule.command`

#### Source

[src/lib/infrastructure/command/model.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/78ab04c128a3d9bf0e85700413d1f74a4878565a/src/lib/infrastructure/command/model.ts#L8)

***

### describe

> **describe**: `string` = `'Return model that will be returned in the query execution'`

#### Implementation of

`CommandModule.describe`

#### Source

[src/lib/infrastructure/command/model.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/78ab04c128a3d9bf0e85700413d1f74a4878565a/src/lib/infrastructure/command/model.ts#L9)

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

[src/lib/infrastructure/command/model.ts:11](https://github.com/lambda-orm/lambdaorm-cli/blob/78ab04c128a3d9bf0e85700413d1f74a4878565a/src/lib/infrastructure/command/model.ts#L11)

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

[src/lib/infrastructure/command/model.ts:35](https://github.com/lambda-orm/lambdaorm-cli/blob/78ab04c128a3d9bf0e85700413d1f74a4878565a/src/lib/infrastructure/command/model.ts#L35)
