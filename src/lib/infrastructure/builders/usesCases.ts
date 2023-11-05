import { h3lp } from 'h3lp'
import { OrmCliServiceBuilder } from './ormCliService'
import {
	Helper, Build, Create, Drop, Execute, Import, Export, Synchronize,
	Update, Version, VersionGlobal
} from '../../application'

const helper = new Helper(h3lp)
const ormCliService = new OrmCliServiceBuilder(helper).build()
export const build = new Build(ormCliService)
export const create = new Create(ormCliService, helper)
export const drop = new Drop(ormCliService)
export const execute = new Execute(ormCliService, helper)
export const _import = new Import(ormCliService, helper)
export const _export = new Export(ormCliService, helper)
export const synchronize = new Synchronize()
export const version = new Version(ormCliService)
export const versionGlobal = new VersionGlobal(ormCliService)
export const update = new Update(ormCliService)
