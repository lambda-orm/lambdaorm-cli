/* eslint-disable no-use-before-define */
// THIS FILE IS NOT EDITABLE, IS MANAGED BY LAMBDA ORM
import { Queryable } from 'lambdaorm'
export abstract class Location {
	id?: number
	parentId?: number
	name?: string
	code?: string
	capital?: string
	latitude?: string
	longitude?: string
}
export interface QryLocation {
	id: number
	parentId: number
	name: string
	code: string
	capital: string
	latitude: string
	longitude: string
}
export class Country extends Location {
	constructor () {
		super()
		this.states = []
	}

	states: State[]
}
export interface QryCountry extends QryLocation {
	states: ManyToOne<State> & State[]
}
export class State extends Location {
	constructor () {
		super()
		this.cities = []
	}

	country?: Country
	cities: City[]
}
export interface QryState extends QryLocation {
	country: Country & OneToMany<Country> & Country
	cities: ManyToOne<City> & City[]
}
export class City extends Location {
	state?: State
}
export interface QryCity extends QryLocation {
	state: State & OneToMany<State> & State
}
export let Locations: Queryable<QryLocation>
export let Countries: Queryable<QryCountry>
export let States: Queryable<QryState>
export let Cities: Queryable<QryCity>
