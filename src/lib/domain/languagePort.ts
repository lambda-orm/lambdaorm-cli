import { Schema } from 'lambdaorm'
export interface LanguagePort {
	get name():string
	createStructure (workspace:string, schema: Schema): Promise<void>
	addDialects (workspace:string, schema: Schema): Promise<void>
	localVersion (workspace:string): Promise<string>
	buildModel (workspace:string, schema: Schema): Promise<void>
	buildRepositories (workspace:string, schema: Schema) : Promise<void>
}
