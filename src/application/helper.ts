import { H3lp, IUtils, IFsHelper } from 'h3lp'
import path from 'path'
const Util = require('util')
const exec = Util.promisify(require('child_process').exec)

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
}

export class Helper extends H3lp {
	public cli:CliHelper
	constructor (h3lp: H3lp) {
		super(h3lp.utils, h3lp.val, h3lp.fs, h3lp.http, h3lp.obj, h3lp.str, h3lp.test, h3lp.array)
		this.cli = new CliHelper(h3lp.utils, h3lp.fs)
	}
}
