import { Dialect, Entity, DomainSchema, InfrastructureSchema, SchemaState } from 'lambdaorm'
import path from 'path'
import { BuildArgs, OrmCliH3lp, LanguageService } from '../../application'

export class NodeLanguageService implements LanguageService {
	protected library: string
	public constructor (protected readonly schemaState:SchemaState, protected readonly helper:OrmCliH3lp) {
		this.library = 'lambdaorm'
	}

	public get name (): string {
		return 'node'
	}

	public async build (args:BuildArgs): Promise<void> {
		let schema = await this.schemaState.load(args.workspace)
		if (schema === null) {
			throw new Error(`Can't found schema in ${args.workspace}`)
		}
		if (!schema.infrastructure) {
			schema.infrastructure = { }
		}
		const _srcPath = args.srcPath || schema.infrastructure?.paths?.src || 'src'
		const _dataPath = args.dataPath || schema.infrastructure?.paths?.data || 'data'
		const _domainPath = args.domainPath || schema.infrastructure?.paths?.domain || 'domain'
		schema = await this.schemaState.load(schema)
		await this.updateStructure(args.workspace, _srcPath, _dataPath)
		// add libraries for dialect
		if (schema.infrastructure && schema.infrastructure.sources && schema.infrastructure.sources.length > 0) {
			await this.addDialects(args.workspace, schema.infrastructure)
		}
		if (_domainPath) {
			const __domainPath = path.join(args.workspace, _srcPath, _domainPath)
			if (args.options.includes('model')) {
				await this.buildModel(__domainPath, schema.domain)
			}
			if (args.options.includes('repositories')) {
				await this.buildRepositories(__domainPath, schema.domain)
			}
		}
	}

	public async localVersion (workspace:string): Promise<string> {
		return await this.helper.cli.getPackage('lambdaorm', workspace)
	}

	/**
	* if the package.json does not exist create it
	*/
	protected async createPackage (workspace:string): Promise<void> {
		const packagePath = path.join(workspace, 'package.json')
		if (!await this.helper.fs.exists(packagePath)) {
			await this.helper.fs.write(packagePath, JSON.stringify({ dependencies: {} }, null, 2))
		}
	}

	/**
	* if the tsconfig.json does not exist create it
	*/
	protected async createTsconfig (workspace:string): Promise<void> {
		const tsconfigPath = path.join(workspace, 'tsconfig.json')
		if (!await this.helper.fs.exists(tsconfigPath)) {
			const tsconfigContent = this.getTypescriptContent()
			await this.helper.fs.write(tsconfigPath, JSON.stringify(tsconfigContent, null, 2))
		}
	}

	/**
	* if the typescript is not installed locally it will be installed
	*/
	protected async installTypescript (workspace:string): Promise<void> {
		const typescriptLib = await this.helper.cli.getPackage('typescript', workspace)
		if (typescriptLib === '') {
			await this.helper.utils.exec('npm install typescript -D', workspace)
		}
	}

	/**
	* if the lambdaorm is not installed locally it will be installed
	*/
	protected async installLibrary (workspace:string): Promise<void> {
		const lambdaormLib = await this.helper.cli.getPackage(this.library, workspace)
		if (lambdaormLib === '') {
			await this.helper.utils.exec(`npm install ${this.library}`, workspace)
		}
	}

	protected async updateStructure (workspace:string, srcPath:string, dataPath?:string): Promise<void> {
		// create initial structure
		await this.helper.fs.create(path.join(workspace, srcPath))
		if (dataPath) {
			await this.helper.fs.create(path.join(workspace, dataPath))
		}
		await this.createPackage(workspace)
		await this.createTsconfig(workspace)
		await this.installTypescript(workspace)
		await this.installLibrary(workspace)
	}

	protected async addDialects (path:string, infrastructure: InfrastructureSchema) : Promise<void> {
		for (const p in infrastructure.sources) {
			const source = infrastructure.sources[p]
			// if the library is not installed locally corresponding to the dialect it will be installed
			const libs = this.getLibs(source.dialect)
			for (const p in libs) {
				const lib = libs[p]
				const localLib = await this.helper.cli.getPackage(lib, path)
				if (localLib === '') {
					await this.helper.utils.exec(`npm install ${lib}`, path)
				}
			}
		}
	}

