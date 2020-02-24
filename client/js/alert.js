class Alert {
    static confirmation(params) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                Request.delete(params)
            }
        });
    }

    static confirmationUpdate(id) {
        swal({
            title: "Are you sure?",
            text: "Make sure the data to be updated is correct",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdate) => {
            if (willUpdate) {
                const value = {
                    id,
                    title: $(`#edit-title`).val(),
                    description: $(`#edit-description`).val(),
                    due_date: $(`#edit-due_date`).val(),
                }
                $.ajax({
                    type: "put",
                    url: `${endpoint}/todos/${id}`,
                    data: value,
                    headers: {
                        token: localStorage.getItem('token')
                    },
                    success: function (response) {
                        $(`#edit-title`).val('')
                        $(`#edit-description`).val('')
                        $(`#edit-due_date`).val('')
                        $form_edit.slideUp(500, function () {
                            $form_edit.hide()
                            $('#add_form').show();
                        });
                        Alert.notification("Successfully updated data", "success")
                        Request.getTodos()
                    },
                    error: function (err) {
                        Request.createError(err)
                    }
                });
            }
        });
    }

    static confirmationExit() {
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willExit) => {
            if (willExit) {
                localStorage.removeItem('token')
                localStorage.removeItem('email')
                signOut()
                userIsNotLoggedIn()
            }
        });
    }

    static notification(msg, icon) {
        swal(msg, {
            icon: icon,
        });
    }
}