# fancy-to-do
Fancy To-Do List API Project: Client & Server Documentation, API Documentation

# Client & Server Documentation

## Client

    Tools: HTML, CSS, JAVASCRIPT, jQuery, NodeJS

### Dependencies 
|   Package Name    |   Version     |
| ---------------   | ------------  |
|  dotenv           | ^8.2.0        |
|  express          | ^4.17.1       |
|  handlebars       | ^4.7.2        |
|  jquery           | ^3.4.1        |
|  semantic-ui-css  | ^2.4.1        |
|  vanilla-router   | ^1.2.7        |

### Example .env

    PORT=3001

### Default Port

    3001

### Running Client

    npm run dev


## Server

    Tools: NodeJS, Express, sequelize, postgresql

### Dependencies 
|   Package Name    |   Version     |
| ---------------   | ------------  |
|  bcryptjs         | ^2.4.3        |
|  cors             | ^2.8.5        |
|  dotenv           | ^8.2.0        |
|  express          | 4.17.1        |
|  googleapis       | ^39.2.0       |
|  jsonwebtoken     | ^8.5.1        |
|  pg               | ^7.18.1       |
|  sequelize        | ^5.21.3       |



### Example .env

    PORT=3001
    jwt_secret_key="ohibudanayahselamatmalamkupergibegadangsampaibulandepan"



### Default Port

    3001

### Running Client

    npm run dev


# API Documentation

## Todos

| Url   | Method    |   Description |
| -------------     | ------------- | ------------- |
| /     | POST      | Membuat todo baru
| /     | GET       | Mendapatkan list todo
| /:id  | GET       | Mendapatkan data todo berdasarkan id
| /:id  | PUT       | Mengubah data todo berdasarkan id
| /:id  | DELETE    | Menghapus data todo berdasarkan id

## Detail API

[Create](server/rest_api_documentations/todos/create.txt) |
[Read](server/rest_api_documentations/todos/read.txt) |
[Read By Id](server/rest_api_documentations/todos/readById.txt) |
[Update](server/rest_api_documentations/todos/update.txt) |
[Delete](server/rest_api_documentations/todos/delete.txt) |


## Table Responses

| Code   | Description    | 
| -------------     | ------------- |
| 200     | Response Sukses      | 
| 201     | Data berhasil ditambahkan      | 
| 400     | Request yang diberikan tidak lengkap atau salah      | 
| 403     | Tidak memiliki otoritas      | 
| 404     | Data tidak ditemukan / tidak ada      | 
| 500     | Error dari sisi server / tidak diduga-duga :v      | 