	protected async buildModel (domainPath:string, domain: DomainSchema) : Promise<void> {
		const content = this.getModelContent(domain)
		this.helper.fs.create(domainPath)
		const schemaPath = path.join(domainPath, 'model.ts')
		await this.helper.fs.write(schemaPath, content)
	}

	protected async buildRepositories (domainPath:string, domain: DomainSchema): Promise<void> {
		this.helper.fs.create(domainPath)
		for (const entity of domain.entities) {
			if (entity.abstract) continue
			const singular = this.helper.str.notation(entity.singular ? entity.singular : this.helper.str.singular(entity.name), 'pascal')
			const repositoryPath = path.join(domainPath, `repository${singular}.ts`)

			if (!await this.helper.fs.exists(repositoryPath)) {
				const repositoryContent = this.getRepositoryContent(entity)
				await this.helper.fs.write(repositoryPath, repositoryContent)
			}
		}
	}

	protected getLibs (dialect: string): string[] {
		switch (dialect) {
		case Dialect.MySQL:
		case Dialect.MariaDB:
			return ['mysql2']
		// case 'sqlite':
		// return ['sqlite3']
		// case 'better-sqlite3':
		// return ['better-sqlite3']
		case Dialect.PostgreSQL:
			return ['pg']
		case Dialect.SqlServer:
			return ['tedious']
		case Dialect.Oracle:
			return ['oracledb']
		case Dialect.MongoDB:
			return ['mongodb']
		case Dialect.SQLjs:
			return ['sql.js']
		default:
			throw new Error(`dialect: ${dialect} not supported`)
		}
	}

	protected getTypescriptContent () {
		return {
			compilerOptions: {
				experimentalDecorators: true,
				emitDecoratorMetadata: true,
				resolveJsonModule: true,
				esModuleInterop: true,
				strict: true,
				declaration: true,
				moduleResolution: 'node',
				sourceMap: true,
				target: 'ES6',
				module: 'commonjs',
				outDir: './build',
				baseUrl: './src',
				typeRoots: [
					'node_modules/@types'
				]
			},
			include: [
				'src/**/*'
			],
			exclude: [
				'node_modules'
			]
		}
	}

	protected getRepositoryContent (entity: Entity): string {
		const lines: string[] = []
		const singular = this.helper.str.notation(entity.singular ? entity.singular : this.helper.str.singular(entity.name), 'pascal')
		lines.push(`import { Repository, IOrm } from '${this.library}'`)
		lines.push(`import { ${singular}, Qry${singular} } from './model'`)
		lines.push(`export class ${singular}Repository extends Repository<${singular}, Qry${singular}> {`)
		lines.push('\tconstructor (stage?: string, orm?:IOrm) {')
		lines.push(`\t\tsuper('${entity.name}', stage, orm)`)
		lines.push('\t}')
		lines.push('\t// Add your code here')
		lines.push('}')
		return lines.join('\n') + '\n'
	}

