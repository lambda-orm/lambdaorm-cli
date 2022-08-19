# Execute

Execute an expression or return metadata information.

## Parameters

| parameter	| short | describe 																																						|
|-----------|-------|-------------------------------------------------------------------------------------|
|workspace	| -w 		| project path.																																				|
|stage			| -s 		| Name of stage																																				|
|query			| -q 		| Query expression																																		|
|data				| -d 		| Data used to execute expression																											|
|envfile		| -e 		| Read in a file of environment variables.																						|
|output			| -o 		| Generates an output with the information according to the following possible values |
|           |       | [sentence|model|parameters|constraints|metadata] but it does not apply 							|

## Examples

execute bulkInsert

```sh
lambdaorm execute -w lab/countries -e lab/countries/.env -q Countries.bulkInsert().include(p => p.states) -d ./lab/countries/countries.json
```

execute query

```sh
lambdaorm execute -w lab/countries -e lab/countries/.env -q "Countries.filter(p=>p.iso3=='AFG'||p.iso3=='ARG').include(p=> p.states)"
```

get sentence

```sh
lambdaorm execute -w lab/countries -e lab/countries/.env -q "Countries.filter(p=>p.iso3=='ARG').include(p=> p.states)" -o sentence
```

get parameters

```sh
lambdaorm execute -w lab/countries -e lab/countries/.env -q "Countries.filter(p=>p.iso3=='ARG').include(p=> p.states)" -o parameters
```

get model

```sh
lambdaorm execute -w lab/countries -e lab/countries/.env -q "Countries.filter(p=>p.iso3=='ARG').include(p=> p.states)" -o model
```

get constraints

```sh
lambdaorm execute -w lab/countries -e lab/countries/.env -q "Countries.bulkInsert().include(p=>p.states)" -o constraints
```

get all metadata

```sh
lambdaorm execute -w lab/countries -e lab/countries/.env -q "Countries.bulkInsert().include(p=>p.states)" -o metadata
```
