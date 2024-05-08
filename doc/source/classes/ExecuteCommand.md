[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / ExecuteCommand

# Class: ExecuteCommand

## Implements

- `CommandModule`

## Constructors

### new ExecuteCommand()

> **new ExecuteCommand**(): [`ExecuteCommand`](ExecuteCommand.md)

#### Returns

[`ExecuteCommand`](ExecuteCommand.md)

## Properties

### command

> **command**: `string` = `'execute'`

#### Implementation of

`CommandModule.command`

#### Source

[src/lib/infrastructure/command/execute.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/080307b936cf037d40e7a34519e601bc1e08bc51/src/lib/infrastructure/command/execute.ts#L8)

***

### describe

> **describe**: `string` = `'Execute an query'`

#### Implementation of

`CommandModule.describe`

#### Source

[src/lib/infrastructure/command/execute.ts:9](https://github.com/lambda-orm/lambdaorm-cli/blob/080307b936cf037d40e7a34519e601bc1e08bc51/src/lib/infrastructure/command/execute.ts#L9)

## Methods

### builder()

> **builder**(`args`): `Argv`\<`object` & `object` & `object` & `object` & `object` & `object` & `object`\>

#### Parameters

• **args**: `Argv`\<`object`\>

#### Returns

`Argv`\<`object` & `object` & `object` & `object` & `object` & `object` & `object`\>

#### Implementation of

`CommandModule.builder`

#### Source

[src/lib/infrastructure/command/execute.ts:11](https://github.com/lambda-orm/lambdaorm-cli/blob/080307b936cf037d40e7a34519e601bc1e08bc51/src/lib/infrastructure/command/execute.ts#L11)

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

[src/lib/infrastructure/command/execute.ts:43](https://github.com/lambda-orm/lambdaorm-cli/blob/080307b936cf037d40e7a34519e601bc1e08bc51/src/lib/infrastructure/command/execute.ts#L43)
