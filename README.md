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
npm run dev
```

## BASE URL

```
http://localhost:3000
```

##  ACCESS

```````text
Access server port: 3000
Access client port: 8080
```````

## TODO ROUTE

| Routing    | HTTP   | Headers(s) | Body                                                         | Response                                                     | Description            |
| ---------- | ------ | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------- |
| /todos     | GET    | token      | none                                                         | Error: Internal server error, Success: Show all todos        | Show all todos to user |
| /todos/:id | GET    | token      | none                                                         | Error: Internal server error, Validation error, Success: Show one todo | Show one todo to user  |
| /todos     | POST   | token      | title: STRING (***required***), description: STRING (***required***), due_date: DATE,(***required***) | Error: Internal server error, Validation error, Success: create new todo | create new todo        |
| /todos/:id | PUT    | token      | title: STRING, description: STRING, due_date: DATE           | Error: Internal server error, Success: edit todo             | update todo            |
| /todos/:id | DELETE | token      | none                                                         | Error: Internal server error, Success: delete finish selected todo | delete todo            |



##  Response Success

```````http://localhost:3000/todos
 GET http://localhost:3000/todos :
 [
  	{
        "id": 10,
        "title": "todo 2",
        "description": "wffwa",
        "status": "not complete",
        "due_date": "2020-02-01T17:00:00.000Z",
        "UserId": 2,
        "updatedAt": "2020-02-08T08:34:01.891Z",
        "createdAt": "2020-02-08T08:34:01.891Z",
        "ProjectId": null
	}
]
```````



```http://localhost:3000/todos/:id
  GET http://localhost:3000/todos/:id :
  	{
        "id": 10,
        "title": "todo 2",
        "description": "wffwa",
        "status": "not complete",
        "due_date": "2020-02-01T17:00:00.000Z",
        "UserId": 2,
        "updatedAt": "2020-02-08T08:34:01.891Z",
        "createdAt": "2020-02-08T08:34:01.891Z",
        "ProjectId": null
	}
```

##  

```````http://localhost:3000/todos
 POST http://localhost:3000/todos
  	{
        "id": 10,
        "title": "todo 2",
        "description": "wffwa",
        "status": "not complete",
        "due_date": "2020-02-01T17:00:00.000Z",
        "UserId": 2,
        "updatedAt": "2020-02-08T08:34:01.891Z",
        "createdAt": "2020-02-08T08:34:01.891Z",
        "ProjectId": null
	}
```````



```http://localhost:3000/todos/:id
  PUT http://localhost:3000/todos/:id
  	{
        "id": 10,
        "title": "todo 2",
        "description": "wffwa",
        "status": "not complete",
        "due_date": "2020-02-01T17:00:00.000Z",
        "UserId": 2,
        "updatedAt": "2020-02-08T08:34:01.891Z",
        "createdAt": "2020-02-08T08:34:01.891Z",
        "ProjectId": null
	}
```

##  

```````http://localhost:3000/todos/:id
 DELETE http://localhost:3000/todos
    {
        "id": 10,
        "title": "todo 2",
        "description": "wffwa",
        "status": "not complete",
        "due_date": "2020-02-01T17:00:00.000Z",
        "UserId": 2,
        "updatedAt": "2020-02-08T08:34:01.891Z",
        "createdAt": "2020-02-08T08:34:01.891Z",
        "ProjectId": null
	}
