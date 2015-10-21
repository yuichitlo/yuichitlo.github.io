$(document).ready(function() {
	var dates = [];
	$.getJSON( "data.json", function( data ) {
	  console.log("Here");
	  var chart = "";
	  $.each( data["days"], function( key, vals ) {
	  	chart += "<div class='row' data-date='" + vals["date"] + "'>";
	  	for (val in vals["blocks"]) {
	  		var cur_block = vals["blocks"][val];
	    	chart += ( "<div class='block " + cur_block[0] + "' style=width:" + cur_block[1]*100 + "%;'>" + cur_block[1]*100 + "%</div>");
		}

		chart += "</div>";

		var date = vals["date"];
		dates[date] = {"weather": vals["weather"], "high": vals["high"], "low": vals["low"], "sick": vals["sick"]};
	  });

	  console.log(dates);

	  $(".chart").prepend(chart);

	  $(".row").each(function() {
		$(this).hover(function() {
			$(this).toggleClass("row-expanded");
			var currentRow = $(this);
			if ($(".details").length > 0) {
				$(".details").slideUp("slow").remove();
			} else {
				console.log("Open details");
				var currentDate = $(this).attr("data-date");
				console.log(currentDate);
				var details = dates[currentDate];
				currentRow.after("<div class='details hide'><h3>" + currentDate + "</h3>" + details["weather"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;H | " + details["high"] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L | " + details["low"] + "</div>");
				$(".details").slideToggle("slow");
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
});