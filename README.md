# fancy-to-do
### Deploy link API : https://whispering-plains-72637.herokuapp.com
### Deploy link Client : http://fancytodo.ilhammarzlik.com

# API Documentation

Error Response

```
{
    code: 400,
    msg: ['Validation Error']
}
{
    code: 403,
    msg: 'User not authorized'
}
{
    code: 404,
    msg: 'Data not found'
}
{
    code: 500,
    msg: 'Internal server error'
}
```

# Users routes:


## POST /users/login

Login user with registered email and password

#### Headers
```
none
```

#### Request

example :

```
{
    email: test@mail.com,
    password: password123
}
```

#### Response

```
200 : {
    result: {
        id: <user_id>,
        email: <user-email>
    }
    token: <jwt_token>
}
```

### Error response : 400, 404

## POST /users/register

Register with email and password

#### Headers
```
none
```

#### Request

example :

```
{
    email: test@mail.com,
    password: password123
}
```

#### Response

```
200 : {
    result: {
        id: <user_id>,
        email: <user-email>
    }
    token: <jwt_token>
}
```

### Error response : 400

## POST /users/google
Login user with google account

#### Headers
```
none
```

#### Request
example :
```
{
    idToken: <TOKEN_FROM_GOOGLE>
}
```
#### Response
```
200 : {
    result: {
        id: <user_id>,
        email: <user-email>
    }
    token: <jwt_token>
}
```
### Error response : 400, 404
---
# Todos routes

## GET /todos

#### Headers
```
{
    token: <JWT_TOKEN>
}
```

#### Request
```
none
```

#### Response 200
example:
```
[
    {
        "id": 70,
        "title": "test todo punya akun google",
        "description": "hello",
        "status": "ongoing",
        "due_date": "2020-02-06T00:00:00.000Z",
        "UserId": 15,
        "ProjectId": null,
        "createdAt": "2020-02-06T16:24:41.908Z",
        "updatedAt": "2020-02-06T16:24:41.908Z"
    }
]
```

### Error Reponse : 404, 403

## POST /todos

#### Headers
```
{
    token: <JWT_TOKEN>
}
```

#### Request
```
[
    {
        "title": "test todo punya akun google",
        "description": "hello",
        "due_date": "2020-02-06"
    }
]
```

#### Response 200
example:
```
[
    {
        "id": 70,
        "title": "test todo punya akun google",
        "description": "hello",
        "status": "ongoing",
        "due_date": "2020-02-06T00:00:00.000Z",
        "UserId": 15,
        "ProjectId": null,
        "createdAt": "2020-02-06T16:24:41.908Z",
        "updatedAt": "2020-02-06T16:24:41.908Z"
    }
]
```

### Error Reponse : 404, 403

## PUT /todos

#### Headers
```
{
    token: <JWT_TOKEN>
}
```

#### Request
```
[
    {
        "title": "test todo punya akun google",
        "description": "hello",
        "due_date": "2020-02-06"
    }
]
```

#### Response 200
example:
```
[
    result : 1,
    data :  {
                "id": 70,
                "title": "test todo punya akun google",
                "description": "hello",
                "status": "ongoing",
                "due_date": "2020-02-06T00:00:00.000Z",
                "UserId": 15,
                "ProjectId": null,
                "createdAt": "2020-02-06T16:24:41.908Z",
                "updatedAt": "2020-02-06T16:24:41.908Z"
            }
]
```

### Error Reponse : 404, 403

## PATCH /todos

#### Headers
```
{
    token: <JWT_TOKEN>
}
```

#### Request
```
none
```

#### Response 200
example:
```
[
    result : 1,
    data :  {
                "id": 70,
                "title": "test todo punya akun google",
                "description": "hello",
                "status": "done",
                "due_date": "2020-02-06T00:00:00.000Z",
                "UserId": 15,
                "ProjectId": null,
                "createdAt": "2020-02-06T16:24:41.908Z",
                "updatedAt": "2020-02-06T16:24:41.908Z"
            }
]
```

### Error Reponse : 404, 403

## DELETE /todos

#### Headers
```
{
    token: <JWT_TOKEN>
}
```

#### Request
```
none
```

