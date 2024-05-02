import { H3lp, IUtils, IFsHelper } from 'h3lp'
import { Logger, OrmH3lp } from 'lambdaorm'
import path from 'path'

class CliHelper {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly utils:IUtils, private readonly fs:IFsHelper) {}

	public async readData (data:any):Promise<any> {
		// read Data
		if (typeof data === 'string') {
			const _data = this.utils.tryParse(data as string)
			if (_data !== null) {
				return _data
			} else {
				try {
					const strData = await this.fs.read(path.join(process.cwd(), data as string))
					return JSON.parse(strData as string)
				} catch (error) {
					throw new Error(`Error to read context: ${error}`)
				}
			}
		}
	}

	public nameFromFile (filePath:string):string {
		const parsedPath = path.parse(filePath)
		return parsedPath.name
	}

	public async getPackage (name:string, workspace:string): Promise<string> {
		const exp = new RegExp(`${name}@(.*)\n`)
		const localNpmList = await this.utils.exec('npm list --depth=0', workspace)
		const localMatches = localNpmList.match(exp)
		return (localMatches && localMatches[1] ? localMatches[1] : '').replace(/"invalid"/gi, '').trim()
	}
}

export class OrmCliH3lp extends OrmH3lp {
	public cli:CliHelper
	constructor (h3lp: H3lp, logger: Logger) {
		super(h3lp, logger)
		this.cli = new CliHelper(h3lp.utils, h3lp.fs)
	}
}
