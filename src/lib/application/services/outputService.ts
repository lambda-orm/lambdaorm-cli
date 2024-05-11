import { JsonLight } from 'json-light'
import { ExecuteResult } from 'lambdaorm'
const yaml = require('js-yaml')

export class OutputService {
	public execute (result:any, type:string = 'json'): void {
		try {
			switch (type) {
			case 'json':
				console.log(JSON.stringify(result))
				break
			case 'light':
				console.log(JsonLight.compress(result))
				break
			case 'beautiful':
				console.log(JSON.stringify(result, null, 2))
				break
			case 'yaml':
				console.log(yaml.dump(result))
				break
			default:
				console.log(JSON.stringify(result))
				break
			}
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}

	public showExecuteResult (results:ExecuteResult[]) {
		if (!results || results.length === 0) {
			console.log('No results')
		} else {
			results.forEach((result) => {
				if (result.error) {
					console.error(`${result.description}: ${result.error.message}`)
				} else {
					console.log(result.description)
				}
			})
		}
	}
}
