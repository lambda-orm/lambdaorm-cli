/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	MetadataModel, MetadataParameter, MetadataConstraint, Metadata, QueryOptions, QueryPlan, DomainSchema, Entity, Enum, Mapping, Relation, Dependent, SchemaConfig
} from 'lambdaorm'
import { BuildArgs, CliOrm, CliSchemaFacade, CliStageFacade } from '../../../application/orm/orm'
import * as client from 'lambdaorm-client-node'
import { Languages } from '../../../application/services/languages'

export class ClientSchemaFacadeWrapper implements CliSchemaFacade {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly schemaService: client.SchemaService) {}

	public async version (): Promise<{ version: string }> {
		return this.schemaService.version()
	}

	public async domain (): Promise<DomainSchema> {
		const domain = await this.schemaService.domain()
		return this.toDomainSchema(domain)
	}

	public async dataSources (): Promise<{ name: string; dialect: string }[]> {
		return this.schemaService.dataSources()
	}

	public async entities (): Promise<Entity[]> {
		const entities = await this.schemaService.entities()
		return entities.map(e => this.toEntity(e))
	}

	public async entity (entity: string): Promise<Entity | undefined> {
		const _entity = await this.schemaService.entity(entity)
		return _entity ? this.toEntity(_entity) : undefined
	}

	public async enums (): Promise<Enum[]> {
		const enums = await this.schemaService.enums()
		return enums.map(e => this.toEnum(e))
	}

	public async enum (_enum: string): Promise<Enum | undefined> {
		const _enum_ = await this.schemaService.enum(_enum)
		return _enum_ ? this.toEnum(_enum_) : undefined
	}

	public async mappings (): Promise<Mapping[]> {
		throw new Error('Method not implemented.')
	}

	// public async schema (): Promise<Schema> {
	// return this.schemaService.schema()
	// }
	// public async mapping (mapping: string): Promise<Mapping | undefined> {
	// throw new Error('Method not implemented.')
	// }
	// public async entityMapping (mapping: string, entity: string): Promise<EntityMapping | undefined> {
	// throw new Error('Method not implemented.')
	// }
	// public async stages (): Promise<Stage[]> {
	// throw new Error('Method not implemented.')
	// }
	// public async stage (stage: string): Promise<Stage | undefined> {
	// throw new Error('Method not implemented.')
	// }
	// public async views (): Promise<string[]> {
	// throw new Error('Method not implemented.')
	// }

	private toDomainSchema (source: client.SchemaDomain): DomainSchema {
		const target: DomainSchema = {
			version: source.version,
			entities: source.entities ? source.entities.map((e: client.Entity) => this.toEntity(e)) : [],
			enums: source.enums ? source.enums.map((e: client.Enum) => this.toEnum(e)) : []
		}
		return target
	}

	private toEntity (source: client.Entity): Entity {
		const target: Entity = {
			name: source.name,
			extends: source.extends,
			abstract: source.abstract,
			singular: source.singular,
			// view: source.view,
			primaryKey: source.primaryKey,
			uniqueKey: source.uniqueKey,
			required: [], // source.required,
			indexes: source.indexes,
			properties: source.properties,
			relations: source.relations ? source.relations.map(r => this.toRelation(r)) : [],
			dependents: source.dependents ? source.dependents.map(d => this.toDependent(d)) : [],
			constraints: source.constraints
			// hadReadExps: source.hadReadExps,
			// hadWriteExps: source.hadWriteExps,
			// hadReadValues: source.hadReadValues,
			// hadWriteValues: source.hadWriteValues,
			// hadDefaults: source.hadDefaults,
			// hadViewReadExp: source.hadViewReadExp,
			// composite: source.composite
		}
		return target
	}

	private toRelation (source: client.Relation): Relation {
		const target: Relation = {
			name: source.name,
			entity: source.entity,
			from: source.from,
			to: source.to,
			weak: source.weak,
			target: source.target,
			type: source.type as Relation['type']
		}
		return target
	}

	private toDependent (source: client.Dependent): Dependent {
		const target: Dependent = {
			entity: source.entity,
			relation: this.toRelation(source.relation)
		}
		return target
	}

	private toEnum (source: client.Enum): Enum {
		const target: Enum = {
			name: source.name,
			values: source.values
		}
		return target
	}
}

export class ClientStageFacadeWrapper implements CliStageFacade {
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

export class OrmClientWrapper implements CliOrm {
	private schemaFacade: CliSchemaFacade
	private stageFacade: CliStageFacade
	private orm: client.Orm
	public constructor (private readonly languages: Languages, private readonly workspace:string, private readonly host:string) {
		this.orm = new client.Orm(host)
		this.schemaFacade = new ClientSchemaFacadeWrapper(this.orm.schema)
		this.stageFacade = new ClientStageFacadeWrapper(this.orm.stage)
	}

	build (args: BuildArgs): Promise<void> {
		// TODO: Implement build
		throw new Error('Method not implemented.')
	}

	public async init (): Promise<any> {
		return this.orm.init(this.host)
	}

	public async end (): Promise<void> {
		return this.orm.end()
	}

	public async getStageName (stage?:string):Promise<string> {
		const stages = await this.orm.schema.stages()
		if (stages.length === 0) {
			throw new Error(`Can't found stages in ${this.host}`)
		}
		if (stage === undefined) {
			return stages[0].name
		}
		const _stage = stages.find(s => s.name === stage)
		if (_stage === undefined) {
			throw new Error(`Can't found stage ${stage} in ${this.host}`)
		}
		return _stage.name
	}

	public get schema (): CliSchemaFacade {
		return this.schemaFacade
	}

	public get stage (): CliStageFacade {
		return this.stageFacade
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
		const metadataPlan = await this.orm.plan(expression, options)
		return this.toQueryPlan(metadataPlan)
	}

	public async execute (expression: string, data?: any, options?: QueryOptions | undefined): Promise<any> {
		return this.orm.execute(expression, data, options)
	}

	private toQueryPlan (source: client.MetadataPlan): QueryPlan {
		const target: QueryPlan = {
			entity: source.entity,
			dialect: source.dialect,
			source: source.dataSource,
			sentence: source.sentence,
			children: []
		}
		if (source.children) {
			for (const child of source.children) {
				target.children?.push(this.toQueryPlan(child))
			}
		}
		return target
	}
}
