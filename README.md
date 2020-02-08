# fancy-to-do
Fancy To-Do List API

## Login
- Method: POST
- Route: http://localhost:3000/login
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

## Register
- Method: POST
- Route: http://localhost:3000/register
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

400: 
  {
    "errMsg": 
          [
            "password must be filled",
            "format email is wrong",
            "email must be filled"
          ]
  }
```

## Logout
- Route: http://localhost:3000
- Request header:
```
{
  "token": type data string
}
```
- Response:
```
404: 
  {
   "message": "user not found"
  }
```

## Show All Todo By UserId
- Method: GET
- Route: http://localhost:3000/todos
- Request header:
```
{
  "token": type data string
}
```
- Response:
```
200: 
[
  {
    "id": type data integer,
    "title": "type data string,
    "desctiption": type data string,
    "status": type data string,
    "due_date": type data date,
    "UserId": type data integer,
    "createdAt": type data date,
    "updatedAt": type data date
  }
]

500: 
  {
   "message": "internal server error"
  }
```

## Add Todo
- Method: POST
- Route: http://localhost:3000/todos
- Request header:
```
{
    "token": type data string
}
```
- Request body: 
```
{
    "title": "type data string,
    "desctiption": type data string,
    "due_date": type data date
}
```
- Response:
```
200: 
  {
    "id": type data integer,
    "title": "type data string,
    "desctiption": type data string,
    "status": type data string,
    "due_date": type data date,
    "UserId": type data integer,
    "createdAt": type data date,
    "updatedAt": type data date
  }

400:
{
  "errMsg": 
          [
            "title must be filler",
            "description must be filled",
            "due date must be filled"
          ]
}
500:
 {
   "message": "internal server error"
  }
```

## Edit Todo
- Method: PUT
- Route: http://localhost:3000/todos/:id
- Request header:
```
{
    "token": type data string
}
```
- Request body: 
```
{
    "title": type data string,
    "desctiption": type data string,
    "due_date": type data date,
    "status": type data string
}
```
- Response:
```
200: 
  {
    "id": type data integer,
    "title": "type data string,
    "desctiption": type data string,
    "status": type data string,
    "due_date": type data date,
    "UserId": type data integer,
    "createdAt": type data date,
    "updatedAt": type data date
  }

400:
{
  "errMsg": 
          [
            "title must be filler",
            "description must be filled",
            "due date must be filled"
          ]
}
500:
 {
   "message": "internal server error"
  }
```

## Delete Todo
- Method: DELETE
- Route: http://localhost:3000/todos/:id
- Request header:
```
{
    "token": type data string
}
```
- Response:
```
200: 
  {
    "id": type data integer,
    "title": "type data string,
    "desctiption": type data string,
    "status": type data string,
    "due_date": type data date,
    "UserId": type data integer,
    "createdAt": type data date,
    "updatedAt": type data date
  }

404:
 {
   "message": "todo not found"
  }
500:
 {
   "message": "internal server error"
  }
```

## Filter Todo
- Method: GET
- Route: http://localhost:3000/todos/filter/:status
- Request header:
```
{
  "token": type data string
}
```
- Response:
```
200: 
[
  {
    "id": type data integer,
    "title": "type data string,
    "desctiption": type data string,
    "status": type data string,
    "due_date": type data date,
    "UserId": type data integer,
    "createdAt": type data date,
    "updatedAt": type data date
  }
]

404:
 {
   "message": "todo not found"
  }

500: 
  {
   "message": "internal server error"
  }
```

## API Shalah
- Method: GET
- Route: http://localhost:3000/todos/solat
- Request header:
```
{
  "token": type data string
}
```
- Response:
```
200: 
{
  "today_weather": {object},
  "types":{object}
}


500: 
  {
   "message": "internal server error"
  }
```



