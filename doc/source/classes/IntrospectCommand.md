[**Lambda ORM**](../README.md) • **Docs**

***

[Lambda ORM](../README.md) / IntrospectCommand

# Class: IntrospectCommand

## Implements

- `CommandModule`

## Constructors

### new IntrospectCommand()

> **new IntrospectCommand**(): [`IntrospectCommand`](IntrospectCommand.md)

#### Returns

[`IntrospectCommand`](IntrospectCommand.md)

## Properties

### command

> **command**: `string` = `'introspect'`

#### Implementation of

`CommandModule.command`

#### Source

[src/lib/infrastructure/command/introspect.ts:7](https://github.com/lambda-orm/lambdaorm-cli/blob/c851a8bb292deae2db02453930bc8e326462dbb4/src/lib/infrastructure/command/introspect.ts#L7)

***

### describe

> **describe**: `string` = `'Read and analyze data and update schemas'`

#### Implementation of

`CommandModule.describe`

#### Source

[src/lib/infrastructure/command/introspect.ts:8](https://github.com/lambda-orm/lambdaorm-cli/blob/c851a8bb292deae2db02453930bc8e326462dbb4/src/lib/infrastructure/command/introspect.ts#L8)

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

[src/lib/infrastructure/command/introspect.ts:10](https://github.com/lambda-orm/lambdaorm-cli/blob/c851a8bb292deae2db02453930bc8e326462dbb4/src/lib/infrastructure/command/introspect.ts#L10)

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

[src/lib/infrastructure/command/introspect.ts:38](https://github.com/lambda-orm/lambdaorm-cli/blob/c851a8bb292deae2db02453930bc8e326462dbb4/src/lib/infrastructure/command/introspect.ts#L38)
