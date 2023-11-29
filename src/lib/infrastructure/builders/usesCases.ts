import { h3lp } from 'h3lp'
import { OrmCliServiceBuilder } from './ormCliService'
import {
	Helper, Build, Init, Drop, Execute, Import, Export, Synchronize,
	Version, VersionGlobal, OutputService, Plan, Metadata, Parameters, Constraints, Model
} from '../../application'

const helper = new Helper(h3lp)
const ormCliService = new OrmCliServiceBuilder(helper).build()
const outputService = new OutputService()
export const build = new Build(ormCliService)
export const init = new Init(ormCliService, helper)
export const drop = new Drop(ormCliService)
export const execute = new Execute(ormCliService, helper, outputService)
export const plan = new Plan(ormCliService, outputService)
export const metadata = new Metadata(outputService)
export const parameters = new Parameters(outputService)
export const constraints = new Constraints(outputService)
export const model = new Model(outputService)
export const _import = new Import(ormCliService, helper)
export const _export = new Export(ormCliService, helper)
export const synchronize = new Synchronize()
export const version = new Version(ormCliService)
export const versionGlobal = new VersionGlobal(ormCliService)
// export const update = new Update(ormCliService)
