import { Dialect, Schema, Entity } from 'lambdaorm'
import { Helper } from '../../application'
import { LanguagePort } from '../../domain'
import path from 'path'

export class NodeLanguageAdapter implements LanguagePort {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly helper:Helper) {}

	public get name (): string {
		return 'node'
	}
	// eslint-disable-next-line no-useless-constructor

	public async createStructure (workspace:string, schema: Schema): Promise<void> {
		// create initial structure
		await this.helper.fs.create(path.join(workspace, schema.infrastructure.paths.src))
		await this.helper.fs.create(path.join(workspace, schema.infrastructure.paths.data))

		// if the package.json does not exist create it
		const packagePath = path.join(workspace, 'package.json')
		if (!await this.helper.fs.exists(packagePath)) {
			await this.helper.fs.write(packagePath, JSON.stringify({ dependencies: {} }, null, 2))
		}

		// if there is no tsconfig.json create it
		const tsconfigPath = path.join(workspace, 'tsconfig.json')
		if (!await this.helper.fs.exists(tsconfigPath)) {
			const tsconfigContent = this.getTypescriptContent()
			await this.helper.fs.write(tsconfigPath, JSON.stringify(tsconfigContent, null, 2))
		}

		// install typescript if not installed.
		const typescriptLib = await this.getLocalPackage('typescript', workspace)
		if (typescriptLib === '') {
			await this.helper.cli.exec('npm install typescript -D', workspace)
		}

		// install lambdaorm if it is not installed.
		const lambdaormLib = await this.getLocalPackage('lambdaorm', workspace)
		if (lambdaormLib === '') {
			await this.helper.cli.exec('npm install lambdaorm', workspace)
		}
	}

	public async addDialects (workspace:string, schema: Schema) : Promise<void> {
		for (const p in schema.infrastructure.sources) {
			const source = schema.infrastructure.sources[p]
			// if the library is not installed locally corresponding to the dialect it will be installed
			const libs = this.getLibs(source.dialect)
			for (const p in libs) {
				const lib = libs[p]
				const localLib = await this.getLocalPackage(lib, workspace)
				if (localLib === '') {
					await this.helper.cli.exec(`npm install ${lib}`, workspace)
				}
			}
		}
	}

	public async localVersion (workspace:string): Promise<string> {
		return await this.getLocalPackage('lambdaorm', workspace)
	}

	public async buildModel (workspace:string, schema: Schema) : Promise<void> {
		const content = this.getModelContent(schema)
		const modelsPath = path.join(workspace, schema.infrastructure.paths.src, schema.infrastructure.paths.domain)
		this.helper.fs.create(modelsPath)
		const schemaPath = path.join(modelsPath, 'model.ts')
		await this.helper.fs.write(schemaPath, content)
	}

	public async buildRepositories (workspace:string, schema: Schema): Promise<void> {
		const modelsPath = path.join(workspace, schema.infrastructure.paths.src, schema.infrastructure.paths.domain)
		this.helper.fs.create(modelsPath)
		for (const q in schema.domain.entities) {
			const entity = schema.domain.entities[q]
			if (entity.abstract) continue
			const singular = entity.singular ? entity.singular : this.helper.str.singular(entity.name)
			const repositoryPath = path.join(modelsPath, `repository${singular}.ts`)

			if (!await this.helper.fs.exists(repositoryPath)) {
				const repositoryContent = this.getRepositoryContent(entity)
				await this.helper.fs.write(repositoryPath, repositoryContent)
			}
		}
	}

	private async getLocalPackage (name:string, workspace:string): Promise<string> {
		const exp = new RegExp(`${name}@(.*)\n`)
		const localNpmList = await this.helper.cli.exec('npm list --depth=0', workspace)
		const localMatches = localNpmList.match(exp)
		return (localMatches && localMatches[1] ? localMatches[1] : '').replace(/"invalid"/gi, '').trim()
	}

	private getLibs (dialect: string): string[] {
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

	private getTypescriptContent () {
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

	private getRepositoryContent (entity: Entity): string {
		const lines: string[] = []
		const singular = entity.singular ? entity.singular : this.helper.str.singular(entity.name)
		lines.push('import { Repository, IOrm } from \'lambdaorm\'')
		lines.push(`import { ${singular}, Qry${singular} } from './model'`)
		lines.push(`export class ${singular}Repository extends Repository<${singular}, Qry${singular}> {`)
		lines.push('\tconstructor (stage?: string, Orm?:IOrm) {')
		lines.push(`\t\tsuper('${entity.name}', stage, Orm)`)
		lines.push('\t}')
		lines.push('\t// Add your code here')
		lines.push('}')
		return lines.join('\n') + '\n'
	}

	private getModelContent (source:Schema):string {
		const lines: string[] = []
		lines.push('/* eslint-disable no-use-before-define */')
		lines.push('// THIS FILE IS NOT EDITABLE, IS MANAGED BY LAMBDA ORM')
		lines.push('import { Queryable, OneToMany, ManyToOne, OneToOne } from \'lambdaorm\'')

		if (source.domain.enums) {
			for (const p in source.domain.enums) {
				const _enum = source.domain.enums[p]
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

		if (source.domain.entities) {
			for (const p in source.domain.entities) {
				const entity = source.domain.entities[p]
				const singular = entity.singular ? entity.singular : this.helper.str.singular(entity.name)
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
					const relationEntity = source.domain.entities.find(p => p.name === relation.entity) as Entity
					if (relationEntity === undefined) {
						throw new Error(`Not exists ${relation.entity} relation in ${entity.name} entity`)
					}
					const relationEntitySingularName = relationEntity.singular ? relationEntity.singular : this.helper.str.singular(relationEntity.name)
					// const relationEntity = helper.singular(relation.entity)
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
					const relationEntity = source.domain.entities.find(p => p.name === relation.entity) as Entity
					const relationEntitySingularName = relationEntity.singular ? relationEntity.singular : this.helper.str.singular(relationEntity.name)
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
			for (const p in source.domain.entities) {
				const entity = source.domain.entities[p]
				if (!entity.abstract) {
					const singular = entity.singular ? entity.singular : this.helper.str.singular(entity.name)
					lines.push(`export let ${entity.name}: Queryable<Qry${singular}>`)
				}
			}
		}
		return lines.join('\n') + '\n'
	}

	private getType (type:string):string {
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
