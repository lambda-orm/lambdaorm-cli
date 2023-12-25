import { LanguageService } from '../ports/language'
export class Languages {
	private readonly languages:LanguageService[] = []
	constructor () {
		this.languages = []
	}

	public add (value:LanguageService):void {
		this.languages.push(value)
	}

	public get (name = 'node'): LanguageService {
		const language = this.languages.find(p => p.name === name)
		if (language === undefined) {
			throw new Error(`Language ${name} not found`)
		}
		return language
	}
}
