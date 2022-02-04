var main = function() {
  $('.slide').first().addClass('active-slide');
  
  $('.arrow-next').click(function() {
    var currentSlide = $('.active-slide');
    var nextSlide = currentSlide.next('.slide');

    if(nextSlide.length === 0) {
      nextSlide = $('.slide').first();
    }
    
    currentSlide.fadeOut(800).removeClass('active-slide');
    sleep(800);
    nextSlide.fadeIn(800).addClass('active-slide');

  });


  $('.arrow-prev').click(function() {
    var currentSlide = $('.active-slide');
    var prevSlide = currentSlide.prev('.slide');

    if(prevSlide.length === 0) {
      prevSlide = $('.slide').last();
    }
    
    currentSlide.fadeOut(800).removeClass('active-slide');
    sleep(800);
    prevSlide.fadeIn(800).addClass('active-slide');
  });

  $('#nav-toggle').click(function() {
    var navbar = $('#navbar');

    navbar.toggleClass('away');

  });
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

$(document).ready(main);