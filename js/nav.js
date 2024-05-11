var toggleNavOverlay = function(show) {
    if (show) {
        document.querySelector(".nav-overlay").classList.add('show');
        document.querySelector(".nav-overlay").classList.remove('hide');
    }
    else {
        document.querySelector(".nav-overlay").classList.remove('show');
        document.querySelector(".nav-overlay").classList.add('hide');
    }
};

window.addEventListener('load', function () {
    document.querySelector('.nav-toggle').addEventListener('click', function(event) {
        toggleNavOverlay(true);
        event.preventDefault();
    });

    document.querySelector('.nav-overlay-close').addEventListener('click', function(event) {
        toggleNavOverlay(false);
        event.preventDefault();
    });
}, false);