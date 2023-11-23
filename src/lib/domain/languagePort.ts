import { DomainSchema, InfrastructureSchema } from 'lambdaorm'
export interface LanguagePort {
	get name():string
	updateStructure (workspace:string, srcPath:string, dataPath?:string): Promise<void>
	addDialects (path:string, infrastructure: InfrastructureSchema): Promise<void>
	localVersion (workspace:string): Promise<string>
	buildModel (modelPath:string, domain: DomainSchema): Promise<void>
	buildRepositories (modelPath:string, domain: DomainSchema) : Promise<void>
}
