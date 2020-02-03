# fancy-to-do
Fancy To-Do List API
<br>
<br>
<br>

### **POST /todos**
---
*Create a new todolist.*
> Request Body:
* Schema

  Value:
    - title: string,
    - description: string,
    - status: boolean,
    - due_date: date

  Example
  ```javascript
  {
    "title": "Create Fancy Todo",
    "description": "Learn how to create RESTful API",
    "status": "false"
    "due_date": "2020-02-08"
  }
  ```
<br>

> Response:
* 201

  Example:
  ```javascript
  {
    "id": 1,
    "title": "Create Fancy Todo",
    "description": "Learn how to create RESTful API",
    "status": "false"
    "due_date": "2020-02-08"
  }
  ```

* 400

  Example:
  ```javascript
  {
    "message": "Validation error: Title must be filled!"
  }
  ```

* 500

<br>

### **GET /todos**
---
*Show all todo list.*

> Response:
* 200

  Example:
  ```javascript
  {
    "id": 1,
    "title": "Create Fancy Todo",
    "description": "Learn how to create RESTful API",
    "status": "false"
    "due_date": "2020-02-08"
  },
  {
    "id": 2,
    "title": "Create Fancy Todo",
    "description": "Learn how to create RESTful API",
    "status": "false"
    "due_date": "2020-02-08"
  } 
  ```

* 500

<br>
<br>

### **GET /todos/:id**
---
*Show todo list by id.*
> Request Params:

  id: integer <br>
  example: http://localhost:3000/todos/2

<br>

> Response:
* 200

  Example:
  ```javascript
  {
    "id": 2,
    "title": "Create Fancy Todo",
    "description": "Learn how to create RESTful API",
    "status": "false",
    "due_date": "2020-02-08"
  }
  ```

* 404
  
  Example:
  ```javascript
  {
    "message": "Error 404, command not found!"
  }
  ```

<br>

### **PUT /todos/:id**
---
*Update todo list by id.*

> Request params:<br>

  id: integer <br>
  example: http://localhost:3000/todos/2

<br>

> Request Body:
* Schema

  Value:
    - title: string,
    - description: string,
    - status: boolean,
    - due_date: date

  Example
  ```javascript
  {
    "title": "Create Fancy Todo",
    "description": "Learn how to create RESTful API",
    "status": "false"
    "due_date": "2020-02-08"
  }
  ```
<br>

> Response:
* 200

  Example:
  ```javascript
  {
    "id": 2,
    "title": "Create Fancy Todo",
    "description": "Learn how to create RESTful API",
    "status": "false",
    "due_date": "2020-02-08"
  }
  ```

* 404
  
  Example:
  ```javascript
  {
    "message": "Validation error: Title must be filled!"
  }
  ```

* 400

  Example:
  ```javascript
  {
    "message": "Error 404, command not found!"
  }
  ```

* 500

<br>

### **DELETE /todos/:id**
---
*Delete todo list by id.*

> Request params: <br>

  id: integer <br>
  example: http://localhost:3000/todos/3

<br>

> Response:
* 200

  Example:
  ```javascript
  {
    "id": 2,
    "title": "Create Fancy Todo",
    "description": "Learn how to create RESTful API",
    "status": "false",
    "due_date": "2020-02-08"
  }
  ```

* 404
  
  Example:
  ```javascript
  {
    "message": "Error 404, command not found!"
  }
  ```

* 500