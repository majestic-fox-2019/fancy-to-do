# fancy-to-do
Fancy To-Do List API

Dokumentasi RESTFUL API MyTodo.

### environment variabeles

```PORT = 
PORT
```

## USAGE

```text
javascript
npm install
nodenom app
```

## BASE URL

```
http://localhost:3000/
```

##  ACCESS

```````text
Access server port: 3000
```````

## TODO ROUTE

| Routing    | HTTP   | Headers(s) | Body                                                         | Response                                                     | Description            |
| ---------- | ------ | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------- |
| /todos     | GET    | token      | none                                                         | Error: Internal server error, Success: Show all todos        | Show all todos to user |
| /todos/:id | GET    | token      | none                                                         | Error: Internal server error, Validation error, Success: Show one todo | Show one todo to user  |
| /todos     | POST   | token      | name: STRING (***required***), description: STRING (***required***), due_date: DATE,(***required***) | Error: Internal server error, Validation error, Success: create new todo | create new todo        |
| /todos/:id | PATCH  | token      | none                                                         | Error: Internal server error, Success: change status from uncompleted to complete | update todo            |
| /todos/:id | DELETE | token      | none                                                         | Error: Internal server error, Success: delete finish selected todo | delete todo            |



##  Response

```````http://localhost:3000/todos
 GET http://localhost:3000/todos :
 [
  {
        "id": 1,
        "title": "lulus",
        "description": "lulus dari hacktiv",
        "due_date": "2020-02-03T03:16:57.042Z",
        "createdAt": "2020-02-03T03:14:57.042Z",
        "updatedAt": "2020-02-03T03:14:57.441Z"
    }
]
```````





```http://localhost:3000/todos/:id
  GET http://localhost:3000/todos/:id :
  {
        "id": 1,
        "title": "lulus",
        "description": "lulus dari hacktiv",
        "due_date": "2020-02-03T03:16:57.042Z",
        "createdAt": "2020-02-03T03:14:57.042Z",
        "updatedAt": "2020-02-03T03:14:57.441Z"
    }
```



##  

```````http://localhost:3000/todos
 POST http://localhost:3000/todos
 [
  {
        "id": 1,
        "title": "lulus",
        "description": "lulus dari hacktiv",
        "due_date": "2020-02-03T03:16:57.042Z",
        "createdAt": "2020-02-03T03:14:57.042Z",
        "updatedAt": "2020-02-03T03:14:57.441Z"
    }
]
```````





```http://localhost:3000/todos/:id
  PUT http://localhost:3000/todos/:id
  {
        "id": 1,
        "title": "lulus nanti",
        "description": "lulus dari hacktiv8 nanti",
        "due_date": "2020-02-03T03:16:57.042Z",
        "createdAt": "2020-02-03T03:14:57.042Z",
        "updatedAt": "2020-02-03T03:16:23.441Z"
    }
```

##  

```````http://localhost:3000/todos/:id
 DELETE http://localhost:3000/todos
  {
        "id": 1,
        "title": "lulus",
        "description": "lulus dari hacktiv",
        "due_date": "2020-02-03T03:16:57.042Z",
        "createdAt": "2020-02-03T03:14:57.042Z",
        "updatedAt": "2020-02-03T03:14:57.441Z"
    }
```````



