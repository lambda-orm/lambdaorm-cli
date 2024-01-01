import { CliFacade } from '../cli'

export class Schema {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:CliFacade) {}

	public async execute (workspace:string, path:string, output?:string, url?:string): Promise<void> {
		if (path === undefined) {
			console.error('the path argument is required')
			return
		}
		const orm = this.service.orm.create({ workspace, url })
		try {
			await orm.init()
			let result:any = null
			if (path === 'schema') {
				result = await orm.schema.schema()
			} else if (path === 'schema/version') {
				result = await orm.schema.version()
			} else if (path === 'domain') {
				result = await orm.schema.domain()
			} else if (path.startsWith('sources/')) {
				result = await orm.schema.source(path.replace('sources/', ''))
			} else if (path === 'entities') {
				result = await orm.schema.entities()
			} else if (path.startsWith('entities/')) {
				result = await orm.schema.entity(path.replace('entities/', ''))
			} else if (path === 'enums') {
				result = await orm.schema.enums()
			} else if (path.startsWith('enums/')) {
				result = await orm.schema.enum(path.replace('enums/', ''))
			} else if (path === 'mappings') {
				result = await orm.schema.mappings()
			} else if (path.startsWith('mappings/') && path.split('/').length === 2) {
				result = await orm.schema.mapping(path.replace('mappings/', ''))
			} else if (path.startsWith('mappings/') && path.split('/').length === 3) {
				const regex = /mappings\/([^\\/]+)\/([^\\/]+)/
				// Hacer coincidir la expresión regular con el string
				const coincidencias = path.match(regex)
				// Verificar si hay coincidencias y extraer los valores
				if (coincidencias) {
					const mapping = coincidencias[1]
					const entity = coincidencias[2]
					result = await orm.schema.entityMapping(mapping, entity)
				}
			} else if (path === 'stages') {
				result = await orm.schema.stages()
			} else if (path.startsWith('stages/')) {
				result = await orm.schema.stage(path.replace('stages/', ''))
			} else if (path === 'views') {
				result = await orm.schema.views()
			}
			if (result === undefined) {
				console.error(`the path ${path} is not valid`)
				return
			}
			this.service.output.execute(result, output)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
