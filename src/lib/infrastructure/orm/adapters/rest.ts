/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	MetadataModel, MetadataParameter, MetadataConstraint, Metadata, QueryOptions, QueryPlan, DomainSchema, Entity, Enum, Mapping, Relation, Dependent, SchemaConfig, Schema, EntityMapping, Stage
} from 'lambdaorm'
import { OrmService, SchemaService, StageService } from '../../../application/ports/orm'
import * as client from 'lambdaorm-client-node'

export class ClientSchemaService implements SchemaService {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly schemaService: client.SchemaService) {}

	public async version (): Promise<{ version: string }> {
		return this.schemaService.version()
	}

	public async domain (): Promise<DomainSchema> {
		return this.schemaService.domain()
	}

	public async sources (): Promise<{ name: string; dialect: string }[]> {
		return this.schemaService.sources()
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
		throw new Error('Method not implemented.')
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

export class ClientStageService implements StageService {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly stageService: client.StageService) {}

	public async exists (stage: string): Promise<boolean> {
		return this.stageService.exists(stage)
	}

	public async export (stage: string, force: boolean): Promise<SchemaConfig> {
		return this.stageService.export(stage)
	}

	public async import (stage: string, schemaData: any): Promise<void> {
		return this.stageService.import(stage, schemaData)
	}

	public async drop (stage: string, sentence: boolean, force:boolean): Promise<any> {
		throw new Error('Functionality not support by client.')
	}

	public async sync (stage: string, sentence: boolean, force:boolean): Promise<any> {
		throw new Error('Functionality not support by client.')
	}
}

export class RestOrmService implements OrmService {
	private _schema?: SchemaService
	private _stage?: StageService
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

	public get schema (): SchemaService {
		if (!this._schema) {
			throw new Error('Schema not initialized')
		}
		return this._schema
	}

	get stage (): StageService {
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

	public async model (expression: string): Promise<MetadataModel[]> {
		return this.orm.model(expression)
	}

	public async parameters (expression: string): Promise<MetadataParameter[]> {
		return this.orm.parameters(expression)
	}

	public async constraints (expression: string): Promise<MetadataConstraint> {
		return this.orm.constraints(expression)
	}

	public async metadata (expression: string): Promise<Metadata> {
		return this.orm.metadata(expression) as Promise<Metadata>
	}

	public async plan (expression: string, options?: QueryOptions | undefined): Promise<QueryPlan> {
		return this.orm.plan(expression, options)
	}

	public async execute (expression: string, data?: any, options?: QueryOptions | undefined): Promise<any> {
		return this.orm.execute(expression, data, options)
	}
}
