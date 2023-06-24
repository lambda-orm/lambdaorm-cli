#!/usr/bin/env node
import { h3lp } from 'h3lp'
import { Helper } from '../application'
import { ApplicationBuilder } from './builders/applicationService'
import { OrmCliBuilder } from './builders/ormCliService'
import yargs from 'yargs'
import { InitCommand } from './command/init'
import { VersionCommand } from './command/version'
import { DropCommand } from './command/drop'
import { SyncCommand } from './command/sync'
import { ImportCommand } from './command/import'
import { ExportCommand } from './command/export'
import { ExecuteCommand } from './command/execute'
import { UpdateCommand } from './command/update'

const helper = new Helper(h3lp)
export const application = new ApplicationBuilder(helper).build()
export const ormCli = new OrmCliBuilder(helper).build()

// eslint-disable-next-line no-unused-expressions
yargs
	.usage('Usage: $0 <command> [options]')
	.command(new InitCommand(application))
	.command(new VersionCommand(application))
	.command(new DropCommand(ormCli))
	.command(new SyncCommand(application))
	.command(new ImportCommand(ormCli))
	.command(new ExportCommand(ormCli))
	.command(new ExecuteCommand(ormCli))
	.command(new UpdateCommand(application))
	.recommendCommands()
	.demandCommand(1)
	.strict()
	.alias('v', 'version')
	.help('h')
	.alias('h', 'help')
	.argv
