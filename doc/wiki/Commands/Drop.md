# Drop

Removes all database objects but not the database.

## Params

| parameter	| short | describe 																																		|
|-----------|-------|-----------------------------------------------------------------------------|
|workspace	| -w 		| project path.																																|
|stage			| -s 		| Name of stage																																|
|envfile		| -e 		| Read in a file of environment variables.																		|
|output			| -o 		| Generates the queries but does not apply																		|
|force			| -f 		| If there is an error in a statement, continue executing the next statements	|
|url				| -u 		| When working with a client you must pass the url of the service							|

## Example

```sh
lambdaorm drop -w lab/countries -e lab/countries/.env
```
