# fancy-to-do
Fancy To-Do List API
## Login
- Method: POST
- Route: http://localhost:8080/login
- Request body: 
```
{
  "name": type data string,
  "email": type data string
}
```
- Response:
```
200: 
{
  "id": type data integer,
  "name": type data string,
  "email": type data string,
  "createdAt": type data date,
  "updatedAt": type data date
}

404: 
  {
   "message": "email or password incorect"
  }
```
## Show All Todo By UserId
- Method: GET
- Route: http://localhost:8080/todos
- Response:
```
200: 
[
  {
    "id": 1,
    "title": "makan",
    "desctiption": "makan weh kumaha aing",
    "status": "belum beres",
    "due_date": "2020-02-05T00:00:00.000Z",
    "UserId": null,
    "ProjectId": null,
    "createdAt": "2020-02-04T01:41:48.376Z",
    "updatedAt": "2020-02-04T01:41:48.376Z"
  }
]
500:{errors}
```

## GET/todo/:id
- Request header:
- Request body:
```
null
```
- Response:
```
200:
{
  "id": 1,
  "title": "makan",
  "desctiption": "makan weh kumaha aing",
  "status": "belum beres",
  "due_date": "2020-02-05T00:00:00.000Z",
  "UserId": null,
  "ProjectId": null,
  "createdAt": "2020-02-04T01:41:48.376Z",
  "updatedAt": "2020-02-04T01:41:48.376Z"
}
404:
{
  "err": {
    "code": 404,
    "message": "todo not found"
  },
  "msg": "todo not found"
}
500:{errors}
```

## POST/todo
- Request header:
- Request body: 
```
{
    "id"
    "title"
    "descrioption"
    "due_date"
    "status"
}
```
- Response:
```
200: 
{
  "id": 2,
  "title": "belajar",
  "desctiption": "bikin todo",
  "status": "belum beres",
  "due_date": "2020-02-05T00:00:00.000Z",
  "updatedAt": "2020-02-04T01:48:28.245Z",
  "createdAt": "2020-02-04T01:48:28.245Z",
  "UserId": null,
  "ProjectId": null
}
500:{errors}
```

## PUT/todo/:id
- Request header:
- Request body: 
```
{
    "id"
    "title"
    "descrioption"
    "due_date"
    "status"
}
```
- Response:
200:
[
  1,
  [
    {
      "id": 1,
      "title": "belajar",
      "desctiption": "bikin todo",
      "status": "belum beres",
      "due_date": "2020-02-05T00:00:00.000Z",
      "createdAt": "2020-02-04T01:41:48.376Z",
      "updatedAt": "2020-02-04T01:50:02.019Z",
      "UserId": null,
      "ProjectId": null
    }
  ]
]
404:
{
  "err": {
    "code": 404,
    "message": "todo not found"
  },
  "msg": "todo not found"
}
500:

## DELETE/todo/:id
- Request header:
- Request body: 
```
null
```
- Response: 
```
200:
{
  "id": 1,
  "title": "belajar",
  "desctiption": "bikin todo",
  "status": "belum beres",
  "due_date": "2020-02-05T00:00:00.000Z",
  "UserId": null,
  "ProjectId": null,
  "createdAt": "2020-02-04T01:41:48.376Z",
  "updatedAt": "2020-02-04T01:50:02.019Z"
}
404:
{
  "err": {
    "code": 404,
    "message": "todo not found"
  },
  "msg": "todo not found"
}
500:
```

