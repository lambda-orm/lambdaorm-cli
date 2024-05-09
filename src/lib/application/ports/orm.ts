/* eslint-disable @typescript-eslint/ban-types */
import {
	QueryPlan, QueryOptions, Metadata, MetadataModel, MetadataConstraint, MetadataParameter
	, DomainSchema, SchemaData, Entity, Enum, Schema, Mapping, EntityMapping, Stage,
	ExecuteResult
} from 'lambdaorm'

export interface CliSchemaService {
	introspect (data:any, name:string): Promise<void>
	version ():Promise<{version:string| undefined }>
	originalSchema (): Promise<Schema>
	schema (): Promise<Schema>
	domain (): Promise<DomainSchema>
	sources ():Promise<{name:string, dialect:string}[]>
	source (source:string): Promise<{ name: string; dialect: string }>
	entities (): Promise<Entity[]>
	entity (entity:string): Promise<Entity|undefined>
	enums (): Promise<Enum[]>
	enum (_enum:string): Promise<Enum|undefined>
	mappings (): Promise<Mapping[]>
	mapping (mapping:string): Promise<Mapping|undefined>
	entityMapping (mapping:string, entity:string): Promise<EntityMapping|undefined>
	stages (): Promise<Stage[]>
	stage (stage:string): Promise<Stage|undefined>
	views (): Promise<string[]>
}

export interface CliStageService {
	exists (stage:string): Promise<boolean>
	export (stage:string, force: boolean): Promise<SchemaData>
	import (stage:string, schemaData:any): Promise<void>
	fetch (stage:string): Promise<Mapping[]>
	introspect (data: any, name:string, stage?: string): Promise<ExecuteResult[]>
	incorporate (data: any, name:string, stage?: string): Promise<ExecuteResult[]>
	pull (stage: string): Promise<ExecuteResult[]>
	drop (stage: string, sentence: boolean, force:boolean): Promise<ExecuteResult[]>
	push (stage: string, sentence: boolean, force:boolean): Promise<ExecuteResult[]>
}
export interface BuildArgs {
	workspace:string
	url?:string
	language:string
	options:string[]
	srcPath?:string
	dataPath?: string
	domainPath?:string
}
export interface OrmService
{
	init ():Promise<any>
	end ():Promise<void>
	// build (args:BuildArgs): Promise<void>
	getStageName (stage?:string):Promise<string>

	get schema() : CliSchemaService
	get stage() : CliStageService
	/**
		* Get model of query
		* @returns Model of query
		*/
	model(query:string): Promise<MetadataModel[]>

	/**
		* Get parameters of query
		* @returns Parameters of query
		*/
	parameters(query: string): Promise<MetadataParameter[]>

	/**
	 * Get constraints of query
	 * @returns Constraints of query
	 */
	constraints(query:string): Promise<MetadataConstraint>

	/**
		* Get metadata of query
		* @returns metadata of query
		*/
	metadata (query:string):Promise<Metadata>

	/**
	 *
	 * @param query
	 * @param stage
	 */
	plan(query: string, options?: QueryOptions): Promise<QueryPlan>

	/**
		* Execute query
		* @param data Data with variables
		* @param stage Stage name
	  * @param view View name
		* @returns Result of execution
		*/
	execute(query: string, data?: any, options?: QueryOptions): Promise<any>
}

export interface OrmFactoryArgs {
	workspace?: string
	url?: string
}

export interface OrmFactory {
	create (args: OrmFactoryArgs): OrmService
}
