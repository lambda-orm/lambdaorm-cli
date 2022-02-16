#!/usr/bin/env node

import yargs from 'yargs'
import { InitCommand } from './command/init'
import { VersionCommand } from './command/version'
import { DropCommand } from './command/drop'
import { SyncCommand } from './command/sync'
import { ImportCommand } from './command/import'
import { ExportCommand } from './command/export'
import { RunCommand } from './command/run'
import { UpdateCommand } from './command/update'

// eslint-disable-next-line no-unused-expressions
yargs
	.usage('Usage: $0 <command> [options]')
	.command(new InitCommand())
	.command(new VersionCommand())
	.command(new DropCommand())
	.command(new SyncCommand())
	.command(new ImportCommand())
	.command(new ExportCommand())
	.command(new RunCommand())
	.command(new UpdateCommand())
	.recommendCommands()
	.demandCommand(1)
	.strict()
	.alias('v', 'version')
	.help('h')
	.alias('h', 'help')
	.argv
