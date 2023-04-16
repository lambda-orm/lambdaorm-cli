import { H3lp } from 'h3lp'
import path from 'path'
const Util = require('util')
const exec = Util.promisify(require('child_process').exec)

class CliHelper {
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
			const _data = helper.utils.tryParse(data as string)
			if (_data !== null) {
				data = _data
			} else {
				try {
					data = await helper.fs.read(path.join(process.cwd(), data as string))
					data = JSON.parse(data as string)
				} catch (error) {
					throw new Error(`Error to read context: ${error}`)
				}
			}
		}
		return data
	}
}

class Helper extends H3lp {
	public cli:CliHelper

	constructor () {
		super()
		this.cli = new CliHelper()
	}
}
export const helper = new Helper()