```````



## USER ROUTES

| Routing             | HTTP | Header(s)                         | Body                                                         | Response                                                  | Description       |
| ------------------- | ---- | --------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------- | ----------------- |
| /users              | POST | application/x-www-form-urlencoded | fullname : String (***required***), email : String (***required***), password : String (***required***) | Error: Internal server error Success: add new user        | Create new user   |
| /users/login        | POST | application/x-www-form-urlencoded | email : String (***required***), password : String (***required***) | Error: Internal server error Success: login user          | normal user login |
| /users/login/google | POST | application/x-www-form-urlencoded | email : String (***required***), password : String (***required***) | Error: Internal server error Success: login google member | google user login |



## Response Success

```````http://localhost:3000/users/login
 POST http://localhost:3000/users/login
 {
    "user": {
        "id": 2,
        "email": "coba@gmail.com",
        "password": "$2b$08$YNE/EY69Opo56nVASiugc.Rfqu0BwGHqTPc/mNaLyRSH3oOM9wKty",
        "fullname": "coba",
        "picture": null,
        "createdAt": "2020-02-07T18:47:03.943Z",
        "updatedAt": "2020-02-07T18:47:03.943Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTgxMTUwNjMwfQ.5tFheWfVbu0VVBYYp51Qs-R9xoNyYKPONITUVSGUuQg"
}
```````



```http://localhost:3000/users/login/google
  PUT http://localhost:3000/users/login/google
  {
    "user": {
        "id": 2,
        "email": "coba@gmail.com",
        "password": "$2b$08$YNE/EY69Opo56nVASiugc.Rfqu0BwGHqTPc/mNaLyRSH3oOM9wKty",
        "fullname": "coba",
        "picture": "https://lh3.googleusercontent.com/-591L2Rcdlzs/AAAAAAAAAAI/AAAAAAAAAAA",
        "createdAt": "2020-02-07T18:47:03.943Z",
        "updatedAt": "2020-02-07T18:47:03.943Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTgxMTUwNjMwfQ.5tFheWfVbu0VVBYYp51Qs-R9xoNyYKPONITUVSGUuQg"
}
```



```http://localhost:3000/users/register
  PUT http://localhost:3000/users/register
  {
    "user": {
        "id": 2,
        "email": "coba@gmail.com",
        "password": "$2b$08$YNE/EY69Opo56nVASiugc.Rfqu0BwGHqTPc/mNaLyRSH3oOM9wKty",
        "fullname": "coba",
        "picture": null,
        "createdAt": "2020-02-07T18:47:03.943Z",
        "updatedAt": "2020-02-07T18:47:03.943Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTgxMTUwNjMwfQ.5tFheWfVbu0VVBYYp51Qs-R9xoNyYKPONITUVSGUuQg"
}
```



## PROJECT TODO ROUTE

| Routing                      | HTTP   | Headers(s) | Body                                                         | Response                                                     | Description                      |
| :--------------------------- | ------ | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------- |
| /projectTodos/:projectId     | GET    | token      | none                                                         | Error: Internal server error, Success: Show all project todo | Show all project todo to project |
| /projectTodos/:projectId/:id | GET    | token      | none                                                         | Error: Internal server error, Validation error, Success: Show one project todo | Show one project todo to project |
| /projectTodos/:projectId     | POST   | token      | title: STRING (***required***), description: STRING (***required***), due_date: DATE,(***required***) | Error: Internal server error, Validation error, Success: create new project todo | create new project todo          |
| /projectTodos/:projectId/:id | PUT    | token      | title: STRING, description: STRING, due_date: DATE           | Error: Internal server error, Success: edit project todo     | update project todo              |
| /projectTodos/:projectId/:id | DELETE | token      | none                                                         | Error: Internal server error, Success: delete finish selected project todo | delete project todo              |



##  Response Success

```````http://localhost:3000/todos
 GET http://localhost:3000/projectTodos/1
 [
    {
        "id": 10,
        "title": "ini title todo",
        "description": "coba todo project",
        "status": "not complete",
        "due_date": "2020-02-01T17:00:00.000Z",
        "UserId": null,
        "updatedAt": "2020-02-08T08:34:01.891Z",
        "createdAt": "2020-02-08T08:34:01.891Z",
        "ProjectId": 1
	}
]
```````



```http://localhost:3000/todos/:id
  GET http://localhost:3000/projectTodos/1/10
    {
        "id": 10,
        "title": "ini title todo",
        "description": "coba todo project",
        "status": "not complete",
        "due_date": "2020-02-01T17:00:00.000Z",
        "UserId": null,
        "updatedAt": "2020-02-08T08:34:01.891Z",
        "createdAt": "2020-02-08T08:34:01.891Z",
        "ProjectId": 1
	}
```

##  

```````http://localhost:3000/todos
 POST http://localhost:3000/projectTodos/1
    {
        "id": 10,
        "title": "ini title todo",
        "description": "coba todo project",
        "status": "not complete",
        "due_date": "2020-02-01T17:00:00.000Z",
        "UserId": null,
        "updatedAt": "2020-02-08T08:34:01.891Z",
        "createdAt": "2020-02-08T08:34:01.891Z",
        "ProjectId": 1
	}
```````



```http://localhost:3000/todos/:id
  PUT http://localhost:3000/projectTodos/1/10
    {
        "id": 10,
        "title": "ini title todo",
        "description": "coba todo project",
        "status": "complete",
        "due_date": "2020-02-01T17:00:00.000Z",
        "UserId": null,
        "updatedAt": "2020-02-08T08:34:01.891Z",
        "createdAt": "2020-02-08T08:34:01.891Z",
        "ProjectId": 1
	}
```

##  

```````http://localhost:3000/todos/:id
 DELETE http://localhost:3000/projectTodos/1/10
    {
        "id": 10,
        "title": "ini title todo",
        "description": "coba todo project",
        "status": "not complete",
        "due_date": "2020-02-01T17:00:00.000Z",
        "UserId": null,
        "updatedAt": "2020-02-08T08:34:01.891Z",
        "createdAt": "2020-02-08T08:34:01.891Z",
        "ProjectId": 1
	}
```````





## PROJECT  ROUTE

| Routing              | HTTP   | Headers(s) | Body                                 | Response                                                     | Description        |
| :------------------- | ------ | ---------- | ------------------------------------ | ------------------------------------------------------------ | ------------------ |
| /projects            | GET    | token      | none                                 | Error: Internal server error, Success: Show all project      | Show all project   |
| /projects/:projectId | GET    | token      | none                                 | Error: Internal server error, Validation error, Success: Show one project | Show one project   |
| /projects            | POST   | token      | nameProject: STRING (***required***) | Error: Internal server error, Validation error, Success: create new project | create new project |
| /projects/:projectId | PUT    | token      | nameProject: STRING (***required***) | Error: Internal server error, Success: edit project          | update project     |
| /projects/:projectId | DELETE | token      | none                                 | Error: Internal server error, Success: delete selected project | delete project     |

##  Response Success

```````http://localhost:3000/todos
 GET http://localhost:3000/projects
[
    {
        "id": 2,
        "nameProject": "asfafwad",
        "Admin": 1,
        "createdAt": "2020-02-07T18:46:18.918Z",
        "updatedAt": "2020-02-07T18:46:18.918Z",
        "Users": [
            {
                "id": 2,
                "email": "coba@gmail.com",
                "password": "$2b$08$YNE/EY69Opo56nVASiugc.Rfqu0BwGHqTPc/mNaLyRSH3oOM9wKty",
                "fullname": "coba",
                "picture": null,
                "createdAt": "2020-02-07T18:47:03.943Z",
                "updatedAt": "2020-02-07T18:47:03.943Z",
                "MemberProject": {
                    "UserId": 2,
                    "ProjectId": 2,
                    "createdAt": "2020-02-08T08:13:45.240Z",
                    "updatedAt": "2020-02-08T08:13:45.240Z"
                }
            }
        ]
    },
    {
        "id": 3,
        "nameProject": "project 9",
        "Admin": 2,
        "createdAt": "2020-02-08T08:47:48.463Z",
        "updatedAt": "2020-02-08T08:47:48.463Z",
        "Users": [
            {
                "id": 2,
                "email": "coba@gmail.com",
                "password": "$2b$08$YNE/EY69Opo56nVASiugc.Rfqu0BwGHqTPc/mNaLyRSH3oOM9wKty",
                "fullname": "coba",
                "picture": null,
                "createdAt": "2020-02-07T18:47:03.943Z",
                "updatedAt": "2020-02-07T18:47:03.943Z",
                "MemberProject": {
                    "UserId": 2,
                    "ProjectId": 3,
                    "createdAt": "2020-02-08T08:47:48.580Z",
                    "updatedAt": "2020-02-08T08:47:48.580Z"
                }
            }
        ]
    }
]
```````



```http://localhost:3000/todos/:id
  GET http://localhost:3000/projects/3
{
    "id": 3,
    "nameProject": "project 9",
    "Admin": 2,
    "createdAt": "2020-02-08T08:47:48.463Z",
    "updatedAt": "2020-02-08T08:47:48.463Z",
    "Users": [
        {
            "id": 2,
            "email": "coba@gmail.com",
            "password": "$2b$08$YNE/EY69Opo56nVASiugc.Rfqu0BwGHqTPc/mNaLyRSH3oOM9wKty",
            "fullname": "coba",
            "picture": null,
            "createdAt": "2020-02-07T18:47:03.943Z",
            "updatedAt": "2020-02-07T18:47:03.943Z",
            "MemberProject": {
                "UserId": 2,
                "ProjectId": 3,
                "createdAt": "2020-02-08T08:47:48.580Z",
                "updatedAt": "2020-02-08T08:47:48.580Z"
            }
        }
    ]
}
```

##  

```````http://localhost:3000/todos
 POST http://localhost:3000/projects
{
    "UserId": 2,
    "ProjectId": 3,
    "updatedAt": "2020-02-08T08:47:48.580Z",
    "createdAt": "2020-02-08T08:47:48.580Z",
    "id": 5
}
```````



```http://localhost:3000/todos/:id
  PUT http://localhost:3000/projects/3
{
    "id": 3,
    "nameProject": "project 2",
    "Admin": 2,
    "createdAt": "2020-02-08T08:47:48.463Z",
    "updatedAt": "2020-02-08T08:52:27.177Z"
}
```

##  

```````http://localhost:3000/todos/:id
 DELETE http://localhost:3000/projects/3
1
```````

