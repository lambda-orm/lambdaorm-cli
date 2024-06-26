import { SchemaState, SchemaFacade } from 'lambdaorm'
import { OrmCliH3lp, BuildArgs } from '../../application'
import { NodeLanguageService } from './node'
import * as client from 'lambdaorm-client-node'
import path from 'path'
import { ClientSchema } from 'lambdaorm-client-node'

export class ClientNodeLanguageService extends NodeLanguageService {
	public constructor (private readonly schemaFacade:SchemaFacade, schemaState:SchemaState, helper:OrmCliH3lp) {
		super(schemaState, helper)
		this.library = 'lambdaorm-client-node'
	}

	public get name (): string {
		return 'client-node'
	}

	public async build (args:BuildArgs): Promise<void> {
		const schema = await this.schemaState.load(args.workspace) as ClientSchema | null
		if (schema === null) {
			throw new Error(`Can't found schema in ${args.workspace}`)
		}
		if (schema.infrastructure === undefined) {
			throw new Error(`Can't found schema.infrastructure in ${args.workspace}`)
		}
		if (schema.infrastructure?.service?.url === undefined) {
			throw new Error(`Can't found schema.infrastructure.service.url in ${args.workspace}`)
		}
		const orm = new client.Orm()
		try {
			await orm.init(schema.infrastructure.service.url)
			const serviceDomainSchema = await orm.schema.domain()
			if (serviceDomainSchema.version !== schema.domain.version) {
				schema.domain = serviceDomainSchema
			}
			if (schema.infrastructure.paths === undefined) {
				schema.infrastructure.paths = {}
			}
			schema.infrastructure.paths.src = args.srcPath || schema.infrastructure.paths.src || 'src'
			schema.infrastructure.paths.domain = args.domainPath || schema.infrastructure.paths.domain || 'domain'
			// save schema
			await this.schemaFacade.write(schema, path.join(args.workspace, 'lambdaORM.yaml'))
			await this.updateStructure(args.workspace, schema.infrastructure.paths.src)

			if (schema.infrastructure.paths.domain) {
				const __domainPath = path.join(args.workspace, schema.infrastructure.paths.src, schema.infrastructure.paths.domain)
				if (args.options.includes('model')) {
					await this.buildModel(__domainPath, schema.domain)
				}
				if (args.options.includes('repositories')) {
					await this.buildRepositories(__domainPath, schema.domain)
				}
			}
		} catch (error) {
			await orm.end()
			throw error
		}
	}
}
