# fancy-todo

Your Everyday Todo List App!

### Web URL:

```
http://fancytodov2.s3-website-ap-southeast-1.amazonaws.com/
```



### Server  URL:

```
http://fancy-todo-v2.herokuapp.com
```



#### Before you do anything else..

```
$ npm install
```



## .ENV Tempelates

```
JWT_SECRET ==> Your Preferred Json Web Token Secret
GOOGLE_ID ==> Your Google Oauth Client Id
DEFAULT_PASSWORD ==> Your Preferred Default Password
SEND_GRID_KEY ==> Your SendGrid API Key
```



## Database and ORM

- Postgres
- Sequelize ORM



## Main Routes

|  Routes   |
| :-------: |
|     /     |
|  /login   |
|  /todos   |
| /projects |
| /sendMail |



| Route       | Method | Body                                                         | query | Result                                                       |
| ----------- | ------ | ------------------------------------------------------------ | ----- | ------------------------------------------------------------ |
| /           | post   | userName: <string><br />email:<string><br />password:<string> |       | Status Code: 201,<br />returns token: ` JWT token`           |
| /login      | post   | email:<string><br />password:<string>                        |       | Status Code: 200,<br />returns token:  `JWT token`           |
| /googleSign | post   | gToken: <google token>                                       |       | StatusCode: 200 \|\| 201 (new user),<br />returns token: `JWT token` |



Error status codes :

- 404 : 'Invalid Email or Password'
- 500: 'Internal Server Error'



## Todos Route

Headers: 

- Token : `JWT Token`	

| Route               | Method | Body                                                         | Query | Result                                                       |
| ------------------- | ------ | ------------------------------------------------------------ | ----- | ------------------------------------------------------------ |
| /                   | get    |                                                              |       | Status Code: 200,<br />returns an Array of TodoList          |
| /                   | post   | name:<string>,<br />description:<string>,<br />status:<string>,<br />due_date:<date>,<br />UserId:<integer>,<br />ProjectId:<integer> |       | Status Code: 201,<br />returns :<br /> name: `Todo Title`,<br />description:`Todo Description`,<br />status: `Todo Status ('Finished' || 'Not Done' || 'Expired')`,<br />UserId:`Todo Owner`<br />ProjectId:`(Not required) Todo's ProjectId`,<br />due_date:`Todo's due date` |
| /:id                | get    |                                                              |       | Status Code: 200,<br />returns an Object of Todo             |
| /:id                | delete |                                                              |       | Status Code: 200,<br />returns the number of deleted Todo(s) |
| /:id                | put    | name:<string>,<br />description:<string><br />due_date:<date>,<br />status:<string> |       | Status Code: 200,<br />returns :<br /> name: `Todo Title`,<br />description:`Todo Description`,<br />status: `Todo Status ('Finished' || 'Not Done' || 'Expired'`,<br />due_date: `Todo's due date` |
| /status/ :status    | patch  | status: <String>                                             |       | Status Code: 200,<br />returns :<br /> name: `Todo Title`,<br />description:`Todo Description`,<br />status: `Todo Status` |
| /project/:projectId | get    |                                                              |       | Status Code: 200,<br />returns an Object of Todo             |
| /project/:projectId | post   | name:<string>,<br />description:<string>,<br />status:<string>,<br />due_date:<date>,<br />UserId:<integer>,<br />ProjectId:<integer> |       | Status Code: 201,<br />returns :<br /> name: `Todo Title`,<br />description:`Todo Description`,<br />status: `Todo Status ('Finished' || 'Not Done' || 'Expired)`',<br />due_date: `Todo's due date` |
| /project/:id        | patch  | status: <String>                                             |       | Status Code: 200,<br />returns :<br /> name: `Todo Title`,<br />description:`Todo Description`,<br />status: `Todo Status` |
| /project/:id        | delete |                                                              |       | statusCode:200,<br />returns the number of deleted Todos     |
| /project/:id        | put    | name:<string>,<br />description:<string>,<br />status:<string>,<br />due_date:<date>,<br />UserId:<integer>,<br />ProjectId:<integer> |       | Status Code: 200,<br />returns :<br /> name: `Todo Title`,<br />description:`Todo Description`,<br />status: `Todo Status ('Finished' || 'Not Done' || 'Expired')`,<br />due_date: `Todo's due date` |

Error status codes :

- 401 : 'You need to login to see this page' || 'You are not authorized to access this todo'
- 404: 'Todo not Found'
- 400: 'Invalid token'
- 500: 'Internal Server Error'



## Projects Route

Headers: 

- Token : `JWT Token`	

| Route              | Method | Body                                                         | Query | Result                                                       |
| ------------------ | ------ | ------------------------------------------------------------ | ----- | ------------------------------------------------------------ |
| /                  | get    |                                                              |       | Status Code: 200,<br />returns an Array of Projects          |
| /                  | post   | name:<string>                                                |       | Status Code: 201,<br />returns :<br /> Conjuction Table data |
| /:projectId        | get    |                                                              |       | Status Code: 200,<br />returns Array of members in a project |
| /addMember         | post   |                                                              |       | Status Code: 200,<br />returns Conjuction Table data         |
| /member/:projectId | delete | name:<string>,<br />description:<string><br />due_date:<date>,<br />status:<string> |       | Status Code: 200,<br />returns :<br /> the number of Conjuction Table data deleted |
| /:projectId        | delete | status: <String>                                             |       | Status Code: 200,<br />returns :<br /> the number of Project(s) deleted |

Error status codes :

- 401 : 'You need to login to see this page' || 'You are not authorized to access this todo' || 'You are not authorized to access this project' || 'Only project owner are allowed to delete this project'

- 404: 'User not found' || 'Project not found'

- 400: 'Invalid token' || 'Member is already in this Project'

- 500: 'Internal Server Error'

  

## sendMail Route

Headers: 

- Token : `JWT Token`	

| Route | Method | Body            | Query | Result                                                       |
| ----- | ------ | --------------- | ----- | ------------------------------------------------------------ |
| /     | post   | email: <string> |       | Status Code: 200,<br />returns 'Mail Sent Message',<br />sends an email to user via SendGrid |

Error status codes :

- 401 : 'You need to login to see this page' || 'You are not authorized to access this project'
- 404: 'User not found' || 'Project not found'
- 400: 'Invalid token'
- 500: 'Internal Server Error'



# Middlewares

This app uses 2 middlewares **Authentication** , **Authorization** , **projectNameGetter** and **ErrorHandler**



### Authentication:

​		Decrypts JWT token

### Authorization:

​		Makes sure no User can access another User's Todo data

### projectNameGetter:

​		Gets project name for the purpose of sending email

### ErrorHandler:

​		Handles all errors

