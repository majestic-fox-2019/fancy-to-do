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
        "id": 7,
        "title": "Check 4",
        "description": "Check 4 Desc",
        "status": false,
        "due_date": "2020-02-27T09:09:24.284Z",
        "createdAt": "2020-02-03T09:09:24.284Z",
        "updatedAt": "2020-02-03T09:09:24.284Z"
    },
    {
        "id": 8,
        "title": "Solve anchors",
        "description": "Check 4 Desc",
        "status": false,
        "due_date": "2020-02-28T09:09:24.284Z",
        "createdAt": "2020-02-03T10:24:12.887Z",
        "updatedAt": "2020-02-03T10:24:12.887Z"
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

> Expected Input

```javascript
{
  "title": "Buy a Mac",
  "description": "Buy it in Cupertino",
  "status": false,
  "due_date": "2020-02-25T17:00:00.000Z",
  "createdAt": "2020-02-03T09:09:24.284Z",
  "updatedAt": "2020-02-03T09:09:24.284Z"
}
```