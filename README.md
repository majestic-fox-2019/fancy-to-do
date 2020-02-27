# fancy-to-do
Fancy To-Do List API

Todo Todo is a website that allows its user to create to do list, be it personal or even project. Integrated with Calendarific API that would notify user about holidays when the user is about to make to do list for project.

  - Built with jquery, implementing Single Page Application 
 - Built with rest API
 - Data storage is in Postgres utilizing sequelize
# Usage
Make sure to install all dependencies on both client and server side
> npm install

Assuming that live-server has been installed globally, on the client side run :
> live-server --host=localhost

On the server side, run:
>npm run dev
# User Route
| Route | HTTP | Headers | Request | Response | Description|
| ----------- | ----------- |----------- |----------- | ----------- |-------|
| /user/register |null| POST |username, email, password, token|201(Created), 500(Internal Server Error)|Sign in to the website|
| /users/login |null| POST |email,  password|200(Created), 500(Internal Server Error)|Log in to the website|
| /user/google |null| POST |email,  password, username|201(Created), 500(Internal Server Error)|Google Sign in|
| /user/facebook |null| POST |email,  password, username|201(Created), 500(Internal Server Error)|Facebook Sign in|

# Todo Route
| Route | HTTP | Headers | Request | Response | Description|
| ----------- | ----------- |----------- |----------- | ----------- |-------|
| /todos | POST |token|title, description, status, due_date|201(Created),500(Internal Server Error) |Create Todo
| /todos| GET |null|null|201(OK),500(Internal Server Error) |Edit Question (authenticated User)
| /todos/:id | GET |null|null|200(OK), 500(Internal Server Error)|Get to do by id
| /todos/:id| PUT |token|title, description, status, due_date|200(OK),500(Internal Server Error) |Edit to do  (authenticated and authorized)
| /all/mine| GET |token|null|200(OK),500(Internal Server Error) |Get my To do list


# Project Route
| Route | HTTP | Headers | Request | Response | Description|
| ----------- | ----------- |----------- |----------- | ----------- |-------|
| /projects | POST |token|null|201(Created),500(Internal Server Error), 401(unauthorized) |Create new project (authenticated and authourized)
| /projects| GET |null|null|201(Created),500(Internal Server Error) |Get all projects
| /projects/todo/:idProject | POST |token|title, description, status, due_date|200(OK), 500(Internal Server Error), 401(unauthorized)|Add to do to selected project (authenticated and authorized)
| /projects/todo/:idProject | PUT |token|title, description, status, due_date|200(OK), 500(Internal Server Error), 401(unauthorized)|Add to do to selected project (authenticated and authorized)
| /projects/todo/:idProject | DELETE |token|null|201(OK), 500(Internal Server Error), 401(unauthorized)|Add to do to selected project (authenticated and authorized)
| /projects/all/todo/:idProject | GET |token|null|200(OK), 500(Internal Server Error)|See all to do in project 
| /projects/all/members/:idProject  | GET |token|null|200(OK),500(Internal Server Error) |Get all members of the selected project
| /projects/myProjects| GET |token|null|200(OK),500(Internal Server Error) |Get my projects 
| /projects/addMember/:idProject| POST |token|email|200(OK),500(Internal Server Error) |Invite member to selected project
| /projects/api/name/:id| GET |token|null|200(OK),500(Internal Server Error) |Get project's name by id
| /projects/:idProject| DELETE |token|null|200(OK),500(Internal Server Error) |Delete project

## POST /user/register
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
- Request Body:
  - `email`: `String (required, unique)`
  - `password`: `String (required, min length: 6)`
  - `username`: `String`
- Response:
  - `status`: `201`
  - `body`:
    ```
    {
    userRegistered{
      "id": "...",
      "email": "...",
      "password": "...",
      "username" : "...."
    },
    token: "........"
    }
    ```
## POST /user/login
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
- Request Body:
  - `email`: `String (required, unique)`
  - `password`: `String (required, min length: 6)`
  
- Response:
  - `status`: `200`
  - `body`:
    ```
    {
    userFound{
      "id": "...",
      "email": "...",
      "password": "...",
      "username" : "...."
    },
    token: "........"
    }
    ```
    
## POST /user/google
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
- Request Body:
  - `id_token`: `String (required)`
 
- Response:
  - `status`: `200`
  - `body`:
    ```
    {
    userFromGoogle{
      "id": "...",
      "email": "...",
      "password": "...",
      "username" : "...."
    },
    token: "........"
    }
    ```
## POST /user/facebook
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
- Request Body:
   - `email`: `String (required, unique)`
  - `password`: `String (required, min length: 6)`
 
