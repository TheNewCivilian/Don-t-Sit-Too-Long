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
    BackEnd.show_page("home")
  })
  $(".tasks_menue_item").on("click tap", function() {
    BackEnd.show_page("tasks")
  })
  $(".add_menue_item").on("click tap", function() {
    BackEnd.show_page("add")
  })
  $(".archive_menue_item").on("click tap", function() {
    BackEnd.show_page("archive")
  })
})
