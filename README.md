# fancy-to-do
Fancy To-Do List API

# Api Documentation
Base URL : http://localhost:3000

# Api used

* Google login API

* Facebook login API

* Mailboxvalidator API

# Register
URL:/user/register

Request header:

{
  Content-Type: application/json
}

Request body:

{
	"username": "kevin",
	"email": "coding@gmail.com",
	"password": "secret"
}

Response:

{
  "id": 1,
  "username": "kevin",
  "email": "coding@gmail.com",
  "password": "$2b$10$HYqwrYN91tNysNL.pEA1Ve5PpVdyxUXVkO4H5i4ZIt6U6doD..g.e",
  "updatedAt": "2020-02-04T17:07:36.491Z",
  "createdAt": "2020-02-04T17:07:36.491Z"
}

Error Codes & handling:
* 400: parameters validation

  "username": "String", not empty

	"email": "Email Format", not empty

	"password": "String", not empty
* 401: email not exists

  your email is not exists, try another email.
* 500: error from server

# Login
URL:/user/login

Request header:

{
  Content-Type: application/json
}

Request body:

{
	"email": "coding@gmail.com",
	"password": "secret"
}

Response:

{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJrZXZpbiIsImVtYWlsIjoia2V2aW50YW4yMDNAZ21haWwuY29tIiwiaWF0IjoxNTgwODM2MjU3fQ.8S81_wXCYenldDHYnuozbM0MoK0B0T4Z7ZoT5pafUL8"
}

Error Codes:
* 400: parameters validation

  "email": "Email Format", not empty, registered

	"password": "String", not empty, match with email
* 500: error from server


# Todo List

# List Task

URL:/todo

Request header:

{
  Content-Type: application/json
}

Request body:


Response:

{
  "id": 2,
  "title": "study",
  "description": "",
  "status": "asasa",
  "due_date": "2020-02-02T00:00:00.000Z",
  "createdAt": "2020-02-03T10:39:10.916Z",
  "updatedAt": "2020-02-03T10:39:10.916Z"
},
{
  "id": 1,
  "title": "study",
  "description": "coding",
  "status": "undone",
  "due_date": "2020-02-02T00:00:00.000Z",
  "createdAt": "2020-02-03T08:32:04.885Z",
  "updatedAt": "2020-02-03T11:09:59.421Z"
}

Error Codes:
* 500: error from server

# Create Task

Request header:

{
  Content-Type: application/json
}

Request body:

{
	"title": "study",
	"description": "coding",
	"status": "on going",
	"due_date": "2020-02-02"
}

Response:

{
  "id": 1,
  "title": "study",
  "description": "coding",
  "status": "on going",
  "due_date": "2020-02-02T00:00:00.000Z",
  "updatedAt": "2020-02-03T11:03:20.920Z",
  "createdAt": "2020-02-03T11:03:20.920Z"
}

Error Codes:
* 400: parameters validation

  "title": not empty

  "date": not empty

  "due_date": "Date Format", not empty

* 500: error from server

# Edit Task

Request header:

{
  Content-Type: application/json
}

Request body:

{
	"title": "study",
	"description": "coding",
	"status": "undone",
	"due_date": "2020-02-02"
}

Response:

{
  "id": 1,
  "title": "study",
  "description": "coding",
  "status": "undone",
  "due_date": "2020-02-02T00:00:00.000Z",
  "createdAt": "2020-02-03T08:32:04.885Z",
  "updatedAt": "2020-02-03T11:09:59.421Z"
}

Error Codes:
* 400: parameters validation

  "title": not empty

  "date": not empty

  "due_date": "Date Format", not empty

* 500: error from server


# Find Task

Request header:

{
  Content-Type: application/json
}

Request body:


Response:

{
  "id": 1,
  "title": "study",
  "description": "coding",
  "status": "on progress",
  "due_date": "2020-02-02T00:00:00.000Z",
  "createdAt": "2020-02-03T08:32:04.885Z",
  "updatedAt": "2020-02-03T11:09:59.421Z"
}

Error Codes:

* 404: Task not found

* 500: error from server


# Delete Task

Request header:

{
  Content-Type: application/json
}

Request body:


Response:

{
  "id": 3,
  "title": "study",
  "description": "coding",
  "status": "on going",
  "due_date": "2020-02-02T00:00:00.000Z",
  "createdAt": "2020-02-03T11:03:20.920Z",
  "updatedAt": "2020-02-03T11:03:20.920Z"
}

Error Codes:
* 400: Task not found

* 500: error from server

# Add Project

Error Codes:
* 400: parameters validation

  "project_name": not empty

  "status": not empty

  "due_date": "Date Format", not empty

* 500: error from server

# Add Member to project

Error Codes:
* 400: Email format, not empty, not yet added in the project

* 404: Email not found

* 500: error from server