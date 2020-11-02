# fancy-to-do
Fancy To-Do List API

# Todo
## Create Todo
Membuat Todo

`POST` `/todos`

Request Body :
```json
{
  "title": "<String>",
  "description": "<String>",
  "status": "<String>",
  "due_date": "<Date>"
}
```

Success Status Code : `201`

Success Response :
```json
{
  "id": "<INTEGER> <PRIMARY_KEY>",
  "title": "<String>",
  "description": "<String>",
  "status": "<String>",
  "due_date": "<Date>",
  "createdAt": "<Date>",
  "updatedAt": "<Date>"
}
```

## Show All Todo
Menampilkan semua Todo

`GET` `/todos`

Request Body : `200`

Success Status Code : 

Success Response :

## Show Todo by Id
Menampilkan 1 Todo dengan Id tertentu

`GET` `/todos/:id`

Success Status Code : `200`

Success Response : 

## 