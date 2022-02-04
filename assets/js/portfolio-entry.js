$(document).ready(function() {
	$('.flex-caption').height($('.flex-caption').parent().height());
	$('.flexslider').height($(window).width()*0.4);

	$(window).resize(function() {
		if ($(window).width() <= 400) {
			$('.flexslider').height($(window).width()*0.8);
		console.log("inside");
		} else {
			$('.flexslider').height($(window).width()*0.4);
		}
		$('.flexslider .slides').height($('.flexslider').height());
	});

	$('#mini-navbar').hide();
	$('#expand').click(function() {
		$('#mini-navbar').slideToggle();
	});
});