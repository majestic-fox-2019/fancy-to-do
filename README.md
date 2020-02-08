# Fancy-To-Do



## Table of Content

- **MJS-Exchange-API**
  - [Base URL](#base-url)
  - [Installation](#installation)
  - [Usage](#usage)
  - [List of Routes User](#list-of-routes-user)
  - [List of Errors](#list-of-errors)
  - **User Endpoints**
    - [Login](#post-login)
    - [Register](#post-register)
  - **Todo Endpoint**
    - [Show All](#get-todos)
    - [Create Task](#post-todos)
    - [Show Task by Id](#get-todos-by-id)
    - [Change Status Todo Task](#patch-todos)
    - [Delete Todo Task](#delete-todos)

------

#### **Base URL :** `http://localhost:3000`

#### **Installation:**

Clone this API from repository and install npm, then on `server` directory install the neccessary npm package

```
$ git clone https://github.com/samuelzega/mjs-exchange.git
$ npm install
$ cd ../server && npm install
```

Do the same on `client` directory

#### **Usage:**

Run script from packages by using the command below on `server` directory

{
```
$ npm run dev
```

Run code below on `client` directory to initiate `client` host

```
$ live-server --host=localhost
```

#### **List of User Routes:**

| **Route**      | **HTTP** | **Description**                                     |
| -------------- | -------- | --------------------------------------------------- |
| /google/signin | POST     | Sign in with OAuth 2.0 Google                       |
| /login         | POST     | Log in and get an access token based on credentials |
| /register      | POST     | Sign up new user                                    |

#### **List of Todo Routes:**

| **Route**  | **HTTP** | **Description**                                              |
| ---------- | -------- | ------------------------------------------------------------ |
| /todos     | GET      | Show all to-dos task of user *(login required)*              |
| /todos     | POST     | Create new to-do task *(login required)*                     |
| /todos/:id | GET      | Show to-do user filtered by id *(login required)*            |
| /todos/:id | PATCH    | Change status of to-do task (complete or incomplete) *(login required)* |
| /todos/:id | DELETE   | Delete to-do task by id *(login required)*                   |

#### **List of Errors:**

| **Code** | **Name**              | **Description**                                |
| -------- | --------------------- | ---------------------------------------------- |
| 400      | Bad Request           | Incorrect user access or form validation       |
| 403      | Forbidden             | Unauthorized access                            |
| 404      | Not Found             | Requested resource not found                   |
| 500      | Internal Server Error | Server currently unable to handle this request |



## **POST Login**

------

- **URL:** `/login`

- **Method:** `POST`

- **Description:** `Log in and get an access token based on credentials`

- **Request body:**

  ```javascript
  {
      "email": "email@domain.com", //required
      "password": "password" //required
  }
  ```

- **Success Response:**

  - **Status:** `200`

    ```javascript
    {
        "email": "email@domain.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHRlc3QuaWQiLCJpYXQiOjE1ODEwMTUyMTl9.OQYDBjJ0VvAAm7fsXVqKZBg8ZFt4mEdM50wOBih4DlQ"
    }
    ```

- **Error Response:**

  - **Status:** `400`

    ```javascript
    {
        "errors": [
            "Incorrect Username or Password"
        ]
    }
    ```

  - **Status:** `500`

    ```javascript
    {
        "errors": "Server currently unable to handle this request"
    }
    ```

## **POST Register**

------

- **URL:** `/register`

- **Method:** `POST`

- **Description:** `Sign up new user`

- **Request body:**

  ```javascript
  {
      "name": "user", //required
      "email": "email@domain.com", //required
      "password": "password" //required
  }
  ```

- **Success Response:**

  - **Status:** `201`

    ```javascript
    {
        "name": "user",
        "email": "email@domain.com"
    }
    ```

- **Error Response:**

  - **Status:**`400`

    ```javascript
    {
        "errors": [
            "Validation error: Please input username,",
            "Validation error: Please input password"
        ]
    }
    ```

  - **Status:** `500`

    ```javascript
    {
        "errors": "Server currently unable to handle this request"
    }
    ```

## GET Todos

------

- **URL:** `/todos`

- **Method:** `GET`

- **Description:** `Show all to-do list of current user`

- **Request Header:**

  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Success Response:**

  - **Status:** `200`

    ```javascript
    [
        {
            "id": 1,
            "title": "Learn REST API",
            "description: "Learn how to create RESTful API with Express and Sequelize",
            "status": "incomplete",
            "due_date": "2020-01-20",
            "UserId": 1,
            "createdAt": "2020-02-08T08:15:24.300Z",
            "updatedAt": "2020-02-08T08:34:36.926Z"
        },
        {
            "id": 2,
            "title": "CRUD for Todo webapps",
            "description": "Learn how to create CRUD for Todo",
            "status": "incomplete",
            "due_date": "2020-1-1",
            "UserId": 1,
            "createdAt": "2020-02-08T08:28:56.735Z",
            "updatedAt": "2020-02-08T08:37:06.302Z"
        },
    ]
    ```

- **Error Response:**

  - **Status:** `500`

    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```



## POST Todos

------

- **URL:** `/todos`

- **Method:** `POST`

- **Description:** `Create new task on user to-do list, integrated with google calendar if logged in with google or permission granted to access calendar`

- **Request Header:**

  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Success Response:**

- **Request body:** By default, attributes `status` in to-do will be `incomplete`. The accepted value for status are `completed` and `incomplete`

  ```javascript
  {
      "title": "Learn REST API", //required
      "description": "Learn how to create RESTful API with Express", //required
      "status": "incomplete",
      "due_date": "2020-01-29", //required
  }
  ```

- **Success Response:**

  - **Status:** `201`

    ```javascript
    {
        "id": 1,
        "title": "Learn REST API",
        "description: "Learn how to create RESTful API with Express and Sequelize",
        "status": "incomplete"
        "due_date": "2020-01-20",
        "UserId": 1,
        "updatedAt": "2020-02-03T13:31:50.969Z",
        "createdAt": "2020-02-03T13:31:50.969Z"
    }
    ```

- **Error Response:**

  - **Status:** `400`

    ```javascript
    {
        "errors": [
            "Validation error: Please input todo title,",
            "Validation error: Please input todo description"
        ]
    }
    ```
  
  - **Status:** `500`
  
    ```javascript
    {
        "errors": "Server currently unable to handle this request"
    }
    ```
  
    

## GET Todos by ID

------

- **URL:** `/todos/:id`

- **Method:** `GET`

- **Description:** `Show user task from to-do filtered by id`

- **URL Params:** 

  ```javascript
  "id": 1, //required
  ```

- **Request Header:**

  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Success Response:**

  - **Status:** `201`
  
    ```javascript
    {
        "id": 1,
        "title": "Learn REST API",
        "description: "Learn how to create RESTful API with Express and Sequelize",
        "status": "incomplete"
        "due_date": "2020-01-20",
        "UserId": 1,
        "updatedAt": "2020-02-03T13:31:50.969Z",
        "createdAt": "2020-02-03T13:31:50.969Z"
    }
    ```
    
  
- **Error Response:**

  - **Status:** `404`

    ```javascript
    {
        "errors": [
            "Data not found!"
        ]
  }
    ```

  - **Status:** `500`
  
    ```javascript
    {
        "errors": "Server currently unable to handle this request"
  }
    ```
  
  

## PATCH Todos

------

- **URL:** `/todos/:id`

- **Method:** `PATCH`

- **Description:** `Change status of to-do task either completed or incomplete`

- **URL Params:** 

  ```javascript
  "id": 1, //required
  ```

- **Request Header:**

  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```

- **Success Response:**

  - **Status:** `200`

    ```javascript
    {
        "id": 1,
        "title": "Learn REST API",
        "description: "Learn how to create RESTful API with Express and Sequelize",
        "status": "completed"
        "due_date": "2020-01-20",
        "UserId": 1,
        "updatedAt": "2020-02-03T13:31:50.969Z",
        "createdAt": "2020-02-03T13:31:50.969Z"
    }
    ```

- **Error Response:**

  - **Status:** `404`

    ```javascript
    {
        "errors": [
            "Data not found!"
        ]
    }
    ```
  
- **Status:** `500`
  
  ```javascript
    {
        "errors": "Server currently unable to handle this request"
    }
  ```



## DELETE Todos

------

- **URL:** `/todos/:id`

- **Method:** `DELETE`

- **Description:** `Delete user task from to-do by id`

- **URL Params:** 

  ```javascript
  "id": 1 //required
  ```
  
- **Request Header:**

  ```javascript
  {
      "token": eyJhbGciOiJIUzI1NiIsInR, //required
  }
  ```


- **Success Response:**

  - **Status:** `200`

    ```javascript
    {
        "id": 1,
        "title": "deleted task",
        "description": "deleted task",
        "status": "completed",
        "due_date": "2/9/2020",
        "UserId": 1,
        "createdAt": "2020-02-08T08:15:24.300Z",
        "updatedAt": "2020-02-08T08:34:11.817Z"
    }
    ```

- **Error Response:**

  - **Status:** `404`

    ```javascript
    {
        "errors": [
            "Data not found!"
        ]
    }
    ```
    
- **Status:** `500`
  
  ```javascript
    {
        "errors": "Server currently unable to handle this request"
    }
    ```
