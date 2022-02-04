$(document).ready(function() {
	$(".card").each(function() {
	  	$(this).click(function(event) {
	  		if (!$(this).hasClass("flipped")) {
		  		$(".flipped").removeClass("flipped");
		  	}
		  	$(this).toggleClass("flipped");
		});
	});

	$(".back img").each(function() {
		$(this).mouseover(function(event) {
			$(this).attr("src", $(this).attr("src") + "?a="+Math.random());
		});
	});
});