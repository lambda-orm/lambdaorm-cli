import {
	MetadataModel, MetadataParameter, MetadataConstraint, Metadata, QueryOptions, QueryPlan, IOrm, DomainSchema, Entity, EntityMapping
	, Enum, Mapping, Schema, Stage, SchemaFacade, SchemaConfig, Orm
} from 'lambdaorm'
import { OrmService, SchemaService, StageService } from '../../../application'

export class LibSchemaService implements SchemaService {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly schemaFacade: SchemaFacade) {}
	public async sources (): Promise<{ name: string; dialect: string }[]> {
		return Promise.resolve(this.schemaFacade.schema.infrastructure?.sources?.map(s => ({ name: s.name, dialect: s.dialect })) || [])
	}

	public async version (): Promise<{ version: string }> {
		return Promise.resolve({ version: this.schemaFacade.schema.version })
	}

	public async schema (): Promise<Schema> {
		return Promise.resolve(this.schemaFacade.schema)
	}

	public async domain (): Promise<DomainSchema> {
		return Promise.resolve(this.schemaFacade.schema.domain)
	}

	public async dataSources (): Promise<{ name: string; dialect: string }[]> {
		if (this.schemaFacade.schema.infrastructure === undefined || this.schemaFacade.schema.infrastructure.sources === undefined) {
			return Promise.resolve([])
		}
		return Promise.resolve(this.schemaFacade.schema.infrastructure.sources.map(s => ({ name: s.name, dialect: s.dialect })))
	}

	public async entities (): Promise<Entity[]> {
		return Promise.resolve(this.schemaFacade.schema.domain.entities)
	}

	public async entity (entity: string): Promise<Entity | undefined> {
		return Promise.resolve(this.schemaFacade.schema.domain.entities.find(e => e.name === entity))
	}

	public async enums (): Promise<Enum[]> {
		return Promise.resolve(this.schemaFacade.schema.domain.enums)
	}

	public async enum (_enum: string): Promise<Enum | undefined> {
		return Promise.resolve(this.schemaFacade.schema.domain.enums.find(e => e.name === _enum))
	}

	public async mappings (): Promise<Mapping[]> {
		return Promise.resolve(this.schemaFacade.schema.infrastructure?.mappings || [])
	}

	public async mapping (mapping: string): Promise<Mapping | undefined> {
		if (this.schemaFacade.schema.infrastructure === undefined || this.schemaFacade.schema.infrastructure.mappings === undefined) {
			return Promise.resolve(undefined)
		}
		return Promise.resolve(this.schemaFacade.schema.infrastructure.mappings.find(m => m.name === mapping))
	}

	public async entityMapping (mapping: string, entity: string): Promise<EntityMapping | undefined> {
		if (this.schemaFacade.schema.infrastructure === undefined || this.schemaFacade.schema.infrastructure.mappings === undefined) {
			return Promise.resolve(undefined)
		}
		return Promise.resolve(this.schemaFacade.schema.infrastructure.mappings.find(m => m.name === mapping)?.entities.find(e => e.name === entity))
	}

	public async stages (): Promise<Stage[]> {
		return Promise.resolve(this.schemaFacade.schema.infrastructure?.stages || [])
	}

	public async stage (stage: string): Promise<Stage | undefined> {
		if (this.schemaFacade.schema.infrastructure === undefined || this.schemaFacade.schema.infrastructure.stages === undefined) {
			return Promise.resolve(undefined)
		}
		return Promise.resolve(this.schemaFacade.schema.infrastructure?.stages.find(s => s.name === stage))
	}

	public async views (): Promise<string[]> {
		return Promise.resolve(this.schemaFacade.schema.infrastructure?.views?.map(p => p.name) || [])
	}
}

export class LibStageService implements StageService {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly orm:IOrm, private readonly workspace:string) {}
	public async exists (stage: string): Promise<boolean> {
		return this.orm.stage.exists(stage)
	}

	public async export (stage: string, force: boolean): Promise<SchemaConfig> {
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
		const schema = await this.orm.schema.get(this.workspace)
		if (schema === null) {
			throw new Error(`Can't found schema in ${this.workspace}`)
		}
		// await this.orm.init(schema)
		const _stage = this.orm.schema.stage.get(stage)
		if (sentence) {
			return await this.orm.stage.sync({ stage: _stage.name }).sentence()
		} else {
			return await this.orm.stage.sync({ stage: _stage.name, tryAllCan: force }).execute()
		}
	}
}

export class LibOrmService implements OrmService {
	public schema: SchemaService
	public stage: StageService
	private readonly orm: IOrm
	public constructor (private readonly workspace:string) {
		this.orm = new Orm(workspace)
		this.schema = new LibSchemaService(this.orm.schema)
		this.stage = new LibStageService(this.orm, workspace)
	}

	public async init (): Promise<any> {
		return this.orm.init(this.workspace)
	}

	public async getStageName (stage?:string):Promise<string> {
		const schema = await this.orm.schema.get(this.workspace)
		if (schema === null) {
			throw new Error(`Can't found schema in ${this.workspace}`)
		}
		const _stage = this.orm.schema.stage.get(stage)
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
