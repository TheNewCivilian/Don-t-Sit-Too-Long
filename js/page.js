$(window).load(function() {
  $(".btn-nav").on("click tap", function() {
    $(".nav-container")
      .toggleClass("showNav hideNav")
      .removeClass("hidden")
    $(".home_page").toggleClass("silder_out")
    $(".add_page").toggleClass("silder_out")
    $(".archive_page").toggleClass("silder_out")
    $(this).toggleClass("animated")
  })
  $(".home_menue_item").on("click tap", function() {
    BackEnd.show_page("home","HOME")
  })
  $(".tasks_menue_item").on("click tap", function() {
    BackEnd.show_page("tasks","Active Tasks")
  })
  $(".add_menue_item").on("click tap", function() {
    BackEnd.show_page("add","Manage your Tasks")
  })
  $(".archive_menue_item").on("click tap", function() {
    BackEnd.show_page("archive","Archive")
  })
  $(".connect_menue_item").on("click tap", function() {
    BackEnd.show_page("connect","Connect")
  })
  $(".about_menue_item").on("click tap", function() {
    BackEnd.show_page("about","About")
  })
})
