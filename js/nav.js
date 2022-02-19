var toggleNavOverlay = function(show) {
    debugger;
    if (show) {
        document.querySelector(".nav-overlay").classList.add('show');
    }
    else {
        document.querySelector(".nav-overlay").classList.remove('show');
    }
};

window.addEventListener('load', function () {
    document.querySelector('.nav-toggle').addEventListener('click', function(event) {
        debugger;
        toggleNavOverlay(true);
        event.preventDefault();
    });
}, false);