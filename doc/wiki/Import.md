# Import

Import data from file to database.

## Parameters

| parameter	| short | describe 																	|
|-----------|-------|-------------------------------------------|
|workspace	| -w 		| project path.															|
|stage			| -s 		| Name of stage															|
|envfile		| -e 		| Read in a file of environment variables.	|
|data				| -d 		| Data file to import.											|

## Example

```sh
lambdaorm import -w lab/countries -e lab/countries/.env -d ./lab/countries/data/default-export.json
```
