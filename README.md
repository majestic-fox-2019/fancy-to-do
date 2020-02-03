# fancy-to-do
Fancy To-Do List API

URL : 

1. Show all todo list
- GET /todos

Response:
[
    {
        "id": 1,
        "title": "Learn REST API",
        "description: "Learn how to create RESTful API with Express and Sequelize",
        "due_date": "2020-01-20",
        "createdAt": "2020-02-03T08:32:32.486Z",
        "updatedAt": "2020-02-03T08:32:32.486Z"
    },
    {
        "id": 2,
        "title": "CRUD for Todo webapps",
        "description": "Learn how to create CRUD for Todo",
        "status": "incomplete",
        "due_date": "2020-1-1",
        "createdAt": "2020-02-03T08:32:32.486Z",
        "updatedAt": "2020-02-03T08:32:32.486Z"
    },
]

2. Create new todo task
- POST /todos

Request header: 
{
    "Content-Type": "application/json"
}

Request body:
{
    "title": "Learn REST API",
    "description": "Learn how to create RESTful API with Express and Sequelize",
    "due_date": "2020-01-29"
}

Response:
{
    "id": 1,
    "title": "Learn REST API",
    "description: "Learn how to create RESTful API with Express and Sequelize",
    "due_date": "2020-01-20",
    "createdAt": "2020-02-03T08:32:32.486Z",
    "updatedAt": "2020-02-03T08:32:32.486Z"
}

3. Show todo task filtered by id
-GET /todos:id

Response:
{
    "id": 1,
    "title": "Learn REST API",
    "description: "Learn how to create RESTful API with Express and Sequelize",
    "due_date": "2020-01-20"
}

4. Update todo task by id
-PUT /todos:id

Request header: 
{
    "Content-Type": "application/json"
}

Request body:
{
    "title": "Learn REST API",
    "description": "Learn how to create RESTful API with Express and Sequelize",
    "due_date": "2020-01-29"
}

Response:
{
    "id": 1,
    "title": "Learn REST API",
    "description: "Learn how to create RESTful API with Express and Sequelize",
    "due_date": "2020-01-20"
}

5. Delete todo task by id
-DELETE /todos:id

Response:
{
    "id": 1,
    "title": "Learn REST API",
    "description: "Learn how to create RESTful API with Express and Sequelize",
    "due_date": "2020-01-20"
}