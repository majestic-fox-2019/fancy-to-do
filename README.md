# fancy-to-do
Fancy To-Do List API

# Api Documentation
Base URL : http://localhost:3000

[Todo list](list)
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


# Todo List {#list}


URL:/todo

Request header:

{
  Content-Type: application/json
}

Request body:


Response:

[
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
]

Error Codes:
* 500: error from server

[List](documentation/list.txt) | 
[Create](documentation/create.txt) |
[Edit](documentation/update.txt) |
[Find](documentation/find.txt) |
[Delete](documentation/delete.txt)