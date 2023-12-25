import { BuildArgs } from './orm'
export interface LanguageService {
	get name():string
	build (args:BuildArgs): Promise<void>
	localVersion (workspace:string): Promise<string>
}
