# fancy-to-do
Fancy To-Do List API

#### Getting Started

Welcome to fancy-to-do API documentation, You can use the API to access fancy-to-do API
endpoints.

First of all you need some dependencies

```
//install some core application
$sudo apt-get install nodejs
$sudo apt-get install npm

//install dependecies
$npm install

//running the server
$npm run dev
```

All API can be accessed from the `http:localhost:3000`

To use API endpoints, the format is as follows:

`http://localhost:3000/{resource}`

###  Users Login & Register

------

##### POST `/todo/users/register`

```
url: 'http://localhost:3000/users/register',
method:'POST',
body:{
	'name': 'your full name',
	'email': 'your@mail.com',
	'password': 'yourpassword'
}

response: {
	{
		name: "your name",
		email: "your@mail.com",
		password: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzJkOWNkZTg4NzU5MjI3Yj"
	}
}
```
##### POST `/todo/users/login`

```
url: 'http://localhost:3000/users/register',
method:'POST',
body:{
	'email': 'your@mail.com',
	'password': 'yourpassword'
}

response: {
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzJkOWNkZTg4NzU5MjI3Yjc2YjQwZCIsInVzZXJuYW1lIjoidXNlcnRlc3Rkb2MiLCJpYXQiOjE1ODAzOTA4NjF9.BQy_CFlWbEN3_HR9i2hiYnledD2ojH3YPFmp7iHj36Q",
	"user":{
		name: "your name"
		email: "your@mail.com"
	}
}

```

### Todo

-----

##### POST `/todo/`

```
url: 'http://localhost:3000/todo/',
method: 'POST',
body:{
	'tittle': 'your tittle',
	'description': 'your description',
	'status': 'your status (done/not yet)'
	'due_date': 'date'
}

response: {
	'tittle': 'your tittle',
	'description': 'your description',
	'status': 'your status (done/not yet)'
	'due_date': 'date'
}
```
##### GET `/todo/`

```
url: 'http://localhost:3000/todo',
method: 'GET',
response:
[
    {
        "id": 5,
        "tittle": "your tittle",
        "description": 'your description',
        "status": "done"/"not yet",
        "due_date": "2020-02-03T00:00:00.000Z",
        "createdAt": "2020-02-03T07:38:38.418Z",
        "updatedAt": "2020-02-03T07:40:20.117Z"
    }
]
```
##### GET `/todo/{id}`

```
url:'http://localhost:3000/todo/5',
method:'GET',
response: {
	   "id": 5,
        "tittle": "your tittle",
        "description": 'your description',
        "status": "done"/"not yet",
        "due_date": "2020-02-03T00:00:00.000Z",
        "createdAt": "2020-02-03T07:38:38.418Z",
        "updatedAt": "2020-02-03T07:40:20.117Z"
}

```
##### UPDATE `/todo/{id}`

```
url:'http://localhost:3000/todo/5',
method: 'UPDATE',
body: {
	"tittle": 'your tittle update',
	"description": 'your description update',
	"status": 'your status update (done/not yet)'
}
response: {
    "id": 5,
    "tittle": 'your tittle update',
    "description": 'your description update',
    "status": 'your status update (done/not yet)'
    "due_date": "2020-02-03T00:00:00.000Z",
    "createdAt": "2020-02-03T07:38:38.418Z",
    "updatedAt": "2020-02-03T07:40:20.117Z"
}
```
##### DELETE `/todo/{id}`

```
url: 'http://localhost:3000/todo/5',
method: 'DELETE'
response: {
	"id": 5,
    "tittle": 'your tittle update',
    "description": 'your description update',
    "status": 'your status update (done/not yet)'
    "due_date": "2020-02-03T00:00:00.000Z",
    "createdAt": "2020-02-03T07:38:38.418Z",
    "updatedAt": "2020-02-03T07:40:20.117Z"
}
```

### ERROR HANDLING

------

- Validation Login

```
Status Code : 400
response: {
    "errors": [
        "title cannot be empty",
        "description cannot be empty",
        "status cannot be empty",
        "date cannot be empty"
    ]
}
```

- Not Found

```
Status Code: 404
response:{
    "message": "data not found"
}
```

- Token Validation

```

```

- Unauthorized

```

```

- Validation Error

```

```

- Internal Server Error

```
Status Code: 500
response:{
	"message": "internal server error"
}
```