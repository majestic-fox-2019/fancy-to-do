# FANCY TO-DO LIST API
### by Adam Rafiandri, forked from [Majestic Fox 2019](https://github.com/majestic-fox-2019/fancy-to-do "Majestic Fox 2019")

This is my first project on Phase 2. 
This simple Todo API gives what you need if you're only looking for some data to store your tasks.

__LET'S JUMP INTO IT!!__

---

These are the routes/endpoints this API has:

| HTTP Method      | Route         | Description                                      |
| ---------------- | ------------- | ------------------------------------------------ |
| __GET__          | _/todos_      | Shows all tasks in form of __Array of Objects__. |
| __POST__         | _/todos_      | Create a new task.                               |
| __GET__          | _/todos/:id_  | Shows specified task.                            |
| __PUT__          | _/todos/:id_  | Updates specified task.                          |
| __DELETE__       | _/todos/:id_  | Deletes specified task.                          |

<br><br>

---

## __GET__ _/todos_

* Expected Output (If there are 2 tasks)

```javascript
[
    {
        "id": 9,
        "title": "Make docs",
        "description": "Finish making docs",
        "status": false,
        "due_date": "2020-02-23T00:00:00.000Z",
        "createdAt": "2020-02-03T12:40:15.030Z",
        "updatedAt": "2020-02-03T12:40:15.030Z"
    },
    {
        "id": 10,
        "title": "Learn Vue",
        "description": "Learn hello world using Vue",
        "status": false,
        "due_date": "2020-03-01T00:00:00.000Z",
        "createdAt": "2020-02-03T12:42:30.860Z",
        "updatedAt": "2020-02-03T12:42:30.860Z"
    }
]
```

<br>

## __POST__ _/todos_

### Properties Breakdown

* Title (String)
  * Cannot be null or empty.
* Description (String)
* Status (Boolean)
* Due Date (Date)

> Created At and Update At properties are automatically updated upon PUT and POST methods.

<br>

#### Expected Input

```javascript
{
  "title": "Learn Vue",
  "description": "Learn hello world using Vue",
  "status": false,
  "due_date": "2020-03-01"
}
```

#### Expected Output

```javascript
{
    "id": 10,
    "title": "Learn Vue",
    "description": "Learn hello world using Vue",
    "status": false,
    "due_date": "2020-03-01T00:00:00.000Z",
    "updatedAt": "2020-02-03T12:42:30.860Z",
    "createdAt": "2020-02-03T12:42:30.860Z"
}
```

ID is automatically incremented and generated.


<br>


## __GET__ _/todos/:id_

### Properties Breakdown

* ID (Number)
  * Gotten from client.

Example: http:localhost:3000/__10__

> __10__ is the ID.


#### Expected Output

```javascript
{
    "id": 10,
    "title": "Learn Vue",
    "description": "Learn hello world using Vue",
    "status": false,
    "due_date": "2020-03-01T00:00:00.000Z",
    "createdAt": "2020-02-03T12:42:30.860Z",
    "updatedAt": "2020-02-03T12:42:30.860Z"
}
```


<br>


## __PUT__ _/todos/:id_

### Properties Breakdown

* ID (Number)
  * Gotten from client.

Example: http:localhost:3000/__10__

> __10__ is the ID.

* Title (String)
  * Cannot be null or empty.
* Description (String)
* Status (Boolean)
* Due Date (Date)


#### Expected Input

```javascript
{
    "id": 10,
    "title": "Learn Vue MORE!",
    "description": "Learn hello world using Vue",
    "status": true,
    "due_date": "2020-03-01T00:00:00.000Z",
    "createdAt": "2020-02-03T12:42:30.860Z",
    "updatedAt": "2020-02-03T12:42:30.860Z"
}
```

#### Expected Output

```javascript
{
    "id": 10,
    "title": "Learn Vue MORE!",
    "description": "Learn hello world using Vue",
    "status": true,
    "due_date": "2020-03-01T00:00:00.000Z",
    "createdAt": "2020-02-03T12:42:30.860Z",
    "updatedAt": "2020-02-03T13:07:12.849Z"
}
```

> See the difference?

_The "updatedAt" property will automatically update itself._



<br>


## __DELETE__ _/todos/:id_

### Properties Breakdown

* ID (Number)
  * Gotten from client.

Example: http:localhost:3000/__9__

> __9__ is the ID.

#### Expected Output

```javascript
{
    "id": 9,
    "title": "Make docs",
    "description": "Finish making docs",
    "status": false,
    "due_date": "2020-02-23T00:00:00.000Z",
    "createdAt": "2020-02-03T12:40:15.030Z",
    "updatedAt": "2020-02-03T12:40:15.030Z"
}
```

> This will output the specified task in object and delete it right away.