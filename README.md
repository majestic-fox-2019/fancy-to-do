# fancy-to-do
Fancy To-Do List API

Route on My Fancy To-Do LIST API is:
<br>
## 1. GET /todos

    To Find All Todos

* **URL:**

http://localhost:3000/todos

* **REQUEST HEADER**

```javascript
{
    "token": "<<jwt_token>>"
}
```

* **RESPONSE**

If request success and data available on server:

* Status Code: 200

```javascript
  [
    {
        "id": 1,
        "title": "Playing Football",
        "description": "Playing football with elementary school friends",
        "status": false,
        "due_date": "2000-12-31T17:00:00.000Z",
        "createdAt": "2020-02-03T10:22:00.084Z",
        "updatedAt": "2020-02-03T12:21:11.139Z"
    },
    {
        "id": 2,
        "title": "Learn REST API",
        "description": "Learn how to create RESTful API with Express and Sequelize",
        "status": false,
        "due_date": "2020-01-29T00:00:00.000Z",
        "createdAt": "2020-02-03T10:23:12.635Z",
        "updatedAt": "2020-02-03T10:23:12.635Z"
    }
]
```

If request success but there is no data on server:

* Status Code: 200

```javascript
{
    "message": "Data is empty."
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```


## 2. GET      /todos/:id

    Find Todos by Id

* **EXAMPLE URL:**

http://localhost:3000/todos/1

* **REQUEST HEADER**

```javascript
{
    "token": "<<jwt_token>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "id": 1,
    "title": "Playing Football",
    "description": "Playing football with elementary school friends",
    "status": false,
    "due_date": "2000-12-31T17:00:00.000Z",
    "createdAt": "2020-02-03T10:22:00.084Z",
    "updatedAt": "2020-02-03T12:21:11.139Z"
}
```

If request failed because id todo not found:

* Status Code: 404

```javascript
{
    "message": "Not Found"
}
```


## 3. POST /todos
    Add/Create Todo

* **EXAMPLE URL:**

http://localhost:3000/todos/1

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```

* **REQUEST BODY**

```javascript
{
    "title": "Coding",
    "description": "Code somecode on codewars.",
    "status": false,
    "due_date": "2000-12-31T17:00:00.000Z"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "id": 1,
    "title": "Coding",
    "description": "Code somecode on codewars.",
    "status": false,
    "due_date": "2000-12-31T17:00:00.000Z",
    "updatedAt": "2020-02-03T12:45:11.380Z",
    "createdAt": "2020-02-03T12:45:11.380Z"
}
```

If request failed because validation is not complete:

* Status Code: 400

```javascript
[
    {
        "status": 400,
        "msg": "<<params_is_empty>>"
    }
]
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```


## 4. PUT      /todos/:id 
    Update Todo

* **EXAMPLE URL:**

http://localhost:3000/todos/1

* **REQUEST HEADER**
```javascript
{
    "Content-Type": "application/json; charset=utf-8",
    "token": "<<jwt_token>>"
}
```

* **REQUEST BODY**
```javascript
{
    "title": "Coding",
    "description": "Code somecode on codewars.",
    "status": false,
    "due_date": "2000-12-31T17:00:00.000Z"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "title": "Coding",
    "description": "Code somecode on codewars.",
    "status": false,
    "due_date": "2000-12-31T17:00:00.000Z"
}
```

If request failed because id todo not found:

* Status Code: 404

```javascript
{
    "message": "Not Found"
}
```

If request failed because validation is not complete:

* Status Code: 400

```javascript
[
    {
        "status": 400,
        "msg": "<<params_that_empty"
    }
]
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```


## 5. DELETE   /todos/:id 
    Delete Todo

* **EXAMPLE URL:**

http://localhost:3000/todos/1

* **REQUEST HEADER**

```javascript
{
    "token": "<<jwt_token>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "id": 1,
    "title": "Dating",
    "description": "Date at Pondok Indah Mall at 6PM",
    "status": false,
    "due_date": "2000-12-31T17:00:00.000Z",
    "createdAt": "2020-02-03T12:45:11.380Z",
    "updatedAt": "2020-02-03T12:45:11.380Z"
}
```
If request failed because id todo not found:

* Status Code: 404

```javascript
{
    "message": "Not Found"
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 6. POST   /user 
    Register to be member Fancy ToDo

* **EXAMPLE URL:**

http://localhost:3000/user

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8"
}
```

* **REQUEST BODY**
```javascript
{
    "email": "<<your_email>>",
    "password": "<<your_password>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "id": 1,
    "email": "fajrin@oke.com",
    "password": "$2b$10$YOA.1DTgLgpxlQyg0pEImevUpw3BcRxmjdALJB0BZdZj.voB046Ti",
    "updatedAt": "2020-02-08T09:50:25.644Z",
    "createdAt": "2020-02-08T09:50:25.644Z"
}
```

If request failed because validations error:

* Status Code: 400

```javascript
[
    {
        "status": 400,
        "msg": "<<params_that_empty>>"
    }
]
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```

## 7. POST   /login
    Login to Fancy ToDo

* **EXAMPLE URL:**

http://localhost:3000/login

* **REQUEST HEADER**

```javascript
{
    "Content-Type": "application/json; charset=utf-8"
}
```

* **REQUEST BODY**
```javascript
{
    "email": "<<your_email>>",
    "password": "<<your_password>>"
}
```

* **RESPONSE**

If request success:

* Status Code: 200

```javascript
{
    "token": "<<jwt_token>>"
}
```

If request failed because id todo not found:

* Status Code: 404

```javascript
{
    "error": "Not Found"
}
```

If request failed caused by server:

* Status Code: 500

```javascript
Internal Server Error
```
