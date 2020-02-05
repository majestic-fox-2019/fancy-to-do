# fancy-to-do
Fancy To-Do List API

#### POST/todos :

Request header:

```
{
"Content-Type":"application/json"
}
```



Request body :

```
{
title: "Fancy Todo",
description: "Tugas Fancy Todo",
status: "Done",
due_date: "2020-01-29"
}
```



Response :

```
{
id:1,
title:"Fancy Todo",
description:"Tugas Fancy Todo",
status:"Done",
due_date: "2020-01-29"
}
```



#### Get/todos :

Request :

```
Get/todos : http://localhost:3000/todos
```



Response :

```
[
	{
    "id": 4,
    "title": "coba postmen",
    "description": "tugas minggu pertama",
    "status": "pending",
    "due_date": "2019-12-31T17:00:00.000Z",
    "createdAt": "2020-02-03T07:48:35.087Z",
    "updatedAt": "2020-02-03T07:48:35.087Z"
  },
  {
        "id": 5,
        "title": "coba postmen",
        "description": "tugas minggu pertama",
        "status": "pending",
        "due_date": "2020-01-01T00:00:00.000Z",
        "createdAt": "2020-02-03T07:49:58.136Z",
        "updatedAt": "2020-02-03T07:49:58.136Z"
    },
    {
        "id": 1,
        "title": "coba ok ok",
        "description": "tugas minggu pertama",
        "status": "",
        "due_date": "2020-01-01T00:00:00.000Z",
        "createdAt": "2020-02-03T07:37:02.831Z",
        "updatedAt": "2020-02-03T09:58:21.199Z"
    }
]
```



#### Get/todos/:id :

Request :

```
Get/todos/:id : http://localhost:3000/todos/1
```



Response :

```
[
 {
        "id": 1,
        "title": "coba ok ok",
        "description": "tugas minggu pertama",
        "status": "",
        "due_date": "2020-01-01T00:00:00.000Z",
        "createdAt": "2020-02-03T07:37:02.831Z",
        "updatedAt": "2020-02-03T09:58:21.199Z"
    }
 ]
```



#### Put/todos/:id :

Request :

```
Put/todos/:id : http://localhost:3000/todos/1
```



Response :

```
{
    "id": 1,
    "title": "coba lagi yuk",
    "description": "tugas minggu pertama",
    "status": "Done",
    "due_date": "2020-01-01T00:00:00.000Z",
    "createdAt": "2020-02-03T07:37:02.831Z",
    "updatedAt": "2020-02-03T12:40:12.842Z"
}
```



#### Delete/todos/:id :

Request :

```
Delete/todos/:id : http://localhost:3000/todos/1
```



Response :

```
{
    "id": 1,
    "title": "coba lagi yuk",
    "description": "tugas minggu pertama",
    "status": "Done",
    "due_date": "2020-01-01T00:00:00.000Z",
    "createdAt": "2020-02-03T07:37:02.831Z",
    "updatedAt": "2020-02-03T12:40:12.842Z"
}
```



