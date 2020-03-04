var showAlert = () => {
  $("#alert-message").show()
}

var successAlert = () => {
  $("#alert-message").prop("class", 'alert alert-success')
  $("#alert-message > .content-alert").text("Success")
}

var errorAlert = () => {
  $("#alert-message").prop("class", 'alert alert-danger')
}

var clearAlert = () => {
  setTimeout(() => {
    $("#alert-message").fadeOut()
  }, 2500);
}