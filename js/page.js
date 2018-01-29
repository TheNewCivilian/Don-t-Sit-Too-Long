$(window).load(function() {
  $(".btn-nav").on("click tap", function() {
    $(".nav-container").toggleClass("showNav hideNav").removeClass("hidden");
    $(".home_content").toggleClass("silder_out");
    $(".add_content").toggleClass("silder_out");
    $(".archive_content").toggleClass("silder_out");
    $(this).toggleClass("animated");
  });
  $(".home_menue_item").on("click tap", function() {
    BackEnd.get_active_entries();
    $(".home_content").removeClass("hidden");
    $(".add_content").addClass("hidden");
    $(".archive_content").addClass("hidden");
    $(this).toggleClass("animated");
  });
  $(".add_menue_item").on("click tap", function() {
    $(".add_content").removeClass("hidden");
    $(".home_content").addClass("hidden");
    $(".archive_content").addClass("hidden");
    $(this).toggleClass("animated");
  });
  $(".archive_menue_item").on("click tap", function() {
    BackEnd.get_archive_entries();
    $(".archive_content").removeClass("hidden");
    $(".home_content").addClass("hidden");
    $(".add_content").addClass("hidden");
    $(this).toggleClass("animated");
  });
});

function updateArmsInput(val) {
      document.getElementById('form_value_arms').innerHTML=val;
    }
function updateChestInput(val) {
      document.getElementById('form_value_chest').innerHTML=val;
    }
function updateStomachInput(val) {
      document.getElementById('form_value_stomach').innerHTML=val;
    }
function updateLegsInput(val) {
      document.getElementById('form_value_legs').innerHTML=val;
    }
