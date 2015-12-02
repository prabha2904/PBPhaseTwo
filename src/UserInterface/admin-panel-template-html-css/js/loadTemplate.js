/*************** for  pie chart ********************************/
function loadSVG() {
	$(".popUpDiv").bPopup({
			 popUpDivClose: true
		});
	var width = 1000, height = 500, radius = Math.min(width, height) / 2;

	var color = d3.scale.category20c();

	var arc = d3.svg.arc().outerRadius(radius - 5).innerRadius(100);

	var pie = d3.layout.pie().sort(null).value(function(d) {
		return d.value;
	});
	d3.select(".popUpDiv").html('<a class="b-close">x</a>'); 
	var svg = d3.select(".popUpDiv").append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	d3.csv("lang.txt", function(error, data) {

		data.forEach(function(d) {
			d.value = +d.value;
		});
		var g = svg.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");

		g.append("path").attr("d", arc).style("fill", function(d) {
			return color(d.data.key);
		});

		g.append("text").attr("transform", function(d) {
			return "translate(" + arc.centroid(d) + ")";
		}).attr("dy", ".35em").style("text-anchor", "end").text(function(d) {
			return d.data.key;
		});
	});
}

/***************  pie chart End ********************************/
/***************  Graph ********************************/
function loadGraph() {
	$(".popUpDiv").bPopup({
			 popUpDivClose: true
		});
	var margin = {
		top : 20,
		right : 20,
		bottom : 30,
		left : 50
	}, width = 960 - margin.left - margin.right, height = 500 - margin.top - margin.bottom;

	var parseDate = d3.time.format("%H:%M:%S").parse;

	var x = d3.time.scale().range([0, width]);

	var y = d3.scale.linear().range([height, 0]);

	var xAxis = d3.svg.axis().scale(x).orient("bottom");

	var yAxis = d3.svg.axis().scale(y).orient("left");

	var line = d3.svg.line().x(function(d) {
		return x(d.key);
	}).y(function(d) {
		return y(d.value);
	});
	d3.select(".popUpDiv").html('<a class="b-close">x</a>'); 
	var svg = d3.select(".popUpDiv").append("svg").attr("width", "100%")/* .attr("width", width + margin.left + margin.right)*/.attr("height", height + margin.top + margin.bottom)./*style("background", "#fff").*/append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.csv("time.txt", function(error, data) {
		data.forEach(function(d) {
			d.key = parseDate(d.key);
			d.value = +d.value;
		});

		x.domain(d3.extent(data, function(d) {
			return d.key;
		}));
		y.domain(d3.extent(data, function(d) {
			return d.value;
		}));

		svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

		svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Tweet Count");

		svg.append("path").datum(data).attr("class", "line").attr("d", line);
	});
}

/***************  Graph End ********************************/

/***************  Cloud ********************************/
function loadFonts() {
	$(".popUpDiv").bPopup({
			 popUpDivClose: true
		});
		var fill = d3.scale.category20();
		d3.csv("hashtags.txt", function(data) {
		data.forEach(function(d) {
			d.size = +d.size;
		});

		d3.layout.cloud().size([900, 600]).words(data).padding(5).rotate(function() {
			return ~~(Math.random() * 2) * 90;
		}).font("Impact").fontSize(function(d) {
			return Math.max(8, Math.min(d.size, d.size-300,50));
		}).on("end", draw).start();

		function draw(words) {
			d3.select(".popUpDiv").html('<a class="b-close">x</a>'); 
			//d3.select("#map-canvas").style("display", "none");   /* hiding the maps div while displaying remaining carousels */
			d3.select(".popUpDiv").append("svg").attr("width", 600).attr("height", 600).append("g").attr("transform", "translate(300,300)").selectAll("text").data(data).enter().append("text").style("font-size", function(d) {
				return d.size + "px";
			}).style("font-family", "Impact").style("fill", function(d, i) {
				return fill(i);
			}).attr("text-anchor", "middle").attr("transform", function(d) {
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			}).text(function(d) {
				return d.text;
			});
		}

	});
}


/***************  End of Cloud ********************************/

/********************Bar Graph***************************/
function loadBarGraph(){
$(".popUpDiv").bPopup({
			 popUpDivClose: true
		});
	var margin = {
		top : 20,
		right : 20,
		bottom : 30,
		left : 50
	}, width = 960 - margin.left - margin.right, height = 500 - margin.top - margin.bottom;

	var parseDate = d3.format("");

	var x = d3.scale.ordinal().rangeRoundBands([0, width], .3);

	var y = d3.scale.linear().range([height, 0]);

	var xAxis = d3.svg.axis().scale(x).orient("bottom");

	var yAxis = d3.svg.axis().scale(y).orient("left");

	
	d3.select(".popUpDiv").html('<a class="b-close">x</a>');

var svg = d3.select(".popUpDiv").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("timeZone.txt", function(error, data) {

    data.forEach(function(d) {
        d.value = +d.value;
    });
	
  x.domain(data.map(function(d) { return d.key; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
	  .attr("y", 20)
	  .attr("x", 25);
      
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)" )
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Tweet Count");

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "pink")
      .attr("x", function(d) { return x(d.key); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

});
}
/******************End of Bar Graph********************/

