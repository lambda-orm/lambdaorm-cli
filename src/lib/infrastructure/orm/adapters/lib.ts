import {
	MetadataModel, MetadataParameter, MetadataConstraint, Metadata, QueryOptions, QueryPlan, IOrm, DomainSchema, Entity, EntityMapping
	, Enum, Mapping, Schema, Stage, SchemaData, Orm, SchemaState
} from 'lambdaorm'
import { OrmService, CliSchemaService, CliStageService } from '../../../application'

export class LibSchemaService implements CliSchemaService {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly schemaState: SchemaState) {}

	public async introspect (data:any, name:string): Promise<void> {
		this.schemaState.introspect(data, name)
	}

	public async sources (): Promise<{ name: string; dialect: string }[]> {
		return Promise.resolve(this.schemaState.getSchemaSources())
	}

	public async source (source:string): Promise<{ name: string; dialect: string }> {
		return Promise.resolve(this.schemaState.getSchemaSource(source))
	}

	public async version (): Promise<{ version: string | undefined }> {
		return Promise.resolve(this.schemaState.getSchemaVersion())
	}

	public async schema (): Promise<Schema> {
		return Promise.resolve(this.schemaState.schema)
	}

	public async originalSchema (): Promise<Schema> {
		return Promise.resolve(this.schemaState.originalSchema)
	}

	public async domain (): Promise<DomainSchema> {
		return Promise.resolve(this.schemaState.getSchemaDomain())
	}

	public async entities (): Promise<Entity[]> {
		return Promise.resolve(this.schemaState.getSchemaEntities())
	}

	public async entity (entity: string): Promise<Entity | undefined> {
		return Promise.resolve(this.schemaState.getSchemaEntity(entity))
	}

	public async enums (): Promise<Enum[]> {
		return Promise.resolve(this.schemaState.getSchemaEnums())
	}

	public async enum (_enum: string): Promise<Enum | undefined> {
		return Promise.resolve(this.schemaState.getSchemaEnum(_enum))
	}

	public async mappings (): Promise<Mapping[]> {
		return Promise.resolve(this.schemaState.getSchemaMappings())
	}

	public async mapping (mapping: string): Promise<Mapping | undefined> {
		return Promise.resolve(this.schemaState.getSchemaMapping(mapping))
	}

	public async entityMapping (mapping: string, entity: string): Promise<EntityMapping | undefined> {
		return Promise.resolve(this.schemaState.getSchemaEntityMapping(mapping, entity))
	}

	public async stages (): Promise<Stage[]> {
		return Promise.resolve(this.schemaState.getSchemaStages())
	}

	public async stage (stage: string): Promise<Stage | undefined> {
		return Promise.resolve(this.schemaState.getSchemaStage(stage))
	}

	public async views (): Promise<string[]> {
		return Promise.resolve(this.schemaState.getSchemaViews())
	}
}

export class LibStageService implements CliStageService {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly orm:IOrm, private readonly workspace:string) {}

	public async exists (stage: string): Promise<boolean> {
		return this.orm.stage.exists(stage)
	}

	public async fetch (stage: string): Promise<Mapping[]> {
		return this.orm.stage.fetch({ stage })
	}

	public async match (stage: string): Promise<void> {
		await this.orm.stage.match({ stage })
	}

	public async incorporate (data: any, name:string, stage?: string): Promise<void> {
		await this.orm.stage.incorporate(data, name, { stage })
	}

	public async export (stage: string, force: boolean): Promise<SchemaData> {
		return this.orm.stage.export({ stage, tryAllCan: force }).execute()
	}

	public async import (stage: string, schemaData: any): Promise<void> {
		return this.orm.stage.import({ stage }).execute(schemaData)
	}

	public async drop (stage: string, sentence: boolean, force:boolean): Promise<any> {
		if (sentence) {
			return await this.orm.stage.drop({ stage }).sentence()
		} else {
			return await this.orm.stage.drop({ stage, tryAllCan: force }).execute()
		}
	}

	public async sync (stage: string, sentence: boolean, force:boolean): Promise<any> {
		const schema = await this.orm.state.load(this.workspace)
		if (schema === null) {
			throw new Error(`Can't found schema in ${this.workspace}`)
		}
		const _stage = this.orm.state.stage.get(stage)
		if (sentence) {
			return await this.orm.stage.sync({ stage: _stage.name }).sentence()
		} else {
			return await this.orm.stage.sync({ stage: _stage.name, tryAllCan: force }).execute()
		}
	}
}

export class LibOrmService implements OrmService {
	private _schema?: CliSchemaService
	private _stage?: CliStageService
	private readonly orm: IOrm
	public constructor (private readonly workspace:string) {
		this.orm = new Orm(workspace)
		this._schema = new LibSchemaService(this.orm.state)
		this._stage = new LibStageService(this.orm, workspace)
	}

	public async init (): Promise<any> {
		return this.orm.init(this.workspace)
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

	public async getStageName (stage?:string):Promise<string> {
		const schema = await this.orm.state.load(this.workspace)
		if (schema === null) {
			throw new Error(`Can't found schema in ${this.workspace}`)
		}
		const _stage = this.orm.state.stage.get(stage)
		return _stage.name
	}

	public async end (): Promise<void> {
		return this.orm.end()
	}

	public async model (expression: string): Promise<MetadataModel[]> {
		return Promise.resolve(this.orm.model(expression))
	}

	public async parameters (expression: string): Promise<MetadataParameter[]> {
		return Promise.resolve(this.orm.parameters(expression))
	}

	public async constraints (expression: string): Promise<MetadataConstraint> {
		return Promise.resolve(this.orm.constraints(expression))
	}

	public async metadata (expression: string): Promise<Metadata> {
		return Promise.resolve(this.orm.metadata(expression))
	}

	public async plan (expression: string, options?: QueryOptions | undefined): Promise<QueryPlan> {
		return Promise.resolve(this.orm.plan(expression, options))
	}

	public async execute (expression: string, data?: any, options?: QueryOptions | undefined): Promise<any> {
		return this.orm.execute(expression, data, options)
	}
}
