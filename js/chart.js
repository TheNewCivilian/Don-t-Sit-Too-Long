nv.addGraph(function() {
  var chart = nv.models.lineWithFocusChart();

  chart.xAxis
    .showMaxMin(false)
    .tickFormat(function(d) { return d3.time.format('%x %I %p')(new Date(d)) });


  chart.x2Axis
    .showMaxMin(false)
    .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });


  chart.yAxis
    .axisLabel("Points")
    .tickFormat(d3.format(',r'));

  chart.y2Axis
    .tickFormat(d3.format(',r'));

  chart.tooltipContent( function(key, x, y){
    //To Add
  } )

  d3.select('#chart svg')
    .datum(data())
    .transition().duration(500)
    .call(chart)
    ;

  nv.utils.windowResize(chart.update);

  return chart;
});


function data() {
  var arms_graph = []
  var chest_graph = []
  var stomach_graph = []
  var legs_graph = []
  logjson = JSON.parse(BackEnd.get_log_data())
  var points_arm = 0
  var points_chest = 0
  var points_stomach = 0
  var points_legs = 0
  for (var i = 0; i < logjson.length; i++){
        var item = logjson[i];
        points_arm += parseInt(item.arms);
        points_chest += parseInt(item.chest);
        points_stomach += parseInt(item.stomach);
        points_legs += parseInt(item.legs);
        timestamp = new Date(parseInt(item.time.year),parseInt(item.time.month),parseInt(item.time.day),parseInt(item.time.hour), parseInt(item.time.minute))
        arms_graph.push({x: timestamp, y: points_arm})
        chest_graph.push({x: timestamp, y: points_chest})
        stomach_graph.push({x: timestamp, y: points_stomach})
        legs_graph.push({x: timestamp, y: points_legs})
  }

  return [{
      key: 'Arms',
      values: arms_graph,
      color: '#f5fdc6'
    },{
        key: 'Chest',
        values: chest_graph,
        color: '#368f8b'
    },{
        key: 'Stomach',
        values: stomach_graph,
        color: '#af125a'
    },{
        key: 'Legs',
        values: legs_graph,
        color: '#ddbea8'
    }]

}
