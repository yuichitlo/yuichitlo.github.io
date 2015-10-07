$("button").click(function() {
		$("#menu").hide();
		console.log('CLICKED');
	});

	$("#menu-icon").toggle(
	  function() {
	  	console.log('SHOW');
	  	$("#menu").removeClass('menuin');
	  	$("#menu").addClass('menuOut');
	  	$("#menu").animate({ left: 0 }, 'slow', function() {
	  		console.log('SHOW');
	  		$("#menu-icon").css('left', 200);
	  	});
	  },
	  function() {
	  	console.log('HIDE');
	  	$("#menu").removeClass('menuOut');
	  	$("#menu").addClass('menuIn');
		$("#menu").animate({ left: -500 }, 'slow', function() {
			console.log('HIDE');
			$("#menu-icon").css('left', 0);
	  	});
	  }
	);