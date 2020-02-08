# Fancy To Do
Fancy To Do by Muhammad Anova Nurfaqih
## URL's
- Register
```
Method : "POST"
URL : "http://localhost:3000/users"
```
- Login
```
Method : "POST"
URL : "http://localhost:3000/users/login"
```
- Add Todo
```
Method : "POST"
URL : "http://localhost:3000/users"
```
- Get List Todo
```
Method : "GET"
URL : "http://localhost:3000/users"
```
- Edit / Update Todo
```
Method : "GET"
URL : "http://localhost:3000/users/:id"
Method : "PUT"
URL : "http://localhost:3000/users/:id"
```
- Delete Todo
```
Method : "DELETE"
URL : "http://localhost:3000/users/:id"
```
## POST/users
- Response
```
status code (200) :
[
  {
    "id": integer,
    "email": string,
    "password" : string
  }
]

status code (400) :
[
  {
    "email": 'Email must be field',
    "password": 'Password must be field'
  }
]

status code (500) :
[
  {
    "message": "Error not found"
  }
]
```
## POST/users/login
- Response
```
status code (200) :
{
  "Token": string
}

status code (400) :
{
  "email": 'Email must be field',
  "password": 'Password must be field'
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (500) :
{
  "message": "Error not found"
}
```
## POST/todos
- Request Header
```
{
  "Bearer": string
}
```
- Response
```
status code (200) :
{
  "id": integer,
  "title": string,
  "description": string,
  "status": integer,
  "due_date": date,
  "created_at": date,
  "updated_at": date,
  "UserId": integer
}

status code (400) :
{
  "title": "Description must be field",
  "description": "Description must be field"
  "due_date": "Due date must be field"
}

status code (402) :
{
  "message": "Bearer is invalid"
}

status code (500) :
{
  "message": "Error not found"
}
```
## GET/todos
- Request Header
```
{
  "Bearer": string
}
```
- Response
```
status code (200) :
[
  {
    "id": integer,
    "title": string,
    "description": string,
    "status": integer,
    "due_date": date,
    "created_at": date,
    "updated_at": date,
    "UserId": integer
  }
]
status code (500) :
{
  "message": "Error not found"
}
```
## GET/todos/:id
- Request Header
```
{
  "Bearer": string
}
```
- Response
```
status code (200) :
{
  "id": integer,
  "title": string,
  "description": string,
  "status": integer,
  "due_date": date,
  "created_at": date,
  "updated_at": date,
  "UserId": integer
}
status code (402) :
{
  "message": "Bearer is invalid"
}
status code (500) :
{
  "message": "Error not found"
}
```
## PUT/todos/:id
- Request Header
```
{
  "Bearer": string
}
```
- Response
```
status code (200) :
[
  {
    "id": integer,
    "title": string,
    "description": string,
    "status": integer,
    "due_date": date,
    "created_at": date,
    "updated_at": date,
    "UserId": integer
  }
  [1]
]
status code (400) :
{
  "title": "Description must be field",
  "description": "Description must be field"
  "due_date": "Due date must be field"
}
status code (402) :
{
  "message": "Bearer is invalid"
}
status code (403) :
{
  "message": "No access"
}
status code (500) :
{
  "message": "Error not found"
}
```
## DELETE/todos
- Request Header
```
{
  "Bearer": string
}
```
- Response
```
status code (200) :
{
  "id": integer,
  "title": string,
  "description": string,
  "status": integer,
  "due_date": date,
  "created_at": date,
  "updated_at": date,
  "UserId": integer
}
status code (402) :
{
  "message": "Bearer is invalid"
}
status code (403) :
{
  "message": "No access"
}
status code (500) :
{
  "message": "Error not found"
}
```