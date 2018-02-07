function home_script () {

  var clicked = BackEnd.get_pause_status();
  if (clicked == 1){
    clicked = 0;
    BackEnd.pause_training()
    $("#pause").css('background-color', '#af125a')
              .html("GET UP, YOU LAZY SHIT!")
  }

  var logjson = JSON.parse(BackEnd.get_log_data())
  var points_arm = 0
  var points_chest = 0
  var points_stomach = 0
  var points_legs = 0
  var points_avg = 0
  var points_goal = 0
  for (var i = 0; i < logjson.length; i++) {
    var item = logjson[i]
    points_arm += parseInt(item.arms)
    points_chest += parseInt(item.chest)
    points_stomach += parseInt(item.stomach)
    points_legs += parseInt(item.legs)
  }
  points_avg = (points_arm+points_chest+points_stomach+points_legs)/4
  points_goal_a = 5*Math.pow(2, Math.round(getBaseLog(2, Math.round(points_avg/5))))
  if (points_goal_a < points_avg || points_goal_a<=20){
    points_goal = 5*Math.pow(2, Math.round(getBaseLog(2, Math.round(points_avg/5)))+1)
  }else {
    points_goal = points_goal_a
  }



  $('#goal').goalProgress({
      goalAmount: points_goal,
      currentAmount: points_avg,
      textBefore: '',
      textAfter: '/' + points_goal
  })


  $("#pause").click(function(){
      if (clicked == 1){
        clicked = 0;
        BackEnd.pause_training()
        $("#pause").css('background-color', '#af125a')
                  .html("GET UP, YOU LAZY SHIT!")
      }else{
        clicked = 1;
        BackEnd.resume_training()
        $("#pause").css('background-color', '#495060')
                  .html("PAUSE TRAINING")
      }
  });

}

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}
