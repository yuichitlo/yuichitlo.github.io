$(document).ready(function() {
	$(".category").each(function() {
		$(this).hover(function() {
			$(".suggestion." + $(this).html()).slideToggle(400, "swing");
		});

		$(this).click(function() {
			console.log($(this).html());
			$(".resize-container div:last-child").after(
			'<div tabindex="2" class="resize-drag draggable ' + $(this).html() + '"><img class="stretch" src="stretch.png"/></div>'
			);
		});
	});

	$(".row").each(function() {
		$(this).hover(function() {
			$(this).toggleClass("row-expanded");
		});
	});

	$(".today").click(function() {
		$(".new").slideToggle(1300, "swing");
	});

	$(".resize-drag").each(function() {
		$(this).click(function() {
			console.log($(this).width());
		});
	});
});