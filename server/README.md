# Dokumentasi Fancy To Do App

# Route TODOS

| Route      | Method | Params          | Description                                        |
| ---------- | ------ | --------------- | -------------------------------------------------- |
| /todos     | GET    | none            | Get all todo item from database                    |
| /todos     | POST   | none            | Create / post new todo into database               |
| /todos/:id | PUT    | id(**integer**) | Update todo list from database by todo list **ID** |
| /todos/:id | GET    | id(**integer**) | Get single todo item by todo **ID** from database  |
| /todos/:id | DELETE | id(**integer**) | Delete single todo item by **ID** from database    |

# Route Users

| Route      | Method | Params          | Description                                        |
| ---------- | ------ | --------------- | -------------------------------------------------- |
| /todos     | GET    | none            | Get all todo item from database                    |
| /todos     | POST   | none            | Create / post new todo into database               |
| /todos/:id | PUT    | id(**integer**) | Update todo list from database by todo list **ID** |
| /todos/:id | GET    | id(**integer**) | Get single todo item by todo **ID** from database  |
| /todos/:id | DELETE | id(**integer**) | Delete single todo item by **ID** from database    |

# **How to get all todo list from database ?**

## Path

```javascript
    [GitHub](http://localhost:3000/todos)
```

## Method

### **GET**

## Request Body / Value

**Request Body** is empty

## Path Parameter

**Path Paramter** is empty.

## Query String

| params | Data type |
| ------ | --------- |
| title  | STRING    |

## Response

### Status **200** (Ok)

```javascript
[
  {
    id: 3,
    title: "Ngoding",
    description: "Selesain Tugas",
    status: 1,
    due_date: "2001-01-01T00:00:00.000Z",
    updatedAt: "2020-02-03T14:38:14.670Z",
    createdAt: "2020-02-03T14:38:14.670Z"
  }
];
```

### Status **204** (No Content)

```javascript
    Empty messages because The 204 response MUST NOT include a message-body and thus is always terminated by the first empty line after the header fields
```

# **How to post/create todo into database ?**

## Path

```javascript
    [GitHub](http://localhost:3000/todos)
```

## Method

### **POST**

## Request Body / Value

| Field       | Data type |
| ----------- | --------- |
| title       | STRING    |
| description | STRING    |
| status      | INTEGER   |
| due_date    | Date      |

## Path Parameter

**Path Parameter** is empty

## Query String

**Query string** is empty.

## Response

### Status **201** (Created)

```javascript
{
    "id": 3,
    "title": "Ngoding",
    "description": "Selesain Tugas",
    "status": 1,
    "due_date": "2001-01-01T00:00:00.000Z",
    "updatedAt": "2020-02-03T14:38:14.670Z",
    "createdAt": "2020-02-03T14:38:14.670Z"
}
```

### Status **400** (Validation)

```javascript
{
    "description": "Validation notEmpty on description failed"
}
```

# **How to update todo from database ?**

## Path

```javascript
    [GitHub](http://localhost:3000/todos/:id)
```

## Method

### **POST**

## Request Body / Value

| Field       | Data type |
| ----------- | --------- |
| title       | STRING    |
| description | STRING    |
| status      | INTEGER   |
| due_date    | Date      |

## Path Parameter

| params | Data type |
| ------ | --------- |
| id     | INTEGER   |

## Query String

**Query string** is empty.

## Response

### Status **200** (Ok)

```javascript
{
    "id": 3,
    "title": "Ngoding 2",
    "description": "Hayuk mari ngoding",
    "status": 1,
    "due_date": "2001-01-01T00:00:00.000Z",
    "createdAt": "2020-02-03T14:38:14.670Z",
    "updatedAt": "2020-02-03T14:54:13.888Z"
}
```

### Status **404** (Data not found)

```javascript
{
    "error": "Not Found"
}
```

# **How to get single todo item by ID ?**

## Path

```javascript
    [GitHub](http://localhost:3000/todos:id)
```

## Method

### **GET**

## Request Body / Value

**Path Parameter** is empty

## Path Parameter

| params | Data type |
| ------ | --------- |
| id     | INTEGER   |

## Query String

**Query string** is empty.

## Response

### Status **200** (Ok)

```javascript
{
    "id": 3,
    "title": "Ngoding 2",
    "description": "Hayuk mari ngoding",
    "status": 1,
    "due_date": "2001-01-01T00:00:00.000Z",
    "createdAt": "2020-02-03T14:38:14.670Z",
    "updatedAt": "2020-02-03T14:54:13.888Z"
}
```

### Status **404** (Data not found)

```javascript
{
    "error": "Not Found"
}
```

# **How to delete single todo item by ID ?**

## Path

```javascript
    [GitHub](http://localhost:3000/todos:id)
```

## Method

### **DELETE**

## Request Body / Value

**Path Parameter** is empty

## Path Parameter

| params | Data type |
| ------ | --------- |
| id     | INTEGER   |

## Query String

**Query string** is empty.

## Response

### Status **200** (Ok)

```javascript
{
    "id": 3,
    "title": "Ngoding 2",
    "description": "Hayuk mari ngoding",
    "status": 1,
    "due_date": "2001-01-01T00:00:00.000Z",
    "createdAt": "2020-02-03T14:38:14.670Z",
    "updatedAt": "2020-02-03T14:54:13.888Z"
}
```

### Status **404** (Data not found)

```javascript
{
    "error": "Not Found"
}
```
