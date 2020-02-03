# fancy-to-do
Fancy To-Do List API
1. create todo
Untuk membuat data todo
POST /todos
request header
{
  "Content-Type: "application/json"
}

request body
{
	"title":"Learn REST API",
	"description": "Learn how to create Restful api with express and sequelize",
	"due_date": "2020-01-29"
}

response
{
    "id": 6,
    "title": "Learn REST API",
    "description": "Learn how to create Restful api with express and sequelize",
    "status": "incomplete",
    "due_date": "2020-01-29T00:00:00.000Z",
    "updatedAt": "2020-02-03T10:19:56.051Z",
    "createdAt": "2020-02-03T10:19:56.051Z"
}

2. get todo
Untuk mendapatkan data todo
GET /todos

response
[
  {
      "id": 4,
      "title": "test",
      "description": "test",
      "status": "complete",
      "due_date": "2020-2-2",
      "createdAt": "2020-2-3",
      "updatedAt": "2020-2-3"
  },
  {
      "id": 5,
      "title": null,
      "description": null,
      "status": "incomplete",
      "due_date": "1970-1-1",
      "createdAt": "2020-2-3",
      "updatedAt": "2020-2-3"
  },
]

3. get todo by id
Untuk mendapatkan data todo by id
GET /todos/:id

response
{
  "id": 6,
  "title": "Learn REST API",
  "description": "Learn how to create Restful api with express and sequelize",
  "status": "incomplete",
  "due_date": "2020-01-29T00:00:00.000Z",
  "updatedAt": "2020-02-03T10:19:56.051Z",
  "createdAt": "2020-02-03T10:19:56.051Z"
}

4. edit todo by id
Untuk mengupdate data todo by id
PUT /todos/:id

request header
{
  "Content-Type: "application/json"
}

request body
{
	"title":"Learn REST API",
	"description": "Learn how to create Restful api with express and sequelize",
	"due_date": "2020-01-29"
}

response
{
  "id": 6,
  "title": "Learn REST API",
  "description": "Learn how to create Restful api with express and sequelize",
  "status": "incomplete",
  "due_date": "2020-01-29T00:00:00.000Z",
  "updatedAt": "2020-02-03T10:19:56.051Z",
  "createdAt": "2020-02-03T10:19:56.051Z"
}

5. delete todo by id
Untuk delete data todo by id
DELETE /todos/:id

response
{
  "id": 6,
  "title": "Learn REST API",
  "description": "Learn how to create Restful api with express and sequelize",
  "status": "incomplete",
  "due_date": "2020-01-29T00:00:00.000Z",
  "updatedAt": "2020-02-03T10:19:56.051Z",
  "createdAt": "2020-02-03T10:19:56.051Z"
}