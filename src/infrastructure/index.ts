#!/usr/bin/env node
import { h3lp } from 'h3lp'
import { Helper, Build, Create, Drop, Execute, Import, Export, Synchronize, Update, Version, VersionGlobal } from '../application'
import { OrmCliServiceBuilder } from './builders/ormCliService'
import yargs from 'yargs'
import { InitCommand } from './command/init'
import { VersionCommand } from './command/version'
import { DropCommand } from './command/drop'
import { SyncCommand } from './command/sync'
import { ImportCommand } from './command/import'
import { ExportCommand } from './command/export'
import { ExecuteCommand } from './command/execute'
import { UpdateCommand } from './command/update'
import { BuildCommand } from './command/build'

const helper = new Helper(h3lp)
const ormCliService = new OrmCliServiceBuilder(helper).build()
const build = new Build(ormCliService)
const create = new Create(ormCliService, helper)
const drop = new Drop(ormCliService)
const execute = new Execute(ormCliService, helper)
const _import = new Import(ormCliService, helper)
const _export = new Export(ormCliService, helper)
const synchronize = new Synchronize()
const version = new Version(ormCliService)
const versionGlobal = new VersionGlobal(ormCliService)

const update = new Update(ormCliService)

// eslint-disable-next-line no-unused-expressions
yargs
	.usage('Usage: $0 <command> [options]')
	.command(new InitCommand(create))
	.command(new VersionCommand(version, versionGlobal))
	.command(new DropCommand(drop))
	.command(new SyncCommand(synchronize))
	.command(new ImportCommand(_import))
	.command(new ExportCommand(_export))
	.command(new ExecuteCommand(execute))
	.command(new UpdateCommand(update))
	.command(new BuildCommand(build))
	.recommendCommands()
	.demandCommand(1)
	.strict()
	.alias('v', 'version')
	.help('h')
	.alias('h', 'help')
	.argv
