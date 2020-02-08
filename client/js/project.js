var $todoLink = $("#todo-link");
var $projectLink = $("#project-link");

$("#project").hide();

$projectLink.on("click", function (e) {
  e.preventDefault();
  $("#todo").hide();
  $("#project").show();
})

$todoLink.on("click", function (e) {
  e.preventDefault();
  $("#project").hide();
  $("#todo").show();
})