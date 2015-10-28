$(document).ready(function() {
	var dates = {};
	$.getJSON( "data.json", function( data ) {
	  var chart = "";
	  $.each( data["days"], function( key, vals ) {
	  	chart += "<div class='row' data-date='" + vals["date"] + "'>";
	  	for (val in vals["blocks"]) {
	  		var cur_block = vals["blocks"][val];
	    	chart += ( "<div class='block " + cur_block[0] + "' style=width:" + cur_block[1]*100 + "%;'>" + cur_block[1]*100 + "%</div>");
		}

		chart += "</div>";

		var date = vals["date"];
		dates[date] = {"mind": vals["blocks"][0][1]*100, "body": vals["blocks"][1][1]*100, "world": vals["blocks"][2][1]*100, "craft": vals["blocks"][3][1]*100, "misc": vals["blocks"][4][1]*100, "weather": vals["weather"], "high": vals["high"], "low": vals["low"], "sick": vals["sick"]};
	  });

	  console.log(dates);

	  $(".chart").prepend(chart);

	  $(".row").each(function() {
		$(this).hover(function() {
			$(this).toggleClass("row-expanded");
			var currentRow = $(this);
			if ($(".details").length > 0) {
				$(".details").slideUp(800).remove();
			} else {
				console.log("Open details");
				var currentDate = $(this).attr("data-date");
				console.log(currentDate);
				var details = dates[currentDate];
				currentRow.after("<div class='details hide'><h3>" + currentDate + "</h3>" + details["weather"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;H | " + details["high"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L | " + details["low"] + "</div>");
				$(".details").slideToggle(800);
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
	$(".today").click(function() {
		$(".new").slideToggle(1300, "swing", function() {
			$('.today').fadeOut(200, function() {
				if (today) {
	        		$(this).text('\u2014 Save').fadeIn(500);
	        		today = false;
	        	} else {
	        		$(this).text('+ Today').fadeIn(500);
	        		today = true;
	        		if ($('.resize-drag').length > 0) {
		        		addToChart();
		        	}
	        	}
    		});
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

	var totals = [
	  { category: 'mind',  count: 0 },
	  { category: 'body',  count: 0 },
	  { category: 'world',  count: 0 },
	  { category: 'craft',  count: 0 },
	  { category: 'misc', count: 0 }
	];

	for (date in dates) {
		totals[0].count = totals[0].count + date[totals[0].category];
		totals[1].count += date[totals[1].category];
		totals[2].count += date[totals[2].category];
		totals[3].count += date[totals[3].category];
		totals[4].count += date[totals[4].category];
	}

	console.log(totals);

	var pie = d3.layout.pie().value(function(d) { return d.count })

	var slices = pie(totals);

	var arc = d3.svg.arc().innerRadius(0).outerRadius(50);

	// helper that returns a color based on an ID
	var color = d3.scale.category10();

	var svg = d3.select('svg.pie');
	var g = svg.append('g')
	  .attr('transform', 'translate(200, 50)')

	g.selectAll('path.slice')
	  .data(slices)
	    .enter()
	      .append('path')
	        .attr('class', 'slice')
	        .attr('class', function(d) {
	        	return d.data.product;
	        })
	        .attr('d', arc);
});