# FANCY - TODO

## fancy-todo-api

## Install

```
npm i express sequelize pg
```

## Route

```
var express = require('express')
var router = express.Router()
const ControllerTodo = require('../controllers/controllerTodo')

router.post('/', ControllerTodo.create) // create new todo
router.get('/', ControllerTodo.findall) // show all todos
router.get('/:id', ControllerTodo.findone) // search todo by id
router.put('/:id', ControllerTodo.edit) // update todo
router.delete('/:id', ControllerTodo.delete) // delete todo



module.exports = router

```


## TO SEND REQUEST
 
####  POST /todos
###### request header
```
{
    "Content-Type": "application/json"
}

```
 
###### Request Body
```

{
    "title": "Learn todo",
    "description": "how to add new todo",
    "status": "true",
    "due_date": "Mon, 03 Feb 2020 13:56:45 GMT"
}

```
###### Response
```
{
    "id": 11,
    "title": "Learn todo",
    "description": "how to add new todo",
    "status": true,
    "due_date": "2020-02-03T13:56:45.000Z",
    "updatedAt": "2020-02-03T14:12:58.962Z",
    "createdAt": "2020-02-03T14:12:58.962Z"
}
```

####  GET /todos
###### Response

```
{
    "id": 11,
    "title": "Learn todo",
    "description": "how to add new todo",
    "status": true,
    "due_date": "2020-02-03T13:56:45.000Z",
    "updatedAt": "2020-02-03T14:12:58.962Z",
    "createdAt": "2020-02-03T14:12:58.962Z"
}
```

####  GET /todos/:id

```

  http://localhost:3000/todos/3

```

```
{
    "id": 3,
    "title": "learn sequelize",
    "description": "how to use sequelize",
    "status": false,
    "due_date": "2001-02-28T17:00:00.000Z",
    "createdAt": "2020-02-03T07:48:26.192Z",
    "updatedAt": "2020-02-03T10:44:56.603Z"
}
```

####  PUT /todos/:id

```

  http://localhost:3000/todos/3

```
###### Request Body
```

    {
        "title": "make your code more readably",
        "description": "refactoring code",
        "status": false,
        "due_date": "2020-02-03T13:32:04.000Z"
    }

```
#
###### Response
```

[
    {
        "id": 10,
        "title": "make your code more readably",
        "description": "refactoring code",
        "status": false,
        "due_date": "2020-02-03T13:32:04.000Z",
        "createdAt": "2020-02-03T13:57:02.820Z",
        "updatedAt": "2020-02-03T14:21:56.981Z"
    }
]
```

####  DElETE /todos/:id

```

  http://localhost:3000/todos/3

```

###### Response
```
{
    "id": 3,
    "title": "id 3 telah di delete",
    "description": "deleted",
    "status": false,
    "due_date": "2001-02-28T17:00:00.000Z",
    "createdAt": "2020-02-03T07:48:26.192Z",
    "updatedAt": "2020-02-03T10:44:56.603Z"
}

  
```

