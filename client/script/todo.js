class Todo {
    static getTodo() {
        return $.ajax({
            headers: {
                token: localStorage.token
            },
            method: 'get',
            url: `${base_url}/todos`,
            beforeSend: () => {
                console.log('Loading')
            },
            success: (result) => {
                listItem(result)
            },
            err: (xhr, status) => {
                console.log(xhr)
            },
            complete: () => {
                console.log('selesai')
            }
        })
    }

    static getTodoByTitle($title) {
        return $.ajax({
            headers: {
                token: localStorage.token
            },
            method: 'get',
            url: `${base_url}/todos/?title=${$title}`,
            beforeSend: () => {
                console.log('Loading')
            },
            success: (result) => {
                listItem(result)
            },
            err: (xhr, status) => {
                console.log(xhr)
            },
            complete: () => {
                console.log('selesai')
            }
        })
    }

    static getSingleTodo($url) {
        $.ajax({
            headers: {
                token: localStorage.token
            },
            method: 'get',
            url: $url,
            beforeSend: () => {
                console.log('Loading')
            },
            success: (result) => {
                $id.val(result.id)
                $title_edit.val(result.title)
                $description_edit.val(result.description)
                $status_edit.val(result.status)
                $due_date_edit.val(formatDate(result.due_date))
                $modalEditTodo.modal('show')
            },
            err: (xhr, status) => {
                console.log(xhr)
            },
            complete: () => {
                console.log('selesai')
            }
        })
    }

    static addTodo($title, $description, $due_date) {
        const objValue = {
            title: $title,
            description: $description,
            status: 1,
            due_date: $due_date
        }

        return $.ajax({
            headers: {
                token: localStorage.token
            },
            method: 'POST',
            url: `${base_url}/todos`,
            data: objValue,
            beforeSend: () => {
                $('#btnAdd').text('Loading...')
            },
            success: (result) => {
                $modalAddTodo.modal('hide')
                $alertInfo.show()
                $alertInfo.find('.alert').text(`Todo ${result.title} sucessfully added!`)
                this.getTodo()
                clearField($formAddTodo)
                setTimeout(() => {
                    $alertInfo.hide().fadeOut(1000)
                }, 2000);
            },
            error: (xhr, status) => {
                let err = JSON.parse(xhr.responseText)
                for (let key in err.message) {
                    $(`#${key}`).addClass('is-invalid')
                    $(`.error_${key}`).text(err.message[key])
                }
            },
            complete: () => {
                $('#btnAdd').text('Add Todo')
            }
        })
    }

    static deleteTodo($url) {
        return $.ajax({
            headers: {
                token: localStorage.token
            },
            method: 'DELETE',
            url: $url,
            beforeSend: () => {
                $(this).text('Loading...')
            },
            success: (result) => {
                $alertInfo.show()
                $alertInfo.find('.alert').text(`Todo ${result.title} sucessfully deleted!`)
                this.getTodo()
                setTimeout(() => {
                    $alertInfo.hide().fadeOut(1000)
                }, 2000);
            },
            error: (xhr, status) => {
                let err = JSON.parse(xhr.responseText)
            },
            complete: () => {
                $(this).text('Delete')
            }
        })
    }

    static updateTodo($title, $description, $status, $due_date, $id) {
        const objValue = {
            title: $title,
            description: $description,
            status: $status,
            due_date: $due_date
        }

        return $.ajax({
            headers: {
                token: localStorage.token
            },
            method: 'PUT',
            url: `${base_url}/todos/${$id}`,
            data: objValue,
            beforeSend: () => {
                $('#btnAdd').text('Loading...')
            },
            success: (result) => {
                $modalEditTodo.modal('hide')
                $alertInfo.show()
                $alertInfo.find('.alert').text(`Todo ${result.title} sucessfully updated!`)
                this.getTodo()
                clearField($formUpdateTodo)
                setTimeout(() => {
                    $alertInfo.hide().fadeOut(1000)
                }, 2000);
            },
            error: (xhr, status) => {
                let err = JSON.parse(xhr.responseText)
                for (let key in err.message) {
                    $(`#${key}`).addClass('is-invalid')
                    $(`.error_${key}`).text(err.message[key])
                }
            },
            complete: () => {
                $('#btnAdd').text('Add Todo')
            }
        })
    }
}