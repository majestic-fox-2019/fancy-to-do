# Fancy-To-Do

**Base URL :** `http://localhost:8000`

**List of Routes:**

| **Route**  | **HTTP** | **Description**                |
| ---------- | -------- | ------------------------------ |
| /todos     | POST     | Create new to-do task          |
| /todos     | GET      | Show all to-dos task of user   |
| /todos/:id | PUT      | Update to-do user by id        |
| /todos/:id | GET      | Show to-do user filtered by id |
| /todos/:id | DELETE   | Delete to-do task by id        |

**List of Errors:**

| **Code** | **Name**              | **Description**                                |
| -------- | --------------------- | ---------------------------------------------- |
| 400      | Bad Request           | Incorrect form validation                      |
| 404      | Not Found             | Requested resource not found                   |
| 500      | Internal Server Error | Server currently unable to handle this request |



## GET To-do

------

- **URL:** `/todos`

- **Method:** `GET`

- **Description:** `Show all to-do list of current user`

- **Success Response:**

  - **Status:** `200`

    ```javascript
    [
        {
            "id": 1,
            "title": "Learn REST API",
            "description: "Learn how to create RESTful API with Express and Sequelize",
            "due_date": "2020-01-20",
        },
        {
            "id": 2,
            "title": "CRUD for Todo webapps",
            "description": "Learn how to create CRUD for Todo",
            "status": "incomplete",
            "due_date": "2020-1-1",
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



## POST To-do

------

- **URL:** `/todos`

- **Method:** `POST`

- **Description:** `Create new task on user to-do list`

- **Request header:** 

  ```javascript
  {
      "Content-Type": "application/json"
  }
  ```

- **Request body:**

  By default, attributes status in to-do will be `incomplete`. The accepted value for status are `completed` and `incomplete`

  ```javascript
  {
      "title": "Learn REST API",
      "description": "Learn how to create RESTful API with Express and Sequelize",
      "due_date": "2020-01-29"
  }
  ```

- **Success Response:**

  - **Status:** `201`

    ```javascript
    {
        "id": 1,
        "title": "Learn REST API",
        "description: "Learn how to create RESTful API with Express and Sequelize",
        "due_date": "2020-01-20",
        "updatedAt": "2020-02-03T13:31:50.969Z",
        "createdAt": "2020-02-03T13:31:50.969Z"
    }
    ```

- **Error Response:**

  - **Status:** `400`

    ```javascript
    [
        "Validation error: Please input todo title,",
        "Validation error: Please input todo description"
    ]
    ```
    
  - **Status:** `500`

    ```javascript
  {
        msg: "Server currently unable to handle this request"
  }
    ```



## GET To-do by ID

------

- **URL:** `/todos/:id`

- **Method:** `GET`

- **Description:** `Show user task from to-do filtered by id`

- **URL Params:** 

  ```javascript
  "id": string, required
  ```

- **Success Response:**

  - **Status:** `201`
  
    ```javascript
    {
        "id": 1,
        "title": "Get Task",
        "description": "show task by id",
        "status": "incomplete",
        "due_date": "2020-1-1",
        "createdAt": "2020-02-03T13:30:48.501Z",
        "updatedAt": "2020-02-03T13:30:48.501Z"
    }
    ```
    
  
- **Error Response:**

  - **Status:** `404`

    ```javascript
    [
        "Error! Data not found"
    ]
    ```

  - **Status:** `500`

    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```

  

## PUT To-do

------

- **URL:** `/todos/:id`

- **Method:** `PUT`

- **Description:** `Update user task from to-do by id`

- **URL Params:** 

  ```javascript
  "id": string, required
  ```

- **Request header:** 

  ```javascript
  {
      "Content-Type": "application/json"
  }
  ```

- **Request body:**

  ```javascript
  {
      "title": "Update to-do list",
      "description": "Updated",
      "status": 'completed',
      "due_date": "2020-01-29"
  }
  ```

- **Success Response:**

  - **Status:** `200`

    ```javascript
    {
        "id": 2,
        "title": "Updated",
        "description": "update",
        "status": "completed",
        "due_date": "2020-07-05T12:45:09.000Z",
        "createdAt": "2020-02-03T13:31:32.175Z",
        "updatedAt": "2020-02-03T14:52:50.659Z"
    }
    ```

- **Error Response:**

  - **Status:** `400`

    ```javascript
    {
        [
            "Validation error: Please input todo title,",
            "Validation error: Please input todo description"
        ]
    }
    ```

  - **Status:** `404`

    ```javascript
    [
        "Error! Data not found"
    ]
    ```

  - **Status:** `500`

    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```



## DELETE To-do

------

- **URL:** `/todos/:id`

- **Method:** `DELETE`

- **Description:** `Delete user task from to-do by id`

- **URL Params:** 

  ```javascript
  "id": string, required
  ```


- **Success Response:**

  - **Status:** `200`

    ```javascript
    {
        "id": 3,
        "title": "Deleted Task",
        "description": "deleted",
        "status": "completed",
        "due_date": "2020-1-29",
        "createdAt": "2020-02-03T13:31:50.969Z",
        "updatedAt": "2020-02-03T13:31:50.969Z"
    }
    ```

- **Error Response:**

  - **Status:** `404`

    ```javascript
    [
        "Error! Data not found"
    ]
    ```

  - **Status:** `500`

    ```javascript
    {
        "msg": "Server currently unable to handle this request"
    }
    ```

  