# Fancy Todo API documentation
created by Muhammad Ali Mazhuda
<br>

1. Get list todo
* url : http://localhost:3000/todos
* method : GET
* parameter sent : none
* response : 
    ```
    [
        { 
        "id": 1,
        "title": "Belajar",
        "description": "Javascript",
        "status": false,
        "due_date":"2020-02-03T11:45:29.537Z",
        "createdAt":"2020-02-03T11:39:30.451Z",
        "updatedAt":"2020-02-03T11:45:29.431Z"
        }
    ]
    ```

2. Create Todo
* url : http://localhost:3000/todos
* method : POST
* parameter sent : 

    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|title       |String |required
    | 2|description |String |required
    | 3|status      |boolean|required
    | 4|due date    |Date   |required
* response : 
    ```
    {
        "id": 6,
        "title": "Belajar",
        "description": "ExpressJs",
        "status": false,
        "due_date": "2020-02-05T00:00:00.000Z",
        "updatedAt": "2020-02-03T15:13:36.484Z",
        "createdAt": "2020-02-03T15:13:36.484Z"
    }
    ```
<br>

3. Update Todo
* url : http://localhost:3000/todos/:id
* method : PUT
* parameter sent : 
    
    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|title       |String |required
    | 2|description |String |required
    | 3|status      |boolean|required
    | 4|due date    |Date   |required


* response : 
    ```
    {
        "id": 6,
        "title": "Belajar",
        "description": "ExpressJs",
        "status": false,
        "due_date": "2020-02-05T00:00:00.000Z",
        "updatedAt": "2020-02-03T15:13:36.484Z",
        "createdAt": "2020-02-03T15:13:36.484Z"
    }
    ```
<br>

4. Delete todo
* url : http://localhost:3000/todos/:id
* method : DELETE
* parameter sent : none
* response : 
    ```
    {
        "id": 6,
        "title": "Belajar",
        "description": "ExpressJs",
        "status": false,
        "due_date": "2020-02-05T00:00:00.000Z",
        "updatedAt": "2020-02-03T15:13:36.484Z",
        "createdAt": "2020-02-03T15:13:36.484Z"
    }
    ```


## HTTP Error Code
---

|No|Code    |Name           |Comment
|--|--------|---------------|---------
| 1|400     |Bad Request    |Missing field on request
| 2|404     |Not Found      |Id not found
| 3|500     |Server Error   |Server Error