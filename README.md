# Lambda ORM

**IMPORTANT: the library is in an Alpha version!!!**

## Installation

Install the package globally to use the CLI commands to help you create and maintain projects

```sh
npm install lambdaorm-cli -g
```

## CLI

|Command    	|Description                                   									  |																																								|
|:------------|:----------------------------------------------------------------|:-----------------------------------------------------------------------------:|
|	version	 		| Prints lambdaorm version this project uses.											|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/cli-version)		|
|	init				| Generates lambdaorm project structure.													|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/cli-init)				|
|	update			| update model, packages and project structure.										|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/cli-update)			|
|	sync				|	Syncronize database.																						|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/cli-sync)				|
|	run					| Run an expression lambda or return information									|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/cli-run)				|
|	export			| Export data from a database 																		|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/cli-export)			|
|	import			| Import data from file to database																|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/cli-import)			|
|	drop				|	Removes all database objects but not the database.							|[more info](https://github.com/FlavioLionelRita/lambdaorm/wiki/cli-drop)				|

## Documentation

- [lambdaorm cli wiki](https://github.com/FlavioLionelRita/lambdaorm-cli/wiki)
- [lambdaorm wiki](https://github.com/FlavioLionelRita/lambdaorm/wiki)
- [lambdaorm](https://github.com/FlavioLionelRita/lambdaorm)

## Labs

### Lab 01

In this laboratory we will see:

- How to use the Lambdaorm-cli commands
- how to create a project that uses lambda ORM
- How to define a schema
- how to run a bulckInsert from a file
- how to export data from a schema
- how to import data into a schema from a previously generated export file

[source code](https://github.com/FlavioLionelRita/lambdaorm-lab01)

### Lab 02

In this laboratory we will see:

- how to create a project that uses lambda ORM
- How to define a schema
- how to extend entities using abstract entities
- How to insert data from a file.
- how to run queries from cli to perform different types of queries

[source code](https://github.com/FlavioLionelRita/lambdaorm-lab02)

### Lab 03

In this laboratory we will see:

- How to insert data from a file to more than one table.
- how to extend entities using abstract entities
- how to extend a schema to create a new one, overwriting the mapping
- how to work with two schemas and databases that share the same model
- how to use imported data from one database to import it into another

[source code](https://github.com/FlavioLionelRita/lambdaorm-lab03)

### Lab 04

In this laboratory we will see:

- How to insert data from a file to more than one table.
- how to extend entities using abstract entities
- how to define a schema that works with entities in different databases
- how to run a bulkinsert on entities in different databases
- how to export and import entity data in different databases

[source code](https://github.com/FlavioLionelRita/lambdaorm-lab04)
