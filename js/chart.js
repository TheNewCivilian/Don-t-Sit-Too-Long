google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawLineColors);

function drawLineColors() {
      var data = new google.visualization.DataTable();
      data.addColumn('datetime', 'X');
      data.addColumn('number', 'Arm');
      data.addColumn('number', 'Chest');
      data.addColumn('number', 'Stomache');
      data.addColumn('number', 'Leg');
      logjson = JSON.parse(BackEnd.get_log_data())
      var points_arm = 0
      var points_chest = 0
      var points_stomach = 0
      var points_legs = 0
      for (var i = 0; i < logjson.length; i++){
        var item = logjson[i];
        year = parseInt(item.time.year)+1
        points_arm += parseInt(item.arms);
        points_chest += parseInt(item.chest);
        points_stomach += parseInt(item.stomach);
        points_legs += parseInt(item.legs);
        data.addRow([new Date(parseInt(item.time.year), parseInt(item.time.month), parseInt(item.time.day), parseInt(item.time.hour), parseInt(item.time.minute)),points_arm, points_chest,points_stomach,points_legs ]);
      }

      var options = {
        hAxis: {
          title: 'Time',
          format: 'dd.MM',
          baselineColor: 'red',
          textStyle: {color: '#fff'},
        },
        vAxis: {
          title: 'Points',
          textStyle: {color: '#fff'},
        },
        colors: ['#f5fdc6', '#368f8b','#af125a','#ddbea8'],
        backgroundColor: '#373f51'
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
