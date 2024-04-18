import { CliFacadeBuilder } from './facade'
import {
	Build, Init, Drop, Execute, Import, Export, Synchronize, Version, VersionGlobal, Plan, Metadata,
	Parameters, Constraints, Model, Schema, Introspect, Incorporate, Match, Fetch
} from '../../application'

const ormCliService = new CliFacadeBuilder().build()
export const version = new Version(ormCliService)
export const versionGlobal = new VersionGlobal(ormCliService)
export const init = new Init(ormCliService)
export const synchronize = new Synchronize(ormCliService)
export const build = new Build(ormCliService)
export const execute = new Execute(ormCliService)
export const plan = new Plan(ormCliService)
export const metadata = new Metadata(ormCliService)
export const parameters = new Parameters(ormCliService)
export const constraints = new Constraints(ormCliService)
export const model = new Model(ormCliService)
export const _import = new Import(ormCliService)
export const _export = new Export(ormCliService)
export const drop = new Drop(ormCliService)
export const schema = new Schema(ormCliService)
export const introspect = new Introspect(ormCliService)
export const incorporate = new Incorporate(ormCliService)
export const match = new Match(ormCliService)
export const fetch = new Fetch(ormCliService)
