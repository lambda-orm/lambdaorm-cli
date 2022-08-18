import { Dialect, Orm, Helper, Schema, Entity } from 'lambdaorm'
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
		const { stdout, stderr } = await exec(this.escapeShell(cmd), { cwd: cwd })
		if (stderr && stderr.toLocaleLowerCase().indexOf('error') > -1) {
			throw new Error(`command: ${cmd}  error: ${stderr}`)
		}
		return stdout
	}

	public async createStructure (schema: Schema) {
		// create initial structure
		await Helper.createIfNotExists(path.join(this.orm.workspace, schema.app.src))
		await Helper.createIfNotExists(path.join(this.orm.workspace, schema.app.data))

		// if the sintaxis.d.ts does not exist create it
		const sintaxisPath = path.join(this.orm.workspace, schema.app.src, 'sintaxis.d.ts')
		if (!await Helper.existsPath(sintaxisPath)) {
			await Helper.copyFile(path.join(__dirname, './sintaxis.d.ts'), sintaxisPath)
		}

		// if the package.json does not exist create it
		const packagePath = path.join(this.orm.workspace, 'package.json')
		if (!await Helper.existsPath(packagePath)) {
			await Helper.writeFile(packagePath, JSON.stringify({ dependencies: {} }, null, 2))
		}

		// if there is no tsconfig.json create it
		const tsconfigPath = path.join(this.orm.workspace, 'tsconfig.json')
		if (!await Helper.existsPath(tsconfigPath)) {
			const tsconfigContent = this.getTypescriptContent()
			await Helper.writeFile(tsconfigPath, JSON.stringify(tsconfigContent, null, 2))
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
		for (const p in schema.dataSources) {
			const dataSource = schema.dataSources[p]
			// if the library is not installed locally corresponding to the dialect it will be installed
			const libs = this.getLibs(dataSource.dialect)
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

	public completeSchema (source: Schema, dataSource: string, dialect?: string, connection?: any): Schema {
		const target:Schema = Helper.clone(source)
		if (target.entities === undefined) {
			target.entities = []
		}
		if (target.enums === undefined) {
			target.enums = []
		}
		if (target.dataSources === undefined) {
			target.dataSources = []
		}
		let ds = target.dataSources.find(p => p.name === dataSource)
		if (ds === undefined) {
			// si la base de datos no esta definida la crea
			if (connection === undefined) {
				connection = this.defaultConnection(dialect || 'mysql')
			}
			ds = { name: dataSource, dialect: dialect || 'mysql', mapping: dataSource, connection: connection }
			target.dataSources.push(ds)
		} else {
			// if database is defined, update dialect if applicable
			if ((dialect !== undefined && ds.dialect !== dialect) || (ds.dialect === undefined)) {
				ds.dialect = dialect || 'mysql'
			}
			// update the connection if applicable
			if (connection !== undefined) {
				ds.connection = connection
			} else if (ds.connection === undefined) {
				ds.connection = this.defaultConnection(ds.dialect)
			}
			// set the mapping if it was not set
			if (ds.mapping === undefined) {
				ds.mapping = ds.name
			}
		}
		// si no existe el mapping lo crea
		if (target.mappings === undefined) {
			target.mappings = []
		}
		const mapping = target.mappings.find(p => p.name === ds?.mapping)
		if (mapping === undefined) {
			target.mappings.push({ name: ds?.mapping, entities: [] })
		}

		// si no existe el mapping lo crea
		if (target.stages === undefined) {
			target.stages = []
		}
		if (target.stages.length === 0) {
			target.stages.push({ name: 'default', dataSources: [{ name: ds.name }] })
		}
		return target
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
			await Helper.writeFile(configPath, content)
		} else if (path.extname(configPath) === '.json') {
			const content = JSON.stringify(schema, null, 2)
			await Helper.writeFile(configPath, content)
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
		const modelsPath = path.join(this.orm.workspace, schema.app.src, schema.app.model)
		Helper.createIfNotExists(modelsPath)
		const schemaPath = path.join(modelsPath, 'model.ts')
		references.push('model')
		await Helper.writeFile(schemaPath, content)
		for (const q in schema.entities) {
			const entity = schema.entities[q]
			if (entity.abstract) continue
			const singular = entity.singular ? entity.singular : Helper.singular(entity.name)
			const repositoryPath = path.join(modelsPath, `repository${singular}.ts`)
			references.push(`repository${singular}`)
			if (!await Helper.existsPath(repositoryPath)) {
				const repositoryContent = this.getRepositoryContent(entity)
				await Helper.writeFile(repositoryPath, repositoryContent)
			}
		}
		const lines:string[] = []
		for (const p in references) {
			const reference = references[p]
			lines.push(`export * from './${reference}'`)
		}
		await Helper.writeFile(path.join(modelsPath, 'index.ts'), lines.join('\n') + '\n')
	}

	public async readData (data:any):Promise<any> {
		// read Data
		if (typeof data === 'string') {
			const _data = Helper.tryParse(data as string)
			if (_data !== null) {
				data = _data
			} else {
				try {
					data = await Helper.readFile(path.join(process.cwd(), data as string))
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
		const singular = entity.singular ? entity.singular : Helper.singular(entity.name)
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
			for (const p in source.entities) {
				const entity = source.entities[p]
				const singular = entity.singular ? entity.singular : Helper.singular(entity.name)
				const _abstract = entity.abstract ? ' abstract ' : ' '
				const _extends = entity.extends ? ' extends ' + Helper.singular(entity.extends) + ' ' : ' '

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
					const type = property.enum ? property.enum : Helper.tsType(property.type)
					if (property.nullable === false && property.default === undefined) {
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
					const relationEntitySingularName = relationEntity.singular ? relationEntity.singular : Helper.singular(relationEntity.name)
					// const relationEntity = Helper.singular(relation.entity)
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
				const _extendsInterface = entity.extends ? ' extends Qry' + Helper.singular(entity.extends) + ' ' : ' '
				lines.push(`export interface Qry${singular}${_extendsInterface}{`)
				for (const q in entity.properties) {
					const property = entity.properties[q]
					const type = property.enum ? property.enum : Helper.tsType(property.type)
					lines.push(`\t${property.name}: ${type}`)
				}
				for (const q in entity.relations) {
					const relation = entity.relations[q]
					const relationEntity = source.entities.find(p => p.name === relation.entity) as Entity
					const relationEntitySingularName = relationEntity.singular ? relationEntity.singular : Helper.singular(relationEntity.name)
					// const relationEntity = Helper.singular(relation.entity)
					switch (relation.type) {
					case 'oneToMany':
						lines.push(`\t${relation.name}: ${relationEntitySingularName} & OneToMany<${relationEntitySingularName}> & ${relationEntitySingularName}`)
						break
					case 'oneToOne':
						lines.push(`\t${relation.name}: ${relationEntitySingularName} & OneToOne<${relationEntitySingularName}> & ${relationEntitySingularName}`)
						break
					case 'manyToOne':
						lines.push(`\t${relation.name}: ManyToOne<${relationEntitySingularName}> & ${relationEntitySingularName}[]`)
						break
					}
				}
				lines.push('}')
			}
			for (const p in source.entities) {
				const entity = source.entities[p]
				if (!entity.abstract) {
					const singular = entity.singular ? entity.singular : Helper.singular(entity.name)
					lines.push(`export let ${entity.name}: Queryable<Qry${singular}>`)
				}
			}
		}
		return lines.join('\n') + '\n'
	}
}
