import { Dialect, Orm, Schema, Entity } from 'lambdaorm'
import { helper } from './helper'
import path from 'path'
export class Manager {
	private orm: Orm

	constructor (orm:Orm) {
		this.orm = orm
	}

	public async createStructure (schema: Schema) {
		// create initial structure
		await helper.fs.create(path.join(this.orm.workspace, schema.app.paths.src))
		await helper.fs.create(path.join(this.orm.workspace, schema.app.paths.data))

		// if the sintaxis.d.ts does not exist create it
		const sintaxisPath = path.join(this.orm.workspace, schema.app.paths.src, 'sintaxis.d.ts')
		if (!await helper.fs.exists(sintaxisPath)) {
			await helper.fs.copy(path.join(__dirname, './../domain/sintaxis.d.ts'), sintaxisPath)
		}

		// if the package.json does not exist create it
		const packagePath = path.join(this.orm.workspace, 'package.json')
		if (!await helper.fs.exists(packagePath)) {
			await helper.fs.write(packagePath, JSON.stringify({ dependencies: {} }, null, 2))
		}

		// if there is no tsconfig.json create it
		const tsconfigPath = path.join(this.orm.workspace, 'tsconfig.json')
		if (!await helper.fs.exists(tsconfigPath)) {
			const tsconfigContent = this.getTypescriptContent()
			await helper.fs.write(tsconfigPath, JSON.stringify(tsconfigContent, null, 2))
		}

		// install typescript if not installed.
		const typescriptLib = await this.getLocalPackage('typescript', this.orm.workspace)
		if (typescriptLib === '') {
			await helper.cli.exec('npm install typescript -D', this.orm.workspace)
		}

		// install lambdaorm if it is not installed.
		const lambdaormLib = await this.getLocalPackage('lambdaorm', this.orm.workspace)
		if (lambdaormLib === '') {
			await helper.cli.exec('npm install lambdaorm', this.orm.workspace)
		}
	}

	public async addDialects (schema: Schema) {
		for (const p in schema.data.sources) {
			const source = schema.data.sources[p]
			// if the library is not installed locally corresponding to the dialect it will be installed
			const libs = this.getLibs(source.dialect)
			for (const p in libs) {
				const lib = libs[p]
				const localLib = await this.getLocalPackage(lib, this.orm.workspace)
				if (localLib === '') {
					await helper.cli.exec(`npm install ${lib}`, this.orm.workspace)
				}
			}
		}
	}

	public getLibs (dialect: string): string[] {
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

	public async getLocalPackage (name:string, workspace:string): Promise<string> {
		const exp = new RegExp(`${name}@(.*)\n`)
		const localNpmList = await helper.cli.exec('npm list --depth=0', workspace)
		const localMatches = localNpmList.match(exp)
		return (localMatches && localMatches[1] ? localMatches[1] : '').replace(/"invalid"/gi, '').trim()
	}

	public async getGlobalPackage (name:string): Promise<string> {
		const exp = new RegExp(`${name}@(.*)\n`)
		const globalNpmList = await helper.cli.exec('npm list -g --depth=0')
		const globalMatches = globalNpmList.match(exp)
		return (globalMatches && globalMatches[1] ? globalMatches[1] : '').replace(/"invalid"/gi, '').trim()
	}

	public getTypescriptContent () {
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

	public async writeModel (schema: Schema) {
		// TODO cambiar por complete dado que el modelo se debe escribir sin extenderlo
		this.orm.schema.complete(schema)
		// for (const p in schemas) {
		// const references: string[] = []
		// const schema = schemas[p] as Schema
		const references: string[] = []
		const content = this.getModelContent(schema)
		const modelsPath = path.join(this.orm.workspace, schema.app.paths.src, schema.app.paths.model)
		helper.fs.create(modelsPath)
		const schemaPath = path.join(modelsPath, 'model.ts')
		references.push('model')
		await helper.fs.write(schemaPath, content)
		for (const q in schema.model.entities) {
			const entity = schema.model.entities[q]
			if (entity.abstract) continue
			const singular = entity.singular ? entity.singular : helper.str.singular(entity.name)
			const repositoryPath = path.join(modelsPath, `repository${singular}.ts`)
			references.push(`repository${singular}`)
			if (!await helper.fs.exists(repositoryPath)) {
				const repositoryContent = this.getRepositoryContent(entity)
				await helper.fs.write(repositoryPath, repositoryContent)
			}
		}
		const lines:string[] = []
		for (const p in references) {
			const reference = references[p]
			lines.push(`export * from './${reference}'`)
		}
		await helper.fs.write(path.join(modelsPath, 'index.ts'), lines.join('\n') + '\n')
	}

	private getRepositoryContent (entity: Entity): string {
		const lines: string[] = []
		const singular = entity.singular ? entity.singular : helper.str.singular(entity.name)
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
		lines.push('import { Queryable } from \'lambdaorm\'')

		if (source.model.enums) {
			for (const p in source.model.enums) {
				const _enum = source.model.enums[p]
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

		if (source.model.entities) {
			for (const p in source.model.entities) {
				const entity = source.model.entities[p]
				const singular = entity.singular ? entity.singular : helper.str.singular(entity.name)
				const _abstract = entity.abstract ? ' abstract ' : ' '
				const _extends = entity.extends ? ' extends ' + helper.str.singular(entity.extends) + ' ' : ' '

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
					const relationEntity = source.model.entities.find(p => p.name === relation.entity) as Entity
					if (relationEntity === undefined) {
						throw new Error(`Not exists ${relation.entity} relation in ${entity.name} entity`)
					}
					const relationEntitySingularName = relationEntity.singular ? relationEntity.singular : helper.str.singular(relationEntity.name)
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
				const _extendsInterface = entity.extends ? ' extends Qry' + helper.str.singular(entity.extends) + ' ' : ' '
				lines.push(`export interface Qry${singular}${_extendsInterface}{`)
				for (const q in entity.properties) {
					const property = entity.properties[q]
					const type = property.enum ? property.enum : this.getType(property.type)
					lines.push(`\t${property.name}: ${type}`)
				}
				for (const q in entity.relations) {
					const relation = entity.relations[q]
					const relationEntity = source.model.entities.find(p => p.name === relation.entity) as Entity
					const relationEntitySingularName = relationEntity.singular ? relationEntity.singular : helper.str.singular(relationEntity.name)
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
			for (const p in source.model.entities) {
				const entity = source.model.entities[p]
				if (!entity.abstract) {
					const singular = entity.singular ? entity.singular : helper.str.singular(entity.name)
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
