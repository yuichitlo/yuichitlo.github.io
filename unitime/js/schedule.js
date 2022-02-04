interact('.resize-drag')
  .draggable({
    onmove: window.dragMoveListener
  })
  .resizable({
    preserveAspectRatio: false,
    edges: { left: false, right: true, bottom: false, top: false }
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    //target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
  });

interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: ".resize-container.schedule",
      endOnly: true,
      elementRect: { top: 1, left: 1, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: false,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0);// + event.dy;
    
    if (target.getBoundingClientRect().right <= ($('#schedule').position().left + $('#schedule').width())+1 && x+event.dx < ($('#schedule').position().left + $('#schedule').width())+1) {
      // translate the element
      target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
      console.log(target.getAttribute('data-x'));
      console.log(x+event.dx);
      console.log(($('#schedule').position().left + $('#schedule').width())+1);
    }
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;