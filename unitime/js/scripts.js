var dates = {};

$(document).ready(function() {
	$.getJSON( "data.json", function( data ) {
	  var chart = "";
	  $.each( data["days"], function( key, vals ) {
	  	chart += "<div class='set'><div class='row' data-date='" + vals["date"] + "'>";
	  	for (val in vals["blocks"]) {
	  		var cur_block = vals["blocks"][val];
	    	chart += ( "<div class='block " + cur_block[0] + "' style=width:" + cur_block[1]*100 + "%;'>" + cur_block[1]*100 + "%</div>");
		}

		chart += "</div></div>";

		var date = vals["date"];
		dates[date] = {"mind": vals["blocks"][0][1]*100, "body": vals["blocks"][1][1]*100, "world": vals["blocks"][2][1]*100, "craft": vals["blocks"][3][1]*100, "misc": vals["blocks"][4][1]*100, "weather": vals["weather"], "high": vals["high"], "low": vals["low"], "sick": vals["sick"]};
	  });

	  $(".chart").prepend(chart);

	  $(".row").each(function() {
		$(this).hover(function() {
			$(this).toggleClass("row-expanded");
			var currentRow = $(this);
			if ($(".details").length > 0) {
				$(".details").slideUp(800).remove();
			} else {
				var currentDate = $(this).attr("data-date");
				var details = dates[currentDate];
				currentRow.after("<div class='details hide'><h3>" + currentDate + "</h3>" + details["weather"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;H | " + details["high"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L | " + details["low"] + "</div>");
				if (currentRow.hasClass("week")) {
					$(".details").addClass("week");
				} else {
					$(".details").removeClass("week");
				}
				$(".details").slideToggle(800);
				$(".details").css("display", "inline-block");
			}
		});
	  });
	});

	$(".category").each(function() {
		var type = $(this).attr("data-category");

		$(this).click(function() {
			$(".resize-container").append(
				'<div tabindex="2" class="resize-drag draggable ' + type + '" data-category="' + type + '"><img class="stretch" src="stretch.png"/></div>'
			);
		});

		$(this).find(".info").hover(function() {
			console.log(type);
			$(".suggestion." + type).slideToggle(400, "swing");
		});
	});


	var today = true;
	// $(".header").click(function() {
	// 	$(".new").slideToggle(1300, "swing", function() {
	// 		$('.header').fadeOut(200, function() {
	// 			if (today) {
	//         		$(this).html('<h1 class="save">\u2014 Save</h1><h1 class="close">x Close</h1>').fadeIn(500);
	//         		today = false;
	//         	} else {
	//         		$(this).html('<h1 class="today">+ Today</h1>').fadeIn(500);
	//         		today = true;
	//         		if ($('.resize-drag').length > 0) {
	// 	        		addToChart();
	// 	        	}
	//         	}
 //    		});
	// 	});
	// });

	$(".today").click(function() {
		$(".new").slideToggle(1300, "swing", function() {
			$('.header').fadeOut(200, function() {
        		$(".today").fadeOut(200, function() {
	        		$('.save').removeClass("hide");
	        		$('.close').removeClass("hide");
	        	});
        	});
        	$('.header').fadeIn(500);
        });
	});

	$(".save").click(function() {
		console.log("Save");
		$(".new").slideToggle(1300, "swing", function() {
			$('.header').fadeOut(200, function() {
        		$('.save').addClass("hide");
        		$('.close').addClass("hide");
        		$(".today").fadeIn(200);
        		if ($('.resize-drag').length > 0) {
	        		addToChart();
	        	}
	        });
	        $(".header").fadeIn(500);
		});
	});

	$(".close").click(function() {
		console.log("Close");
		$(".new").slideToggle(1300, "swing", function() {
			$('.header').fadeOut(200, function() {
				$('.save').addClass("hide");
        		$('.close').addClass("hide");
        		$(".today").fadeIn(200);
	        });
	        $(".header").fadeIn(500);
		});
	});

	function addToChart() {
		var chart = "<div class='row'>";
		var total = 0;
		$(".resize-drag").each(function() {
			total += $(this).width();
		});

		$(".resize-drag").each(function() {
			chart += ("<div class='block " + $(this).attr("data-category") + "' style=width:" + ($(this).width()/total)*100 + "%;'>" + Math.floor(($(this).width()/total)*100) + "%</div>");
		});

		chart += "</div>";

	  	$(".chart").prepend(chart);

		$(".row").each(function() {
			$(this).hover(function() {
				$(this).toggleClass("row-expanded");
			});
		});

		$(".resize-container").html("");
	}

	$(".resize-drag").each(function() {
		$(this).click(function() {
			console.log($(this).width());
		});
	});

	$(".toolbar-scaleopts.medium").click(function() {
		console.log("Medium");
		$(".row > .block").fadeOut(600, function() {
			$(".row").addClass("week");
			$(".row > .block").fadeIn(2000);
		});
		
	});

	$(".toolbar-scaleopts.large").click(function() {
		console.log("Medium");
		$(".row > .block").fadeOut(600, function() {
			$(".row").removeClass("week");
			$(".row").addClass
			$(".row > .block").fadeIn(2000);
		});
	});

	$(".overall").click(function() {
		$(".chart").fadeOut(500, function() {
			$(".dashboard").fadeIn(1000);
		});
		$(".header").fadeOut(500);
		$(".new").fadeOut(500, function() {
			$('.save').addClass("hide");
    		$('.close').addClass("hide");
        	$(".today").fadeIn(200);
		});
	});

	$(".year").click(function() {
		if ($(".chart").css('display') == "none") {
			$(".dashboard").fadeOut(500, function() {
				$(".chart").fadeIn(1000);
				$(".header").fadeIn(1000);
			});
		}
		$(".row > .block").fadeOut(600, function() {
			$(".set").removeClass("month");
			$(".set").removeClass("week");
			$(".row").addClass("year");
			$(".set").addClass("year");
			$(".row > .block").fadeIn(2000);
		});
		
	});

	$(".month").click(function() {
		if ($(".chart").css('display') == "none") {
			$(".dashboard").fadeOut(500, function() {
				$(".chart").fadeIn(1000);
				$(".header").fadeIn(1000);
			});
		}

		$(".row > .block").fadeOut(600, function() {
			$(".set").removeClass("year");
			$(".set").removeClass("week");
			$(".row").addClass("month");
			$(".details").addClass("month");
			$(".set").addClass("month");
			$(".row > .block").fadeIn(2000);
		});
		
	});

	$(".week").click(function() {
		if ($(".chart").css('display') == "none") {
			$(".dashboard").fadeOut(500, function() {
				$(".chart").fadeIn(1000);
				$(".header").fadeIn(1000);
			});
		}

		$(".row > .block").fadeOut(600, function() {
			$(".set").removeClass("month");
			$(".row").addClass("week");
			$(".details").addClass("week");
			$(".set").addClass("week");
			$(".row > .block").fadeIn(2000);
		});
		
	});

	$(".day").click(function() {
		if ($(".chart").css('display') == "none") {
			$(".dashboard").fadeOut(500, function() {
				$(".chart").fadeIn(1000);
				$(".header").fadeIn(1000);
			});
		}

		$(".row > .block").fadeOut(600, function() {
			$(".set").removeClass("month");
			$(".row").removeClass("week");
			$(".details").removeClass("week");
			$(".set").removeClass("week");
			$(".row > .block").fadeIn(2000);
		});
	});

	var totals = [
	  { category: 'mind',  count: 201 },
	  { category: 'body',  count: 138 },
	  { category: 'world',  count: 109 },
	  { category: 'craft',  count: 270 },
	  { category: 'misc', count: 182 }
	];

	// console.log(dates);
	// for (var date in dates) {
	// 	console.log(date);
	// 	totals[0].count = totals[0].count + date[totals[0].category];
	// 	totals[1].count += date[totals[1].category];
	// 	totals[2].count += date[totals[2].category];
	// 	totals[3].count += date[totals[3].category];
	// 	totals[4].count += date[totals[4].category];
	// }

	//console.log(totals);

	var pie = d3.layout.pie().value(function(d) { return d.count })

	var slices = pie(totals);

	var arc = d3.svg.arc().innerRadius(0).outerRadius(150);

	var svg = d3.select('svg.pie');
	var g = svg.append('g')
	  .attr('transform', 'translate(150, 150)')

	g.selectAll('path.slice')
	  .data(slices)
	    .enter()
	      .append('path')
	        .attr('class', 'slice')
	        .attr('class', function(d) {
	        	return d.data.category;
	        })
	        .attr('d', arc);
	        // .attr('fill', function(d) {
	        //   return color(d.data.product);
	        // });

	var data = [
      { date: '2014-01-01', amount: 10 },
      { date: '2014-02-01', amount: 20 },
      { date: '2014-03-01', amount: 40 },
      { date: '2014-04-01', amount: 80 }
    ];

	var x = d3.time.scale()
	    .domain([
	      new Date(Date.parse('2014-01-01')),
	      new Date(Date.parse('2014-04-01'))
	    ])
	    .range([0, 300]);

	//x(new Date(Date.parse('2014-02-01')));
	// 103.3811949976841
	var xAxis = d3.svg.axis()
	  .scale(x)         // x is the d3.time.scale()
	  .orient('bottom') // the ticks go below the graph
	  .ticks(6);        // specify the number of ticks

	var linegraph = d3.select('svg.line')   // create an <svg> element
	    .attr('width', 500) // set its dimentions
	    .attr('height', 150);

	linegraph.append('g')            // create a <g> element
	  .attr('class', 'axis')
	  .attr("transform", "translate(50, 0)")
	  .attr('fill', '#808080') // specify classes
	  .call(xAxis);

});