import { Dialect, Orm, Schema, Entity } from 'lambdaorm'
import { h3lp } from 'h3lp'
import path from 'path'
const yaml = require('js-yaml')
const Util = require('util')
const exec = Util.promisify(require('child_process').exec)
export class Manager {
	private orm: Orm

	constructor (orm:Orm) {
		this.orm = orm
	}

	private escapeShell (cmd:string) {
		return cmd.replace(/(["'$`\\])/g, '\\$1')
	}

	private async exec (cmd:string, cwd:string = __dirname) {
		const { stdout, stderr } = await exec(this.escapeShell(cmd), { cwd })
		if (stderr && stderr.toLocaleLowerCase().indexOf('error') > -1) {
			throw new Error(`command: ${cmd}  error: ${stderr}`)
		}
		return stdout
	}

	public async createStructure (schema: Schema) {
		// create initial structure
		await h3lp.fs.create(path.join(this.orm.workspace, schema.app.paths.src))
		await h3lp.fs.create(path.join(this.orm.workspace, schema.app.paths.data))

		// if the sintaxis.d.ts does not exist create it
		const sintaxisPath = path.join(this.orm.workspace, schema.app.paths.src, 'sintaxis.d.ts')
		if (!await h3lp.fs.exists(sintaxisPath)) {
			await h3lp.fs.copy(path.join(__dirname, './sintaxis.d.ts'), sintaxisPath)
		}

		// if the package.json does not exist create it
		const packagePath = path.join(this.orm.workspace, 'package.json')
		if (!await h3lp.fs.exists(packagePath)) {
			await h3lp.fs.write(packagePath, JSON.stringify({ dependencies: {} }, null, 2))
		}

		// if there is no tsconfig.json create it
		const tsconfigPath = path.join(this.orm.workspace, 'tsconfig.json')
		if (!await h3lp.fs.exists(tsconfigPath)) {
			const tsconfigContent = this.getTypescriptContent()
			await h3lp.fs.write(tsconfigPath, JSON.stringify(tsconfigContent, null, 2))
		}

		// install typescript if not installed.
		const typescriptLib = await this.getLocalPackage('typescript', this.orm.workspace)
		if (typescriptLib === '') {
			await this.exec('npm install typescript -D', this.orm.workspace)
		}

		// install lambdaorm if it is not installed.
		const lambdaormLib = await this.getLocalPackage('lambdaorm', this.orm.workspace)
		if (lambdaormLib === '') {
			await this.exec('npm install lambdaorm', this.orm.workspace)
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
					await this.exec(`npm install ${lib}`, this.orm.workspace)
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
		const localNpmList = await this.exec('npm list --depth=0', workspace)
		const localMatches = localNpmList.match(exp)
		return (localMatches && localMatches[1] ? localMatches[1] : '').replace(/"invalid"/gi, '').trim()
	}

	public async getGlobalPackage (name:string): Promise<string> {
		const exp = new RegExp(`${name}@(.*)\n`)
		const globalNpmList = await this.exec('npm list -g --depth=0')
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

	public completeSchema (_schema: Schema, sourceName?: string, dialect?: string, connection?: any): Schema {
		const schema:Schema = h3lp.obj.clone(_schema)
		if (schema.model.entities === undefined) {
			schema.model.entities = []
		}
		if (schema.model.enums === undefined) {
			schema.model.enums = []
		}
		if (schema.data.sources === undefined) {
			schema.data.sources = []
		}
		let source:any
		if (sourceName !== undefined) {
			source = schema.data.sources.find(p => p.name === sourceName)
			if (source === undefined) {
				throw Error(`source ${sourceName} not found`)
			}
		} else if (schema.data.sources.length === 1) {
			source = schema.data.sources[0]
		} else {
			// If the database is not defined, it creates it.
			if (connection === undefined) {
				connection = this.defaultConnection(dialect || Dialect.MySQL)
			}
			source = { name: 'test', dialect: dialect || Dialect.MySQL, mapping: source, connection }
			schema.data.sources.push(source)
		}
		// if database is defined, update dialect if applicable
		if ((dialect !== undefined && source.dialect !== dialect) || (source.dialect === undefined)) {
			source.dialect = dialect || Dialect.MySQL
		}
		// update the connection if applicable
		if (connection !== undefined) {
			source.connection = connection
		} else if (source.connection === undefined) {
			source.connection = this.defaultConnection(source.dialect)
		}
		// set the mapping if it was not set
		if (schema.data.mappings === undefined) {
			schema.data.mappings = []
		}
		if (source.mapping === undefined) {
			if (schema.data.mappings.length > 0) {
				source.mapping = schema.data.mappings[0].name
			} else {
				source.mapping = source.name
			}
		}
		// if the mapping does not exist it creates it
		const mapping = schema.data.mappings.find(p => p.name === source.mapping)
		if (mapping === undefined) {
			schema.data.mappings.push({ name: source.mapping, entities: [] })
		}
		// if the stage does not exist, create it
		if (schema.stages === undefined) {
			schema.stages = []
		}
		if (schema.stages.length === 0) {
			schema.stages.push({ name: 'default', sources: [{ name: source.name }] })
		}
		return schema
	}

	public defaultConnection (dialect: string): any {
		switch (dialect) {
		case Dialect.MySQL:
			return {
				host: 'localhost',
				port: 3306,
				user: 'test',
				password: 'test',
				database: 'test',
				multipleStatements: true,
				waitForConnections: true,
				connectionLimit: 10,
				queueLimit: 0
			}
		case Dialect.MariaDB:
			return {
				host: 'localhost',
				port: 3306,
				user: 'test',
				password: 'test',
				database: 'test',
				multipleStatements: true,
				waitForConnections: true,
				connectionLimit: 10,
				queueLimit: 0
			}
		// case 'sqlite':
		// return {
		// database: 'database.sqlite'
		// }
		// case 'better-sqlite3':
		// return {
		// database: 'database.sqlite'
		// }
		case Dialect.PostgreSQL:
			return {
				host: 'localhost',
				port: 5432,
				username: 'test',
				password: 'test',
				database: 'test'
			}
		case Dialect.SqlServer:
			return {
				// host: 'localhost',
				// username: 'sa',
				// password: 'Admin12345',
				// database: 'tempDb',
				server: 'localhost',
				authentication: { type: 'default', options: { userName: 'sa', password: 'Admin12345' } },
				options: { encrypt: false, database: 'tempDb' }
			}
		case Dialect.Oracle:
			return {
				host: 'localhost',
				username: 'system',
				password: 'oracle',
				port: 1521,
				sid: 'xe.oracle.docker'
			}
		case Dialect.MongoDB:
			return {
				url: 'mongodb://@localhost:27017',
				database: 'test'
			}
		default:
			throw new Error(`dialect: ${dialect} not supported`)
		}
	}

	public async writeSchema (configPath:string, schema: Schema): Promise<void> {
		if (path.extname(configPath) === '.yaml' || path.extname(configPath) === '.yml') {
			const content = yaml.dump(schema)
			await h3lp.fs.write(configPath, content)
		} else if (path.extname(configPath) === '.json') {
			const content = JSON.stringify(schema, null, 2)
			await h3lp.fs.write(configPath, content)
		} else {
			throw new Error(`Config file: ${configPath} not supported`)
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
		h3lp.fs.create(modelsPath)
		const schemaPath = path.join(modelsPath, 'model.ts')
		references.push('model')
		await h3lp.fs.write(schemaPath, content)
		for (const q in schema.model.entities) {
			const entity = schema.model.entities[q]
			if (entity.abstract) continue
			const singular = entity.singular ? entity.singular : h3lp.str.singular(entity.name)
			const repositoryPath = path.join(modelsPath, `repository${singular}.ts`)
			references.push(`repository${singular}`)
			if (!await h3lp.fs.exists(repositoryPath)) {
				const repositoryContent = this.getRepositoryContent(entity)
				await h3lp.fs.write(repositoryPath, repositoryContent)
			}
		}
		const lines:string[] = []
		for (const p in references) {
			const reference = references[p]
			lines.push(`export * from './${reference}'`)
		}
		await h3lp.fs.write(path.join(modelsPath, 'index.ts'), lines.join('\n') + '\n')
	}

	public async readData (data:any):Promise<any> {
		// read Data
		if (typeof data === 'string') {
			const _data = h3lp.utils.tryParse(data as string)
			if (_data !== null) {
				data = _data
			} else {
				try {
					data = await h3lp.fs.read(path.join(process.cwd(), data as string))
					data = JSON.parse(data as string)
				} catch (error) {
					throw new Error(`Error to read context: ${error}`)
				}
			}
		}
		return data
	}

	private getRepositoryContent (entity: Entity): string {
		const lines: string[] = []
		const singular = entity.singular ? entity.singular : h3lp.str.singular(entity.name)
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
				const singular = entity.singular ? entity.singular : h3lp.str.singular(entity.name)
				const _abstract = entity.abstract ? ' abstract ' : ' '
				const _extends = entity.extends ? ' extends ' + h3lp.str.singular(entity.extends) + ' ' : ' '

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
					const relationEntitySingularName = relationEntity.singular ? relationEntity.singular : h3lp.str.singular(relationEntity.name)
					// const relationEntity = h3lp.singular(relation.entity)
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
				const _extendsInterface = entity.extends ? ' extends Qry' + h3lp.str.singular(entity.extends) + ' ' : ' '
				lines.push(`export interface Qry${singular}${_extendsInterface}{`)
				for (const q in entity.properties) {
					const property = entity.properties[q]
					const type = property.enum ? property.enum : this.getType(property.type)
					lines.push(`\t${property.name}: ${type}`)
				}
				for (const q in entity.relations) {
					const relation = entity.relations[q]
					const relationEntity = source.model.entities.find(p => p.name === relation.entity) as Entity
					const relationEntitySingularName = relationEntity.singular ? relationEntity.singular : h3lp.str.singular(relationEntity.name)
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
					const singular = entity.singular ? entity.singular : h3lp.str.singular(entity.name)
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
