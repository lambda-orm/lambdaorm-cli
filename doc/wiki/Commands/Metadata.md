# Metadata

Return metadata associated with the query expression.

## Params

| parameter	| short | describe 																																									|
|-----------|-------|-------------------------------------------------------------------------------------------|
|workspace	| -w 		| project path.																																							|
|query			| -q 		| Query expression																																					|
|output			| -o 		| Generates an output according to the following possible values [json|beautiful|light|yaml]|
|url				| -u 		| When working with a client you must pass the url of the service	                          |

## Example

```sh
lambdaorm metadata -o beautiful -q "Orders.filter(p=>p.id==id).include(p=>p.details)"
```

Result:

```json
{
  "classtype": "Sentence",
  "pos": {
    "ln": 0,
    "col": 35
  },
  "name": "select",
  "children": [
    {
      "classtype": "Sentence",
      "pos": {
        "ln": 0,
        "col": 38
      },
      "name": "select",
      "children": [],
      "type": "any",
      "entity": "Orders.details",
      "columns": [
        {
          "name": "orderId",
          "type": "integer"
        },
        {
          "name": "productId",
          "type": "integer"
        },
        {
          "name": "unitPrice",
          "type": "decimal"
        },
        {
          "name": "quantity",
          "type": "decimal"
        },
        {
          "name": "discount",
          "type": "decimal"
        },
        {
          "name": "LambdaOrmParentId",
          "type": "integer"
        }
      ],
      "parameters": [
        {
          "name": "LambdaOrmParentId",
          "type": "[integer]"
        }
      ],
      "constraints": [],
      "values": [],
      "defaults": [],
      "clause": "select",
      "alias": "o1"
    }
  ],
  "type": "any",
  "entity": "Orders",
  "columns": [
    {
      "name": "id",
      "type": "integer"
    },
    {
      "name": "customerId",
      "type": "string"
    },
    {
      "name": "employeeId",
      "type": "integer"
    },
    {
      "name": "orderDate",
      "type": "dateTime"
    },
    {
      "name": "requiredDate",
      "type": "date"
    },
    {
      "name": "shippedDate",
      "type": "date"
    },
    {
      "name": "shipViaId",
      "type": "integer"
    },
    {
      "name": "freight",
      "type": "decimal"
    },
    {
      "name": "name",
      "type": "string"
    },
    {
      "name": "address",
      "type": "string"
    },
    {
      "name": "city",
      "type": "string"
    },
    {
      "name": "region",
      "type": "string"
    },
    {
      "name": "postalCode",
      "type": "string"
    },
    {
      "name": "country",
      "type": "string"
    },
    {
      "name": "__id",
      "type": "integer"
    }
  ],
  "parameters": [
    {
      "name": "id",
      "type": "integer"
    }
  ],
  "constraints": [],
  "values": [],
  "defaults": [],
  "clause": "select",
  "alias": "o"
}
```
