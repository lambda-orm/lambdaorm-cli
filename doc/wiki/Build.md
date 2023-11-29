# Build

build model, repositories.

## Params

| parameter		| short | describe 																	|
|-------------|-------|-------------------------------------------|
|workspace		| -w 		| project path.															|
|language			| -l 		| develop language.													|
|model				| -m 		| build model.															|
|repositories	| -r 		| build repositories.												|
|all					| -a 		| build model and repositories.							|
|src-path			| -s 		| relative source code path in workspace.		|
|data-path		| -d 		| relative data path in workspace.					|
|domain-path	| -o 		| relative domain path in source code path.	|

## Example

```sh
lambdaorm build -w lab/countries
```
