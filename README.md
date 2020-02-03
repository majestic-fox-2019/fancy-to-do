# fancy-to-do
Fancy To-Do List API

<br>
1. POST /todos
- Create a new todolist.

Request Body:
- Schema

  Value:
    - title: string,
    - description: string,
    - status: boolean,
    - due_date: date

- Example

  {
    "title": "Create Fancy Todo",
    "description": "Learn how to create RESTful API",
    "status": "false"
    "due_date": "2020-02-08"
  }

Response:
- 201

  Example:

  {
    "id": 1,
    "title": "Create Fancy Todo",
    "description": "Learn how to create RESTful API",
    "status": "false"
    "due_date": "2020-02-08"
  }

- 400

  Example:

  {
    "message": "Validation error: Title must be filled!"
  }

- 500

<br>
2. GET /todos
- show all todo list

Response:
- 200

  Example:

  {
    "id": 1,
    "title": "Create Fancy Todo",
    "description": "Learn how to create RESTful API",
    "status": "false"
    "due_date": "2020-02-08"
  },
  {
    "id": 2,
    "title": "Create Fancy Todo",
    "description": "Learn how to create RESTful API",
    "status": "false"
    "due_date": "2020-02-08"
  } 

- 500

<br>
3. GET /todos/:id
- show todo list by id

Request Params:
<br>
id: integer <br>
example: http://localhost:3000/todos/2

Response:
- 200

  Example:

  {
    "id": 2,
    "title": "Create Fancy Todo",
    "description": "Learn how to create RESTful API",
    "status": "false",
    "due_date": "2020-02-08"
  }

- 404
  
  Example:

  {
    "message": "Error 404, command not found!"
  }

<br>
4. PUT /todos/:id
- update todo list by id

Request params:
<br>
id: integer <br>
example: http://localhost:3000/todos/2


Request Body:
- Schema

  Value:
    - title: string,
    - description: string,
    - status: boolean,
    - due_date: date

- Example

  {
    "title": "Create Fancy Todo",
    "description": "Learn how to create RESTful API",
    "status": "false"
    "due_date": "2020-02-08"
  }


Response:
- 200

  Example: <br>
  {
    "id": 2,
    "title": "Create Fancy Todo",
    "description": "Learn how to create RESTful API",
    "status": "false",
    "due_date": "2020-02-08"
  }

- 404
  
  Example: <br>
  {
    "message": "Validation error: Title must be filled!"
  }

- 400

  Example: <br>
  {
    "message": "Error 404, command not found!"
  }

- 500

<br>
5. DELETE /todos/:id
- delete todo list by id

Request params: <br>
id: integer <br>
example: http://localhost:3000/todos/3


Response:
- 200

  Example: <br>
  {
    "id": 2,
    "title": "Create Fancy Todo",
    "description": "Learn how to create RESTful API",
    "status": "false",
    "due_date": "2020-02-08"
  }

- 404
  
  Example: <br>
  {
    "message": "Error 404, command not found!"
  }

- 500