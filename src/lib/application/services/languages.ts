import { LanguagePort } from '../../domain'
export class Languages {
	private readonly languages:LanguagePort[] = []
	constructor () {
		this.languages = []
	}

	public add (value:LanguagePort):void {
		this.languages.push(value)
	}

	public get (name = 'node'): LanguagePort {
		const languagePort = this.languages.find(p => p.name === name)
		if (languagePort === undefined) {
			throw new Error(`Language ${name} not found`)
		}
		return languagePort
	}
}
