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
    addoptions();
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

function show_selected(tid){
  if (tid == -1){
    document.getElementById('form_input_name').value = "";
    document.getElementById('form_input_disc').value = "";
    document.getElementById('form_input_arms').value = 0;
    document.getElementById('form_input_chest').value = 0;
    document.getElementById('form_input_stomach').value = 0;
    document.getElementById('form_input_legs').value = 0;
    document.getElementById('form_input_tid').value = 0;
  }else{
    json_return = JSON.parse(BackEnd.get_entries_by_tid(tid));
    var item = json_return[0];
    document.getElementById('form_input_name').value = item.name
    document.getElementById('form_input_disc').value = item.disc;
    document.getElementById('form_input_arms').value = item.arms;
    document.getElementById('form_input_chest').value = item.chest;
    document.getElementById('form_input_stomach').value = item.stomach;
    document.getElementById('form_input_legs').value = item.legs;
    document.getElementById('form_input_tid').value = item.tid;
  }

}

function addoptions() {
  json_return = JSON.parse(BackEnd.get_all_entries());
  select = document.getElementById('selector');

  for (var i = 0; i < json_return.length; i++){
      var item = json_return[i];
      var opt = document.createElement('option');
      opt.value = item.tid;
      opt.innerHTML = item.name;
      select.appendChild(opt);
  }
}

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
