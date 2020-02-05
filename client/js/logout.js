$(document).ready(() => {
    $("#btnLogout").on('click', () => {
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("email");

        checkLogin();
    });
});