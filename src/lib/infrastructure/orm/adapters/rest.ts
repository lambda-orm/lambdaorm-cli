/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	MetadataModel, MetadataParameter, MetadataConstraint, Metadata, QueryOptions, QueryPlan, DomainSchema, Entity, Enum, Mapping, SchemaData, Schema, EntityMapping, Stage,
	ExecuteResult
} from 'lambdaorm'
import { OrmService, CliSchemaService, CliStageService } from '../../../application/ports/orm'
import * as client from 'lambdaorm-client-node'

export class ClientSchemaService implements CliSchemaService {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly schemaService: client.ClientSchemaService) {}
	public introspect (data: any, name: string): Promise<void> {
		throw new Error('Method not support in Rest Service.')
	}

	public originalSchema (): Promise<Schema> {
		// TODO: Change for Original Schema
		return this.schemaService.schema()
	}

	public async version (): Promise<{ version: string }> {
		return this.schemaService.version()
	}

	public async domain (): Promise<DomainSchema> {
		return this.schemaService.domain()
	}

	public async sources (): Promise<{ name: string; dialect: string }[]> {
		return this.schemaService.sources()
	}

	public async source (source:string): Promise<{ name: string; dialect: string }> {
		return this.schemaService.source(source)
	}

	public async entities (): Promise<Entity[]> {
		return this.schemaService.entities()
	}

	public async entity (entity: string): Promise<Entity | undefined> {
		return this.schemaService.entity(entity)
	}

	public async enums (): Promise<Enum[]> {
		return this.schemaService.enums()
	}

	public async enum (_enum: string): Promise<Enum | undefined> {
		return await this.schemaService.enum(_enum)
	}

	public async mappings (): Promise<Mapping[]> {
		return await this.schemaService.mappings()
	}

	public async schema (): Promise<Schema> {
		return this.schemaService.schema()
	}

	public async mapping (mapping: string): Promise<Mapping | undefined> {
		return this.schemaService.mapping(mapping)
	}

	public async entityMapping (mapping: string, entity: string): Promise<EntityMapping | undefined> {
		return this.schemaService.entityMapping(mapping, entity)
	}

	public async stages (): Promise<Stage[]> {
		return this.schemaService.stages()
	}

	public async stage (stage: string): Promise<Stage | undefined> {
		return this.schemaService.stage(stage)
	}

	public async views (): Promise<string[]> {
		return this.schemaService.views()
	}
}

export class ClientStageService implements CliStageService {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly stageService: client.ClientStageService) {}

	public async exists (stage: string): Promise<boolean> {
		return this.stageService.exists(stage)
	}

	public async export (stage: string, force: boolean): Promise<SchemaData> {
		return this.stageService.export(stage)
	}

	public async import (stage: string, schemaData: any): Promise<void> {
		return this.stageService.import(stage, schemaData)
	}

	public introspect (data: any, name: string, stage?: string | undefined): Promise<ExecuteResult[]> {
		throw new Error('Functionality not support by rest client.')
	}

	public incorporate (data: any, name: string, stage?: string | undefined): Promise<ExecuteResult[]> {
		throw new Error('Functionality not support by rest client.')
	}

	public fetch (stage: string): Promise<Mapping[]> {
		throw new Error('Functionality not support by rest client.')
	}

	public pull (stage: string): Promise<ExecuteResult[]> {
		throw new Error('Functionality not support by rest client.')
	}

	public async drop (stage: string, sentence: boolean, force:boolean): Promise<any> {
		throw new Error('Functionality not support by rest client.')
	}

	public async push (stage: string, sentence: boolean, force:boolean): Promise<any> {
		throw new Error('Functionality not support by rest client.')
	}
}

export class RestOrmService implements OrmService {
	private _schema?: CliSchemaService
	private _stage?: CliStageService
	private orm: client.Orm
	public constructor (private readonly url:string) {
		this.orm = new client.Orm(url)
	}

	public async init (): Promise<any> {
		await this.orm.init(this.url)
		this._schema = new ClientSchemaService(this.orm.schema)
		this._stage = new ClientStageService(this.orm.stage)
		return null
	}

	public get schema (): CliSchemaService {
		if (!this._schema) {
			throw new Error('Schema not initialized')
		}
		return this._schema
	}

	get stage (): CliStageService {
		if (!this._stage) {
			throw new Error('Stage not initialized')
		}
		return this._stage
	}

	public async end (): Promise<void> {
		return this.orm.end()
	}

	public async getStageName (stage?:string):Promise<string> {
		const stages = await this.orm.schema.stages()
		if (stages.length === 0) {
			throw new Error(`Can't found stages in ${this.url}`)
		}
		if (stage === undefined) {
			return stages[0].name
		}
		const _stage = stages.find(s => s.name === stage)
		if (_stage === undefined) {
			throw new Error(`Can't found stage ${stage} in ${this.url}`)
		}
		return _stage.name
	}

	public async model (query: string): Promise<MetadataModel[]> {
		return this.orm.model(query)
	}

	public async parameters (query: string): Promise<MetadataParameter[]> {
		return this.orm.parameters(query)
	}

	public async constraints (query: string): Promise<MetadataConstraint> {
		return this.orm.constraints(query)
	}

	public async metadata (query: string): Promise<Metadata> {
		return this.orm.metadata(query) as Promise<Metadata>
	}

	public async plan (query: string, options?: QueryOptions | undefined): Promise<QueryPlan> {
		return this.orm.plan(query, options)
	}

	public async execute (query: string, data?: any, options?: QueryOptions | undefined): Promise<any> {
		return this.orm.execute(query, data, options)
	}
}
