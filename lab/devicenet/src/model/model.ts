/* eslint-disable no-use-before-define */
// THIS FILE IS NOT EDITABLE, IS MANAGED BY LAMBDA ORM
import { Queryable } from 'lambdaorm'
export class Device {
	constructor () {
		this.components = []
		this.journeys = []
		this.files = []
	}

	id?: string
	name?: string
	password?: string
	type?: string
	brand?: string
	model?: string
	so?: string
	imei?: string
	imei2?: string
	mac?: string
	macBluetooth?: string
	ip?: string
	components: Component[]
	journeys: Journey[]
	files: File[]
}
export interface QryDevice {
	id: string
	name: string
	password: string
	type: string
	brand: string
	model: string
	so: string
	imei: string
	imei2: string
	mac: string
	macBluetooth: string
	ip: string
	components: ManyToOne<Component> & Component[]
	journeys: ManyToOne<Journey> & Journey[]
	files: ManyToOne<File> & File[]
}
export class Component {
	constructor () {
		this.files = []
	}

	id?: string
	name?: string
	type?: string
	brand?: string
	model?: string
	deviceId?: string
	device?: Device
	files: File[]
}
export interface QryComponent {
	id: string
	name: string
	type: string
	brand: string
	model: string
	deviceId: string
	device: Device & OneToMany<Device> & Device
	files: ManyToOne<File> & File[]
}
export class DeviceStatus {
	id?: number
	deviceId?: string
	journeyId?: number
	time?: Date
	latitude?: number
	longitude?: number
	altitude?: number
	cpu?: number
	cpuTemperature?: number
	batery?: number
	wifiSignal?: number
	device?: Device
	journey?: Journey
}
export interface QryDeviceStatus {
	id: number
	deviceId: string
	journeyId: number
	time: Date
	latitude: number
	longitude: number
	altitude: number
	cpu: number
	cpuTemperature: number
	batery: number
	wifiSignal: number
	device: Device & OneToMany<Device> & Device
	journey: Journey & OneToMany<Journey> & Journey
}
export class Journey {
	constructor () {
		this.statuses = []
	}

	id?: number
	deviceId?: string
	startId?: number
	endId?: number
	device?: Device
	start?: DeviceStatus
	end?: DeviceStatus
	statuses: DeviceStatus[]
}
export interface QryJourney {
	id: number
	deviceId: string
	startId: number
	endId: number
	device: Device & OneToMany<Device> & Device
	start: DeviceStatus & OneToMany<DeviceStatus> & DeviceStatus
	end: DeviceStatus & OneToMany<DeviceStatus> & DeviceStatus
	statuses: ManyToOne<DeviceStatus> & DeviceStatus[]
}
export class File {
	id?: string
	type?: string
	deviceId?: string
	componentId?: string
	start?: Date
	endId?: Date
	device?: Device
	component?: Component
}
export interface QryFile {
	id: string
	type: string
	deviceId: string
	componentId: string
	start: Date
	endId: Date
	device: Device & OneToMany<Device> & Device
	component: Component & OneToMany<Component> & Component
}
export class User {
	constructor () {
		this.members = []
	}

	id?: string
	firstname?: string
	lastname?: string
	email?: string
	members: GroupUser[]
}
export interface QryUser {
	id: string
	firstname: string
	lastname: string
	email: string
	members: ManyToOne<GroupUser> & GroupUser[]
}
export class Group {
	constructor () {
		this.members = []
		this.devices = []
	}

	id?: string
	name?: string
	members: GroupUser[]
	devices: GroupDevice[]
}
export interface QryGroup {
	id: string
	name: string
	members: ManyToOne<GroupUser> & GroupUser[]
	devices: ManyToOne<GroupDevice> & GroupDevice[]
}
export class GroupUser {
	id?: number
	userId?: string
	groupId?: string
	rol?: string
	group?: Group
	user?: User
}
export interface QryGroupUser {
	id: number
	userId: string
	groupId: string
	rol: string
	group: Group & OneToMany<Group> & Group
	user: User & OneToMany<User> & User
}
export class GroupDevice {
	id?: number
	deviceId?: string
	groupId?: string
	group?: Group
	device?: Device
}
export interface QryGroupDevice {
	id: number
	deviceId: string
	groupId: string
	group: Group & OneToMany<Group> & Group
	device: Device & OneToMany<Device> & Device
}
export let Devices: Queryable<QryDevice>
export let Components: Queryable<QryComponent>
export let DeviceStatuses: Queryable<QryDeviceStatus>
export let Journeys: Queryable<QryJourney>
export let Files: Queryable<QryFile>
export let Users: Queryable<QryUser>
export let Groups: Queryable<QryGroup>
export let GroupUsers: Queryable<QryGroupUser>
export let GroupDevices: Queryable<QryGroupDevice>
