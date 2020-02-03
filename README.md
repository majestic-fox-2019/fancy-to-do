# fancy-todo

Your Everyday Todo List App!



#### Before you do anything else..

```
$ npm install
```



## .ENV Tempelates

```
JWT_SECRET ==> Your Preferred Json Web Token Secret
```



## Database and ORM

- Postgres
- Sequelize ORM



## Main Routes

| Routes |
| :----: |
|   /    |
| /login |
| /todos |



| Route  | Method | Body                                                         | query | Result                                             |
| ------ | ------ | ------------------------------------------------------------ | ----- | -------------------------------------------------- |
| /      | post   | userName: <string><br />email:<string><br />password:<string> |       | Status Code: 201,<br />returns token: ` JWT token` |
| /login | post   | email:<string><br />password:<string>                        |       | Status Code: 200,<br />returns token:  `JWT token` |



## Todos Route

Headers: 

- Token : `JWT Token`	

| Route | Method | Body                                                         | Query | Result                                                       |
| ----- | ------ | ------------------------------------------------------------ | ----- | ------------------------------------------------------------ |
| /     | get    |                                                              |       | Status Code: 200,<br />returns an Array of TodoList          |
| /     | post   | name:<string>,<br />description:<string>,<br />status:<string>,<br />due_date:<date>,<br />UserId:<integer>,<br />ProjectId:<integer> |       | Status Code: 201,<br />returns :<br /> name: `Todo Title`,<br />description:`Todo Description`,<br />status: `Todo Status ('Finished' || 'Not Done' || 'Expired')`,<br />UserId:`Todo Owner`<br />ProjectId:`(Not required) Todo's ProjectId`,<br />due_date:`Todo's due date` |
| /:id  | get    |                                                              |       | Status Code: 200,<br />returns an Object of Todo             |
| /:id  | delete |                                                              |       | Status Code: 200,<br />returns the number of deleted Todo(s) |
| /:id  | put    | name:<string>,<br />description:<string><br />due_date:<date>,<br />status:<string> |       | Status Code: 200,<br />returns :<br /> name: `Todo Title`,<br />description:`Todo Description`,<br />status: `Todo Status ('Finished' || 'Not Done' || 'Expired'`,<br />due_date: `Todo's due date` |
| /:id  | patch  |                                                              |       | Status Code: 200,<br />returns :<br /> name: `Todo Title`,<br />description:`Todo Description`,<br />status: `Todo Status ('Finished' |



# Middlewares

This app uses 2 middlewares **Authentication** and **ErrorHandler**



### Authentication:

​		Decrypts JWT token

### ErrorHandler:

​		Handles all errors

