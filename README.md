# FANCY TO-DO LIST API
Fancy To-Do List API

### 1. POST /todos
_Request header:_

```javascript
{
    "Content-Type": "application/json"
}
```

<br>

_Example Input (Request Body) :_

```javascript
{
    "title": "memasak",
    "description": "memasak rendang",
    "status": "Belum",
    "due_date": "2020-12-12T00:00:00.000Z"
}
```

_Response :_

```javascript
{
    "id": 26,
    "title": "memasak",
    "description": "memasak rendang",
    "status": "Belum",
    "due_date": "2020-12-12T00:00:00.000Z",
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```

### 2. GET /todos

<br>

_Response :_

```javascript
{
    "id": 26,
    "title": "memasak",
    "description": "memasak rendang",
    "status": "Belum",
    "due_date": "2020-12-12T00:00:00.000Z",
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```

### 3. GET /todos/:id

_Example Input (Request Params) :_

```javascript
localhost:3000/todos/1
```

_Response :_

```javascript
{
    "id": 1,
    "title": "memasak",
    "description": "memasak rendang",
    "status": "Belum",
    "due_date": "2020-12-12T00:00:00.000Z",
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```

_If the "id" wasn't found, the response will be :_

```javascript
"ID not found"
```

### 4. PUT /todos/:id

_Example Input (Request Params) :_

```javascript
localhost:3000/todos/1
```

_Example Input (Request Body) :_

```javascript
{
    "title": "mandiin buaya",
    "description": "mandiin 3 buaya",
    "status": "Belum",
    "due_date": "2020-12-12T00:00:00.000Z"
}
```

_Response :_

```javascript
{
    "id": 1,
    "title": "mandiin buaya",
    "description": "mandiin 3 buaya",
    "status": "Belum",
    "due_date": "2020-12-12T00:00:00.000Z",
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```

### 5. DELETE /todos/:id

_Example Input (Request Params) :_

```javascript
localhost:3000/todos/1
```

_Response :_

```javascript
{
    "id": 1,
    "title": "mandiin buaya",
    "description": "mandiin 3 buaya",
    "status": "Belum",
    "due_date": "2020-12-12T00:00:00.000Z",
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```
