/* eslint-disable no-use-before-define */
// THIS FILE IS NOT EDITABLE, IS MANAGED BY LAMBDA ORM
import { Queryable } from 'lambdaorm'
export abstract class Position {
	latitude?: string
	longitude?: string
}
export interface QryPosition {
	latitude: string
	longitude: string
}
export class Country extends Position {
	constructor () {
		super()
		this.states = []
	}

	name?: string
	iso3?: string
	iso2?: string
	capital?: string
	currency?: string
	region?: string
	subregion?: string
	states: State[]
}
export interface QryCountry extends QryPosition {
	name: string
	iso3: string
	iso2: string
	capital: string
	currency: string
	region: string
	subregion: string
	states: ManyToOne<State> & State[]
}
export class State extends Position {
	id?: number
	name?: string
	countryCode?: string
	country?: Country
}
export interface QryState extends QryPosition {
	id: number
	name: string
	countryCode: string
	country: Country & OneToMany<Country> & Country
}
export let Countries: Queryable<QryCountry>
export let States: Queryable<QryState>
