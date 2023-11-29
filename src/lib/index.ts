#!/usr/bin/env node
import {
	InitCommand, VersionCommand, DropCommand, SyncCommand,
	ImportCommand, ExportCommand, ExecuteCommand, BuildCommand, PlanCommand, MetadataCommand, ParametersCommand, ModelCommand, ConstraintsCommand
} from './infrastructure'
import yargs from 'yargs'

// eslint-disable-next-line no-unused-expressions
yargs
	.usage('Usage: $0 <command> [options]')
	.command(new InitCommand())
	.command(new VersionCommand())
	.command(new DropCommand())
	.command(new SyncCommand())
	.command(new ImportCommand())
	.command(new ExportCommand())
	.command(new ExecuteCommand())
	.command(new PlanCommand())
	.command(new MetadataCommand())
	.command(new ParametersCommand())
	.command(new ModelCommand())
	.command(new ConstraintsCommand())
	.command(new BuildCommand())
	.recommendCommands()
	.demandCommand(1)
	.strict()
	.alias('v', 'version')
	.help('h')
	.alias('h', 'help')
	.argv
