$(document).ready(function(){
	var w = $(window);
	var bar = $('#navbar');
	var top = bar.position().top;

	$('.gallery-item').height($('.gallery-item').width());
	
	w.resize(function() {
		$('.gallery-item').height($('.gallery-item').width());
	});

	$('.gallery-item').hover(function(){
		caption = $(this).find('.caption');

		caption.height(caption.parent().height()-20);
		caption.width(caption.parent().height()-20);
	});

	w.scroll(function() {
		if(w.scrollTop() >= top) {
			$('.nav').removeClass('hidden');
			bar.addClass('fixed');
			bar.css('height', '10%');
			$('#nav-spacer').addClass('hold');
		} else {
			$('.nav').addClass('hidden');
			bar.removeClass('fixed');
			bar.css('height', '20%');
			$('#nav-spacer').removeClass('hold');
		}
	});

	$('.nav-portfolio').click(function() {
		navClick('#portfolio');
		return false;
	});

	$('.nav-about').click(function() {
		navClickPlus('#about');
		return false;
	});

	$('.nav-contact').click(function() {
		navClickPlus('#contact');
		return false;
	});

	function navClick(section) {
		console.log(section);
		var displace = $(section).position().top - bar.height()*.8;
		$('html,body').animate({scrollTop: displace }, 1100);
	}

	function navClickPlus(section) {
		console.log(section);
		var displace = $(section).position().top + bar.height()*.8;
		$('html,body').animate({scrollTop: displace }, 1100);
	}

	if (w.width() < 625) {
		$('.nav:nth-child(3)').hide();
	} else {
		$('.nav:nth-child(3)').show();
	}
});