# Export

Export data from a database.

## Params

| parameter	| short | describe 																	|
|-----------|-------|-------------------------------------------|
|workspace	| -w 		| project path.															|
|stage			| -s 		| Name of stage															|
|envfile		| -e 		| Read in a file of environment variables.	|
|target			| -t 		| Destination file with export data.				|

## Example

```sh
lambdaorm export -w lab/countries -e lab/countries/.env -t ./lab/countries/data
```
