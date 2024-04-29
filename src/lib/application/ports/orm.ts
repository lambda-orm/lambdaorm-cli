/* eslint-disable @typescript-eslint/ban-types */
import {
	QueryPlan, QueryOptions, Metadata, MetadataModel, MetadataConstraint, MetadataParameter
	, DomainSchema, SchemaData, Entity, Enum, Schema, Mapping, EntityMapping, Stage
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
	incorporate (data: any, name:string, stage?: string): Promise<void>
	match (stage: string): Promise<void>
	drop (stage: string, sentence: boolean, force:boolean): Promise<any>
	sync (stage: string, sentence: boolean, force:boolean): Promise<any>
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
		* Get model of expression
		* @returns Model of expression
		*/
	model(expression:string): Promise<MetadataModel[]>

	/**
		* Get parameters of expression
		* @returns Parameters of expression
		*/
	parameters(expression: string): Promise<MetadataParameter[]>

	/**
	 * Get constraints of expression
	 * @returns Constraints of expression
	 */
	constraints(expression:string): Promise<MetadataConstraint>

	/**
		* Get metadata of expression
		* @returns metadata of expression
		*/
	metadata (expression:string):Promise<Metadata>

	/**
	 *
	 * @param expression
	 * @param stage
	 */
	plan(expression: string, options?: QueryOptions): Promise<QueryPlan>

	/**
		* Execute expression
		* @param data Data with variables
		* @param stage Stage name
	  * @param view View name
		* @returns Result of execution
		*/
	execute(expression: string, data?: any, options?: QueryOptions): Promise<any>
}

export interface OrmFactoryArgs {
	workspace?: string
	url?: string
}

export interface OrmFactory {
	create (args: OrmFactoryArgs): OrmService
}