#### Response 200
example:
```
[
    rmessage : "todo deleted",
    data :  {
                "id": 70,
                "title": "test todo punya akun google",
                "description": "hello",
                "status": "ongoing",
                "due_date": "2020-02-06T00:00:00.000Z",
                "UserId": 15,
                "ProjectId": null,
                "createdAt": "2020-02-06T16:24:41.908Z",
                "updatedAt": "2020-02-06T16:24:41.908Z"
            }
]
```

### Error Reponse : 404, 403

# Project routes

## GET /projects/my-projects

#### Headers
```
{
    token: <JWT_TOKEN>
}
```

#### Request
```
none
```

#### Response 200
example:
```
[
    {
        "ProjectId": 19,
        "UserId": 15,
        "status": "join",
        "createdAt": "2020-02-06T16:04:59.135Z",
        "updatedAt": "2020-02-06T16:04:59.135Z",
        "Project": {
            "id": 19,
            "name": "Phase 3",
            "owner": 15,
            "createdAt": "2020-02-06T16:04:59.094Z",
            "updatedAt": "2020-02-06T16:04:59.094Z"
        }
    }
]
```

### Error Reponse : 404, 403

## GET /projects/:projectId
Get detailed projects

#### Headers
```
{
    token: <JWT_TOKEN>
}
```

#### Request
```
none
```

#### Response 200
example:
```
{
    "data": {
        "id": 19,
        "name": "Phase 3",
        "owner": 15,
        "members": [
            "drillenthusiast@gmail.com",
            "ilham@gmail.com"
        ]
    },
    "todos": [
        {
            "id": 87,
            "title": "sdasd",
            "description": "aaaaa",
            "status": "ongoing",
            "due_date": "2020-02-10T00:00:00.000Z",
            "UserId": 1,
            "ProjectId": 19,
            "createdAt": "2020-02-07T11:36:25.059Z",
            "updatedAt": "2020-02-07T11:36:25.059Z"
        },
        {
            "id": 69,
            "title": "Berhasil sign in google",
            "description": "Hello semua",
            "status": "ongoing",
            "due_date": "2020-02-07T00:00:00.000Z",
            "UserId": 1,
            "ProjectId": 19,
            "createdAt": "2020-02-06T16:05:51.964Z",
            "updatedAt": "2020-02-06T16:05:51.964Z"
        }
    ]
}
```

### Error Reponse : 404, 403

## POST /projects

#### Headers
```
{
    token: <JWT_TOKEN>
}
```

#### Request
```
{
    name: <project-name>
}
```

#### Response 200
example:
```
{
    "projectData": {
        "id": 22,
        "name": "Test Project",
        "owner": 2,
        "updatedAt": "2020-02-08T10:43:05.043Z",
        "createdAt": "2020-02-08T10:43:05.043Z"
    },
    "final": {
        "UserId": 2,
        "ProjectId": 22,
        "status": "join",
        "updatedAt": "2020-02-08T10:43:05.110Z",
        "createdAt": "2020-02-08T10:43:05.110Z",
        "id": 47
    }
}
```

### Error Reponse : 400, 403

## GET /projects/user/invitation
Get all user invitation

#### Headers
```
{
    token: <JWT_TOKEN>
}
```

#### Request
```
{
    name: <project-name>
}
```

#### Response 200
example:
```
[
    {
        "ProjectId": 19,
        "UserId": 15,
        "status": "pending",
        "createdAt": "2020-02-06T16:04:59.135Z",
        "updatedAt": "2020-02-06T16:04:59.135Z",
        "Project": {
            "id": 19,
            "name": "Phase 3",
            "owner": 15,
            "createdAt": "2020-02-06T16:04:59.094Z",
            "updatedAt": "2020-02-06T16:04:59.094Z"
        }
    }
]
```


### Error Reponse : 400, 403

## DELETE /projects/:projectId
Delete single project

#### Headers
```
{
    token: <JWT_TOKEN>
}
```

#### Request
```
{
    name: <project-name>
}
```

#### Response 200
example:
```
{
    msg: "Project deleted"
}
```
### Error Reponse : 400, 403


```
$ npm install
$ npm run dev
```
