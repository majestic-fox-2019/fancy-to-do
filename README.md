# fancy-to-do
Fancy To-Do List API

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



