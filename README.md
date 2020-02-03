# fancy-to-do
Fancy To-Do List API


1. POST /todos
- Create a new todolist.

Request Body:
{
  "title": "Create Fancy Todo",
  "description": "Learn how to create RESTful API",
  "status": "false"
  "due_date": "2020-02-08"
}

Response:
{
  "id": 1,
  "title": "Create Fancy Todo",
  "description": "Learn how to create RESTful API",
  "status": "false"
  "due_date": "2020-02-08"
}


2. GET /todos
- show all todo list


3. GET /todos/:id
- show todo list by id

Request params:
id: integer
example: http://localhost:3000/todos/2

Response: 
{
  "id": 2,
  "title": "Create Fancy Todo",
  "description": "Learn how to create RESTful API",
  "status": "false"
  "due_date": "2020-02-08"
}


4. PUT /todos/:id
- update todo list by id

Request params:
example: http://localhost:3000/todos/2

Request body:
{
  "title": "Create Fancy Todo",
  "description": "Learn how to create RESTful API",
  "status": "false"
  "due_date": "2020-02-08"
}

Response:
{
  "id": 1,
  "title": "Create Fancy Todo",
  "description": "Learn how to create RESTful API",
  "status": "false"
  "due_date": "2020-02-08"
}


5. DELETE /todos/:id
- delete todo list by id

Request params:
example: http://localhost:3000/todos/3

Response:
{
  "id": 3,
  "title": "Create Fancy Todo",
  "description": "Learn how to create RESTful API",
  "status": "false"
  "due_date": "2020-02-08"
}