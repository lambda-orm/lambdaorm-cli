import { H3lp, IUtils, IFsHelper } from 'h3lp'
import { Logger, OrmH3lp } from 'lambdaorm'
import path from 'path'
const Util = require('util')
const exec = Util.promisify(require('child_process').exec)
const yaml = require('js-yaml')

class CliHelper {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly utils:IUtils, private readonly fs:IFsHelper) {}

	public escapeShell (cmd:string) {
		return cmd.replace(/(["'$`\\])/g, '\\$1')
	}

	public async exec (cmd:string, cwd:string = __dirname) {
		const { stdout, stderr } = await exec(this.escapeShell(cmd), { cwd })
		if (stderr && stderr.toLocaleLowerCase().indexOf('error') > -1) {
			throw new Error(`command: ${cmd}  error: ${stderr}`)
		}
		return stdout
	}

	public async readData (data:any):Promise<any> {
		// read Data
		if (typeof data === 'string') {
			const _data = this.utils.tryParse(data as string)
			if (_data !== null) {
				data = _data
			} else {
				try {
					data = await this.fs.read(path.join(process.cwd(), data as string))
					data = JSON.parse(data as string)
				} catch (error) {
					throw new Error(`Error to read context: ${error}`)
				}
			}
		}
		return data
	}

	public async getPackage (name:string, workspace:string): Promise<string> {
		const exp = new RegExp(`${name}@(.*)\n`)
		const localNpmList = await this.exec('npm list --depth=0', workspace)
		const localMatches = localNpmList.match(exp)
		return (localMatches && localMatches[1] ? localMatches[1] : '').replace(/"invalid"/gi, '').trim()
	}

	public async writeSchema (configPath:string, schema: any): Promise<void> {
		if (path.extname(configPath) === '.yaml' || path.extname(configPath) === '.yml') {
			const content = yaml.dump(schema)
			await this.fs.write(configPath, content)
		} else if (path.extname(configPath) === '.json') {
			const content = JSON.stringify(schema, null, 2)
			await this.fs.write(configPath, content)
		} else {
			throw new Error(`Config file: ${configPath} not supported`)
		}
	}
}

export class Helper extends OrmH3lp {
	public cli:CliHelper
	constructor (h3lp: H3lp, logger: Logger) {
		super(h3lp, logger)
		this.cli = new CliHelper(h3lp.utils, h3lp.fs)
	}
}
