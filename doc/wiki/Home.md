# λORM CLI

λORM CLI is a command line application to use [λORM](https://www.npmjs.com/package/lambdaorm)

## Installation

Install the package globally to use the CLI commands to help you create and maintain projects

```sh
npm install lambdaorm-cli -g
```

## CLI

| Command    	| Description                                  									  		|
|:------------|:--------------------------------------------------------------------|
|	version	 		| Prints lambdaorm version this project uses.													|
|	init				| Generates lambdaorm project structure.															|
|	sync				|	Synchronize database.																								|
|	import			| Import data from file to database.																	|
|	export			| Export data from a database. 																				|
|	execute			| Execute an expression lambda.																				|
| metadata		|	Return metadata of query expression.																|
| parameters	|	Return parameters of query expression.															|
| model				|	Return model of query expression.																		|
| plan				|	Return plan execution of query expression.													|
|	build				| add configuration, model and repositories according to the language.|
|	drop				|	Removes all database objects but not the database.									|

## Documentation

Full documentation is available in the [Wiki](https://github.com/FlavioLionelRita/lambdaorm-cli/wiki).

## Related projects

- [Lambda ORM](https://github.com/FlavioLionelRita/lambdaorm)
- [Lambda ORM Service](https://github.com/FlavioLionelRita/lambdaorm-cvs)
- [Node Client](https://github.com/FlavioLionelRita/lambdaorm-client-node)
- [Kotlin Client](https://github.com/FlavioLionelRita/lambdaorm-client-kotlin)

## Labs

You can access various labs at [github.com/FlavioLionelRita/lambdaorm-labs](https://github.com/FlavioLionelRita/lambdaorm-labs)
