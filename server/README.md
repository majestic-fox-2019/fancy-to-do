# Fancy To-Do list API

Link: 

```
http://localhost:8080/
```



API Email BoxValidation:

```
baseURL: https://api.mailboxvalidator.com/v1/validation/single?key=APIkey
```



#### Before you do anything else..

```
$ npm install
```



## .ENV Tempelates

```
JWT_RAHAYU=<Json Web Token>

APIkey=<API KEY FROM mailboxvalidator>

GoogleClienId=<Client-Id From Google SignIn>

```



## Database

- Postgres 
- Sequelize 



## Main Routes

| Routes |
| :----: |
| /user  |
| /todos |



## user Route

| Route  | Method | Body                                                         | query | Result                                                       |
| ------ | ------ | ------------------------------------------------------------ | ----- | ------------------------------------------------------------ |
| /      | post   | username: <String><br />email: <String><br />password: <String> |       | Creates User and sends token(automatic login after register) |
| /login | post   | email:<String><br />password: <String>                       |       | Returns token and username                                   |





## Todos Routes

| Routes | Method | Body                                                         | Query | Result                               |
| ------ | ------ | ------------------------------------------------------------ | ----- | ------------------------------------ |
| /      | get    |                                                              |       | returns all todos on db              |
| /      | post   | title:<string><br/> description:<string><br/> status:<string><br/> due_date:<strin><br/> |       | Create Todos                         |
| /:id   | get    |                                                              |       | returns a todos based on params id   |
| /:put  | put    | title:<string><br> description:<string><br> status:<string><br> due_date:<strin><br> |       | update a question for logged in user |
| /:id   | delete |                                                              |       | delete based on params id            |

## 

# Middlewares

This app uses 2 middlewares **Authentication** and **ErrorHandler**



### Authentication:

​		Decrypts JWT token



### ErrorHandler:

​		Handles all errors

