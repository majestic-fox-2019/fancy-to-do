# Fancy-To-Do


## Getting Started

#### Install Package

```javascript
npm install
```



#### Getting API KEY

Register on darksky and SendGrid to get the API key

##### link:

DarkSky

<u>https://darksky.net/dev</u>

SendGrid

<u>https://sendgrid.com/</u>

## ROUTE

#### Routes /todos

| Method | Route      | Description                |
| ------ | ---------- | -------------------------- |
| POST   | /todos     | Create a to-do             |
| GET    | /todos     | Get all list to-dos        |
| GET    | /todos/:id | Get  a to-do based on id   |
| PUT    | /todos/:id | Update a to-do based on i  |
| DELETE | /todos/:id | Delete a to-do based on id |

#### Route /register

| Method | Route     | Description    |
| ------ | --------- | -------------- |
| POST   | /register | Create an user |

#### Route /login

| Method | Route  | Description   |
| ------ | ------ | ------------- |
| POST   | /login | Login an user |



## 1. POST /todos (create)

#### Schema:
​	Value :

* title: string,
* description: string,
* status: boolean,
* due_date: date

##### Request Body:

```json
{
	"title": "Learn REST API",
	"description":"Learn how to create RESTful API with Express and Sequelize",
	"status":true,
	"due_date":"2020-01-29"
}
```

#### Response:

##### 		success:

* 201

```json
{
    "id": 16,
    "title": "Learn REST API",
    "description": "Learn how to create RESTful API with Express and Sequelize",
    "status": true,
    "due_date": "2020-01-29T00:00:00.000Z",
    "updatedAt": "2020-02-03T10:54:12.837Z",
    "createdAt": "2020-02-03T10:54:12.837Z"
}
```
##### 	error:

* 400

    ```json
    {
    "message": "Validation error: description must be filled"
    }
   ```





# 2. Get /todos 
##### Request Parameter:

```javascript
http://localhost:3000/todos
```
#### Response:

##### 		success:

- 200

```json
[
    {
        "id": 15,
        "title": "Learn REST API",
        "description": "Learn how to create RESTful API with Express and Sequelize",
        "status": true,
        "due_date": "2020-01-29T00:00:00.000Z",
        "createdAt": "2020-02-03T09:42:18.954Z",
        "updatedAt": "2020-02-03T09:42:18.954Z"
    }
]
```

# . Get /todos/:id 
##### Request parameter:

```javascript
http://localhost:3000/todos/12
```

#### response:

##### 		success:

- 200

```json
{
    "id": 12,
    "title": "makandsd",
    "description": "makan nasi",
    "status": true,
    "due_date": "2020-02-03T06:54:46.000Z",
    "createdAt": "2020-02-03T08:44:32.290Z",
    "updatedAt": "2020-02-03T08:44:32.290Z"
}
```

##### 		error:

- 404

```json
{
    "message": "command not found"
}
```



# 4. Put /todos/:id (update)

##### request parameter:

```javascript
http://localhost:3000/todos/12
```

##### request body:

```javascript
{
    "title": "berlari",
    "description": "berlari di taman",
    "status": false,
    "due_date": "2020-02-03T06:54:46.000Z",
    "createdAt": "2020-02-03T08:44:32.290Z",
    "updatedAt": "2020-02-03T08:44:32.290Z"
}
```

##### response :

##### 	Success

- 200

```javascript
{
    "id": 12,
    "title": "berlari",
    "description": "berlari di taman",
    "status": false,
    "due_date": "2020-02-03T06:54:46.000Z",
    "createdAt": "2020-02-03T08:44:32.290Z",
    "updatedAt": "2020-02-03T11:07:34.782Z"
}
```

##### 	Error

- 400

```json
{
 "message": "Validation error: description must be filled"
 }
```

- 404

```json
{
    "message": "command not found"
}
```



# 5. Delete todos/:id

##### Request parameter:

```javascript
http://localhost:3000/todos/12
```

##### Response:

##### 	Success

- 200

```javascript
{
    "id": 12,
    "title": "berlari",
    "description": "berlari di taman",
    "status": false,
    "due_date": "2020-02-03T06:54:46.000Z",
    "createdAt": "2020-02-03T08:44:32.290Z",
    "updatedAt": "2020-02-03T11:07:34.782Z"
}
```

##### Error:

- 404

```json
{
    "message": "command not found"
}
```



## 6. POST /register

##### Request body:

```json
{
    "id": 51,
    "username": "user",
    "password": "user",
    "name": "tambah",
    "email": "tambah@email.com"
}
```

##### Response:

##### 	Success

- 201

```json
{
    "id": 51,
    "username": "user",
    "password": "$2a$10$4KE6cyadeGnkmJotn6y4E.UBL6avbTx0Nod.VUjnE69m3l.U0PIi.",
    "name": "tambah",
    "email": "tambah@email.com",
    "updatedAt": "2020-02-08T08:31:08.131Z",
    "createdAt": "2020-02-08T08:31:08.131Z"
}
```

##### 	Error

- 400

```json
{
 "message": "Validation error: username must be filled"
 }
```



## 7.POST LOGIN

##### Request Body

```json
{
  "email": "tambah@email.com",  
  "password": "user"
}
```

##### Response:

- 404

```json
{
 "message": "Username or password wrong'"
 }
```

