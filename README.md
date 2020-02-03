# fancy-to-do API Documentation
Fancy To-Do List API

Error Response
```
{
    code: 400,
    msg: 'Validation Error'
}
{
    code: 401,
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

Users routes:

Route | HTTP | Header(s) | Body | Description | Response |
------|------|-----------|------|-------------|----------|
_users/register_ | **POST** | none | email, password | Register new uer | (201) Success {id, email, token}, (400) Validate error
_users/login_ | **POST** | none | email, password | Normal login with jwt | (200) Success {id, email, token}, (404) Not Found, need register
 
Todos routes: 

Route | HTTP | Header(s) | Body | Description | Response |
------|------|-----------|------|-------------|----------|
_/todos_ | **GET**| none | none | Get all todos list | (200) Success {object data}, (404) Error |
_/todos/:id_ | **GET** | {token: ACCESS_TOKEN} | none | Get all user's todos | (200) Success {object data}, (401) Error |
_/todos/:id_  | **POST**  | {token: ACCESS_TOKEN} | {title:string, description:string, due_date:date}  | Post a new Todo | (201) OK {object data}, (400) Error  |
_/todos/:id_| **PUT** | {token: ACCESS_TOKEN} | {title:string, description:string, due_date:date} | Update a Todo | (200) OK {object data}, (401) Error |
_/todos/:id_   | **DELETE** | {token: ACCESS_TOKEN} | none | Delete a todo | (200) OK {object data}, (401) Error |
_/question/:id_ | **PATCH**| {token: ACCESS_TOKEN} | {status:string} | Update status todo | (200) OK {object data}, (401) Error |

```
$ npm install
$ npm start