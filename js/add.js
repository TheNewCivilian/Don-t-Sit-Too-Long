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
