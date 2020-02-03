# fancy-to-do
Fancy To-Do List API

1. POST /todos (create)
Diperlukannya field title,description,status,due_date untuk membuat sebuah instance di table ToDos.

Jika proses penginputan terdapat field yang kosong maka akan muncul pesan error field yang diinput tidak boleh kosong dengan error status 400.

Request Body: 
{
	"title": "Learn REST API",
	"description":"Learn how to create RESTful API with Express and Sequelize",
	"status":true,
	"due_date":"2020-01-29"
}

Response:
{
    "id": 16,
    "title": "Learn REST API",
    "description": "Learn how to create RESTful API with Express and Sequelize",
    "status": true,
    "due_date": "2020-01-29T00:00:00.000Z",
    "updatedAt": "2020-02-03T10:54:12.837Z",
    "createdAt": "2020-02-03T10:54:12.837Z"
}

Response yang akan didapatkan jika berhasil  adalah menampilkan instance yang dibuat dalam bentuk JSON dan terbentuknya instance baru di dalam database.

2. Get /todos (findAll)
digunakan untuk menampilkan semua data yang ada di table ToDos

Contoh:
Request Parameter:
http://localhost:3000/todos

Response:
[
    {
        "id": 15,
        "title": "Learn REST API",
        "description": "Learn how to create RESTful API with Express and Sequelize",
        "status": true,
        "due_date": "2020-01-29T00:00:00.000Z",
        "createdAt": "2020-02-03T09:42:18.954Z",
        "updatedAt": "2020-02-03T09:42:18.954Z"
    }
]

3. Get /todos/:id (findOne)
digunakan untuk menampilkan sebuah instance sesuai dengan inputan id oleh pengguna, jika tidak ditemukan maka akan muncul error message command not found dengan status error 404. Jika ditemukan maka yang ditampilkan adalah sesuai inputan id oleh pengguna

Request parameter:
http://localhost:3000/todos/12

response:
{
    "id": 12,
    "title": "makandsd",
    "description": "makan nasi",
    "status": true,
    "due_date": "2020-02-03T06:54:46.000Z",
    "createdAt": "2020-02-03T08:44:32.290Z",
    "updatedAt": "2020-02-03T08:44:32.290Z"
}

4. Put /todos/:id (update)
Digunakan untuk update todos berdasarkan id yang diinput. Apabila id tidak ditemukan maka akan muncul status error 404 dengan message command not found. Jika ditemukan maka yang ditampilkan adalah hasil update yang diisi oleh pengguna.

request parameter:
http://localhost:3000/todos/12

request body:
{
    "title": "berlari",
    "description": "berlari di taman",
    "status": false,
    "due_date": "2020-02-03T06:54:46.000Z",
    "createdAt": "2020-02-03T08:44:32.290Z",
    "updatedAt": "2020-02-03T08:44:32.290Z"
}

response :
{
    "id": 12,
    "title": "berlari",
    "description": "berlari di taman",
    "status": false,
    "due_date": "2020-02-03T06:54:46.000Z",
    "createdAt": "2020-02-03T08:44:32.290Z",
    "updatedAt": "2020-02-03T11:07:34.782Z"
}

5. Delete todos/:id
Digunakan untuk menghapus data sesuai dengan inputan id  oleh user. jika id yang diinput salah maka akan muncul error status 404 dengan message command not found. Jika berhasil maka yang akan ditampilkan adalah data yang berhasil dihapus oleh user

request parameter:
http://localhost:3000/todos/12

response:
{
    "id": 12,
    "title": "berlari",
    "description": "berlari di taman",
    "status": false,
    "due_date": "2020-02-03T06:54:46.000Z",
    "createdAt": "2020-02-03T08:44:32.290Z",
    "updatedAt": "2020-02-03T11:07:34.782Z"
}