- Response:
  - `status`: `200`
  - `body`:
    ```
    {
    userFromGoogle{
      "id": "...",
      "email": "...",
      "password": "...",
      "username" : "...."
    },
    token: "........"
    }
    ```
    
## POST /todos
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
  - `token` : `String`
- Request Body:
   - `title`: `String (required)`
  - `description`: `String (required)`
  - `due_date`: `Date(required)`
  - `status`: `Boolean(required)`
  
- Response:
  - `status`: `201`
  - `body`:
    ```json
    {
      "id": "...",
      "status": "...",
      "title": "...",
      "description" : "...."
      "due_date" : "...."
      "UserId" : "....",
      "ProjectId" : "....",
      "createdAt" : "....",
      "updatedAt" : "...."
    }
    ```
## PUT /todos/:id
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
  - `token` : `String`
- Request Body:
   - `title`: `String (required)`
  - `description`: `String (required)`
  - `due_date`: `Date(required)`
  - `status`: `Boolean(required)`
  
- Response:
  - `status`: `200`
  - `body`:
    ```json
    {
      "id": "...",
      "status": "...",
      "title": "...",
      "description" : "...."
      "due_date" : "...."
      "UserId" : "....",
      "ProjectId" : "....",
      "createdAt" : "....",
      "updatedAt" : "...."
    }
    ```
## DELETE /todos/:id
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
  - `token` : `String`
  
- Response:
  - `status`: `201`
  - `body`:
    ```json
    {
      "id": "...",
      "status": "...",
      "title": "...",
      "description" : "...."
      "due_date" : "...."
      "UserId" : "....",
      "ProjectId" : "....",
      "createdAt" : "....",
      "updatedAt" : "...."
    }
    ```
    
## GET /todos/all/mine
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
  - `token` : `String`
  
- Response:
  - `status`: `200`
  - `body`:
    ```
    [ {
      "id": "...",
      "status": "...",
      "title": "...",
      "description" : "...."
      "due_date" : "...."
      "UserId" : "....",
      "ProjectId" : "....",
      "createdAt" : "....",
      "updatedAt" : "...."
    }]
    ```
## POST /projects
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
  - `token` : `String`
- Request Body:
   - `name`: `String (required)`
  
  
- Response:
  - `status`: `201`
  - `body`:
    ```json
    {
      "id": "...",
      "name": "...",
      "UserId": "...",
      "ProjectId" : "...."
    }
    ```
## POST /projects/addMembers/:idProject
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
  - `token` : `String`
- Request Body:
   - `email`: `String (required)`
  
- Response:
  - `status`: `200`
  - `body`:
    ```json
    {
      "ProjectId": "...",
      "UserId": "...",
      "name": "...",
    }
    ```

## POST /todo/:idProject
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
  - `token` : `String`
- Request Body:
   - `title`: `String (required)`
  - `description`: `String (required)`
  - `due_date`: `Date(required)`
  - `status`: `Boolean(required)`
  
- Response:
  - `status`: `201`
  - `body`:
    ```json
    {
      "id": "...",
      "status": "...",
      "title": "...",
      "description" : "...."
      "due_date" : "...."
      "UserId" : "....",
      "ProjectId" : "....",
      "createdAt" : "....",
      "updatedAt" : "...."
    }
    ```
## PUT /todo/:idProject
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
  - `token` : `String`
- Request Body:
   - `title`: `String (required)`
  - `description`: `String (required)`
  - `due_date`: `Date(required)`
  - `status`: `Boolean(required)`
  
- Response:
  - `status`: `200`
  - `body`:
    ```json
    {
      "id": "...",
      "status": "...",
      "title": "...",
      "description" : "...."
      "due_date" : "...."
      "UserId" : "....",
      "ProjectId" : "....",
      "createdAt" : "....",
      "updatedAt" : "...."
    }
    ```
## DELETE /todos/:id
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
  - `token` : `String`

  
- Response:
  - `status`: `200`
  - `body`:
    ```json
    {
      "id": "...",
      "status": "...",
      "title": "...",
      "description" : "...."
      "due_date" : "...."
      "UserId" : "....",
      "ProjectId" : "....",
      "createdAt" : "....",
      "updatedAt" : "...."
    }
    ```
## DELETE /projects/:idProject
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
  - `token` : `String`
  
- Response:
  - `status`: `200`
  - `body`:
    ```json
    {
      "message": "..."
    }
    ```
    
## Environment
The following variable are the needed environment to be set before running the program
```
JWT_SECRET=
CLIENT_ID=
DEFAULT_PASSWORD=
```