	protected getModelContent (source:DomainSchema):string {
		const lines: string[] = []
		lines.push('/* eslint-disable no-use-before-define */')
		lines.push('// THIS FILE IS NOT EDITABLE, IS MANAGED BY LAMBDA ORM')
		lines.push('// eslint-disable-next-line @typescript-eslint/no-unused-vars')
		lines.push(`import { Queryable, OneToMany, ManyToOne, OneToOne } from '${this.library}'`)

		if (source.enums) {
			for (const p in source.enums) {
				const _enum = source.enums[p]
				lines.push(`export enum ${_enum.name}{`)

				for (let j = 0; j < _enum.values.length; j++) {
					const value = _enum.values[j]
					const separator = j === _enum.values.length - 1 ? '' : ','
					if (typeof value.value === 'number') {
						lines.push(`\t${value.name} = ${value.value}${separator}`)
					} else {
						lines.push(`\t${value.name} = '${value.value}'${separator}`)
					}
				}
				lines.push('}')
			}
		}

		if (source.entities) {
			for (const entity of source.entities) {
				const singular = this.helper.str.notation(entity.singular ? entity.singular : this.helper.str.singular(entity.name), 'pascal')
				const _abstract = entity.abstract ? ' abstract ' : ' '
				const _extends = entity.extends ? ' extends ' + this.helper.str.singular(entity.extends) + ' ' : ' '

				// create class
				lines.push(`export${_abstract}class ${singular}${_extends}{`)
				if (entity.relations && entity.relations.some(p => p.type === 'manyToOne')) {
					lines.push('\tconstructor () {')
					if (entity.extends) {
						lines.push('\t\tsuper()')
					}
					for (const q in entity.relations) {
						const relation = entity.relations[q]
						if (relation.type === 'manyToOne') {
							lines.push(`\t\tthis.${relation.name} = []`)
						}
					}
					lines.push('\t}')
					lines.push('')
				}

				for (const q in entity.properties) {
					const property = entity.properties[q]
					const type = property.enum ? property.enum : this.getType(property.type)
					if (property.required && property.default === undefined) {
						lines.push(`\t${property.name}?: ${type}`)
					} else {
						lines.push(`\t${property.name}?: ${type}`)
					}
				}
				for (const q in entity.relations) {
					const relation = entity.relations[q]
					const relationEntity = source.entities.find(p => p.name === relation.entity) as Entity
					if (relationEntity === undefined) {
						throw new Error(`Not exists ${relation.entity} relation in ${entity.name} entity`)
					}
					const relationEntitySingularName = this.helper.str.notation(relationEntity.singular ? relationEntity.singular : this.helper.str.singular(relationEntity.name), 'pascal')
					switch (relation.type) {
					case 'oneToMany':
					case 'oneToOne':
						lines.push(`\t${relation.name}?: ${relationEntitySingularName}`)
						break
					case 'manyToOne':
						lines.push(`\t${relation.name}: ${relationEntitySingularName}[]`)
						break
					}
				}
				lines.push('}')

				// create interface
				const _extendsInterface = entity.extends ? ' extends Qry' + this.helper.str.singular(entity.extends) + ' ' : ' '
				lines.push(`export interface Qry${singular}${_extendsInterface}{`)
				for (const q in entity.properties) {
					const property = entity.properties[q]
					const type = property.enum ? property.enum : this.getType(property.type)
					lines.push(`\t${property.name}: ${type}`)
				}
				for (const q in entity.relations) {
					const relation = entity.relations[q]
					const relationEntity = source.entities.find(p => p.name === relation.entity) as Entity
					const relationEntitySingularName = this.helper.str.notation(relationEntity.singular ? relationEntity.singular : this.helper.str.singular(relationEntity.name), 'pascal')
					switch (relation.type) {
					case 'oneToMany':
						lines.push(`\t${relation.name}: Qry${relationEntitySingularName} & OneToMany<Qry${relationEntitySingularName}> & ${relationEntitySingularName}`)
						break
					case 'oneToOne':
						lines.push(`\t${relation.name}: Qry${relationEntitySingularName} & OneToOne<Qry${relationEntitySingularName}> & ${relationEntitySingularName}`)
						break
					case 'manyToOne':
						lines.push(`\t${relation.name}: ManyToOne<Qry${relationEntitySingularName}> & ${relationEntitySingularName}[]`)
						break
					}
				}
				lines.push('}')
			}
			for (const p in source.entities) {
				const entity = source.entities[p]
				if (!entity.abstract) {
					const singular = this.helper.str.notation(entity.singular ? entity.singular : this.helper.str.singular(entity.name), 'pascal')
					const entityName = this.helper.str.notation(entity.name, 'pascal')
					lines.push(`export let ${entityName}: Queryable<Qry${singular}>`)
				}
			}
		}
		return lines.join('\n') + '\n'
	}

	protected getType (type:string):string {
		switch (type) {
		case 'integer': return 'number'
		case 'decimal': return 'number'
		case 'dateTime': return 'Date'
		case 'date': return 'Date'
		case 'time': return 'Date'
		default: return type
		}
	}
}
