#!/usr/bin/env node
import {
	InitCommand, VersionCommand, DropCommand, PushCommand, ImportCommand, ExportCommand, ExecuteCommand, BuildCommand, PlanCommand,
	MetadataCommand, ParametersCommand, ModelCommand, ConstraintsCommand, PullCommand, SchemaCommand, IncorporateCommand, IntrospectCommand
} from './infrastructure'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { FetchCommand } from './infrastructure/command/fetch'

// eslint-disable-next-line no-unused-expressions

yargs(hideBin(process.argv))
	.usage('Usage: $0 <command> [options]')
	.command(new InitCommand())
	.command(new VersionCommand())
	.command(new DropCommand())
	.command(new PushCommand())
	.command(new ImportCommand())
	.command(new ExportCommand())
	.command(new ExecuteCommand())
	.command(new PlanCommand())
	.command(new MetadataCommand())
	.command(new ParametersCommand())
	.command(new ModelCommand())
	.command(new ConstraintsCommand())
	.command(new BuildCommand())
	.command(new SchemaCommand())
	.command(new IncorporateCommand())
	.command(new IntrospectCommand())
	.command(new FetchCommand())
	.command(new PullCommand())
	.recommendCommands()
	.demandCommand(1)
	.strict()
	.alias('v', 'version')
	.help('h')
	.alias('h', 'help')
	.parse()
