# fancy-to-do
Fancy To-Do List API

1. POST /todos (create)
Diperlukannya field title,description,status,due_date untuk membuat sebuah instance di table ToDos.

Jika proses penginputan terdapat field yang kosong maka akan muncul pesan error field yang diinput tidak boleh kosong dengan error status 400.

Response yang akan didapatkan jika berhasil  adalah menampilkan instance yang dibuat dalam bentuk JSON dan terbentuknya instance baru di dalam database.

2. Get /todos (findAll)
digunakan untuk menampilkan semua data yang ada di table ToDos

3. Get /todos/:id (findOne)
digunakan untuk menampilkan sebuah instance sesuai dengan inputan id oleh pengguna, jika tidak ditemukan maka akan muncul error message command not found dengan status error 404.
