# [Fancy-To-Do](https://github.com/jetlysandita/fancy-to-do/blob/master/server/README.md)
Fancy To-Do List API

learn build Rest-API with express js

# Feature ! 
* [POST /todos](#POST-/todos) - Create todo
* [GET /todos](#GET-/todos) - Find all todo
* [GET /todos/:id](#GET-/todos:id) - Find one todo by id
* [PUT /todos/:id](#PUT-/todos:id) - Update one todo by id
* [DELETE /todos/:id](#DELETE-/todos:id) - Delete one todo by id
* [POST /register](#POST-/register) - Register
* [POST /login](#POST-/login) - Login

# POST /todos
## Description

use this to create new todo

## URL

- /todos

## Method

- POST

## Data Params

- ### Request Headers

  ```
  {
    "Content-Type: "application/json"
    "token":""
  }
  ```

* ### Request Body

  ```
  {
    "title":"",
  	"description": "",
  	"due_date": ""
  }
  ```

  
| Attribute | Type | Null | Empty | Default |
| ------ | ------ | ------ | ------ | ------ |
| title | String | False | False | No Default |
| deescription | String | False | False | No Default |
| due_date | Date | False | False | No Default |
## Success Response

```
{
  "data": {
      "id": 4,
      "title": "Learn REST API",
      "description": "Learn how to create Restful api with express and sequelize",
      "status": "incomplete",
      "due_date": "2020-01-29T00:00:00.000Z",
      "updatedAt": "2020-02-03T14:40:57.465Z",
      "createdAt": "2020-02-03T14:40:57.465Z"
  },
  "message": "Success create todo"
}
```
## Error Response

* Code 400

  If Attribute( title , description , or due_date is null or empty)
```
{
  "data": null,
  "message": [
      {
          "title": "Enter a title"
      },
      {
          "description": "Enter a description"
      },
      {
          "due_date": "Enter a due date"
      }
  ]
}
```

# GET /todos
## Description 
* use this to find all todo
## URL
* /todos
## Method
* GET
## Data Params

- ### Request Headers

  ```
  {
    "Content-Type: "application/json"
    "token":""
  }
  ```
## Success Response

* data is array of object
```
{
    "data": [
        {
            "id": 1,
            "title": "Learn REST API",
            "description": "Learn how to create Restful api with express and sequelize",
            "status": "incomplete",
            "due_date": "2020-1-29",
            "createdAt": "2020-2-3",
            "updatedAt": "2020-2-3"
        },
        {
            "id": 3,
            "title": "Learn REST API",
            "description": "Learn how to create Restful api with express and sequelize",
            "status": "incomplete",
            "due_date": "2020-1-29",
            "createdAt": "2020-2-3",
            "updatedAt": "2020-2-3"
        },
        {
            "id": 4,
            "title": "Learn REST API",
            "description": "Learn how to create Restful api with express and sequelize",
            "status": "incomplete",
            "due_date": "2020-1-29",
            "createdAt": "2020-2-3",
            "updatedAt": "2020-2-3"
        }
    ],
    "message": null
}
```

# GET /todos/:id
## Description 
* use this to find one todo by id
## URL
* /todos/:id
## Method
* GET
## Data Params

- ### Request Headers

  ```
  {
    "Content-Type: "application/json"
    "token":""
  }
  ```
## URL Params
* Require
```
id = Integer
```
## Success Response

* data is object
```
{
    "data": {
        "id": 1,
        "title": "Learn REST API",
        "description": "Learn how to create Restful api with express and sequelize",
        "status": "incomplete",
        "due_date": "2020-01-29T00:00:00.000Z",
        "createdAt": "2020-02-03T10:52:44.883Z",
        "updatedAt": "2020-02-03T10:52:44.883Z"
    },
    "message": null
}
```
## Error Response

* Code 404

  If data todo with id not found
```
{
    "data": null,
    "message": "todo not found"
}
```

# PUT /todos/:id
## Description 
* use this to update one todo by id
## URL
* /todos/:id
## Method
* PUT
## Data Params

- ### Request Headers

  ```
  {
    "Content-Type: "application/json"
    "token":""
  }
  ```
## URL Params
* Require
```
id = Integer
```
## Data Params
* ### Request Headers
```
{
  "Content-Type: "application/json"
}
```
* ### Request Body
```
{
	"title":"",
	"description": "",
	"due_date": ""
}
```
| Attribute | Type | Null | Empty | Default |
| ------ | ------ | ------ | ------ | ------ |
| title | String | False | False | No Default |
| deescription | String | False | False | No Default |
| due_date | Date | False | False | No Default |
| status | String("complete","incomplete") | False | False | No Default |
## Success Response

* data is object
```
{
    "data": {
        "id": 4,
        "title": "test",
        "description": "test",
        "status": "complete",
        "due_date": "2020-09-07T04:06:39.000Z",
        "createdAt": "2020-02-03T14:40:57.465Z",
        "updatedAt": "2020-02-03T15:03:35.150Z"
    },
    "message": "Success update todo"
}
```
## Error Response

* Code 400

  If Attribute( title , description , status , or due_date is null or empty)
```
{
    "data": null,
    "message": [
        {
            "title": "Enter a title"
        },
        {
            "description": "Enter a description"
        },
        {
            "status": "Enter a status"
        },
        {
            "due_date": "Enter a due date"
        }
    ]
}
```

# DELETE /todos/:id
## Description 
* use this to delete one todo by id
## URL
* /todos/:id
## Method
* DELETE
## Data Params

- ### Request Headers

  ```
  {
    "Content-Type: "application/json"
    "token":""
  }
  ```
## URL Params
* Require
```
id = Integer
```
## Success Response

* data is object
```
{
    "data": {
        "id": 2,
        "title": null,
        "description": null,
        "status": "incomplete",
        "due_date": null,
        "createdAt": "2020-02-03T11:07:55.698Z",
        "updatedAt": "2020-02-03T11:07:55.698Z"
    },
    "message": "Success delete todo"
}
```
## Error Response

* Code 404

  If data todo with id not found
```
{
    "data": null,
    "message": "todo not found"
}
```

# POST /register
## Description

use this to register

## URL

- /register

## Method

- POST

## Data Params

- ### Request Headers

  ```
  {
    "Content-Type: "application/json"
  }
  ```

* ### Request Body

  ```
  {
    "email":"",
  	"password": "",
  }
  ```

  
| Attribute | Type | Null | Empty | Default |
| ------ | ------ | ------ | ------ | ------ |
| email | String | False | False | No Default |
| password | String | False | False | No Default |
## Success Response

```
{
    "id": 1,
    "email": "jetly27sandita@gmail.com",
    "password": "$2b$10$6crftepk05WMFdRibPROXuY5YAisEVrEVqAR9AiRQpdBQT0V2X8S2",
    "updatedAt": "2020-02-08T06:46:11.341Z",
    "createdAt": "2020-02-08T06:46:11.341Z"
}
```
## Error Response

* Code 400
```
jika email kosong
{
    "message": "Email is empty"
}
jika email tidak valid
{
    "message": "Email not valid"
}
jika password tidak diisi
{
    "password": "Enter a Password"
}
```

# POST /login
## Description

use this to login

## URL

- /login

## Method

- POST

## Data Params

- ### Request Headers

  ```
  {
    "Content-Type: "application/json"
  }
  ```

* ### Request Body

  ```
  {
    "email":"",
  	"password": "",
  }
  ```

  
| Attribute | Type | Null | Empty | Default |
| ------ | ------ | ------ | ------ | ------ |
| email | String | False | False | No Default |
| password | String | False | False | No Default |
## Success Response

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqZXRseTI3c2FuZGl0YUBnbWFpbC5jb20iLCJpYXQiOjE1ODExNDg0NTh9.izR7c3xoTWxWwFj2rqaFk8gFh0yw11e-qpSq4ndOjNs"
}
```
## Error Response

* Code 400
```
jika email tidak terdaftar
{
    "message": "Email not found"
}
jika password salah
{
    "message": "Password false"
}
```