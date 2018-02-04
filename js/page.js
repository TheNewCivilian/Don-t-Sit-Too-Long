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
    BackEnd.get_active_entries()
  })
  $(".add_menue_item").on("click tap", function() {
    BackEnd.show_page("add")
    addoptions()
  })
  $(".archive_menue_item").on("click tap", function() {
    BackEnd.get_archive_entries()
  })
})

function show_selected(tid) {
  if (tid == -1) {
    document.getElementById("form_input_name").value = ""
    document.getElementById("form_input_disc").value = ""
    document.getElementById("form_input_arms").value = 0
    document.getElementById("form_input_chest").value = 0
    document.getElementById("form_input_stomach").value = 0
    document.getElementById("form_input_legs").value = 0
    document.getElementById("form_input_tid").value = 0
  } else {
    json_return = JSON.parse(BackEnd.get_entries_by_tid(tid))
    var item = json_return[0]
    document.getElementById("form_input_name").value = item.name
    document.getElementById("form_input_disc").value = item.disc
    document.getElementById("form_input_arms").value = item.arms
    document.getElementById("form_input_chest").value = item.chest
    document.getElementById("form_input_stomach").value = item.stomach
    document.getElementById("form_input_legs").value = item.legs
    document.getElementById("form_input_tid").value = item.tid
    updateArmsInput(item.arms)
    updateChestInput(item.chest)
    updateStomachInput(item.stomach)
    updateLegsInput(item.legs)
  }
}

function addoptions() {
  json_return = JSON.parse(BackEnd.get_all_entries())
  select = document.getElementById("selector")

  for (var i = 0; i < json_return.length; i++) {
    var item = json_return[i]
    var opt = document.createElement("option")
    opt.value = item.tid
    opt.innerHTML = item.name
    select.appendChild(opt)
  }
}

function updateArmsInput(val) {
  document.getElementById("form_value_arms").innerHTML = val
}
function updateChestInput(val) {
  document.getElementById("form_value_chest").innerHTML = val
}
function updateStomachInput(val) {
  document.getElementById("form_value_stomach").innerHTML = val
}
function updateLegsInput(val) {
  document.getElementById("form_value_legs").innerHTML = val
}
