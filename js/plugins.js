// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any Zepto/helper plugins in here.


//
// A touch enhancing unitility that allows for user to define DOM elements that they want to
// handle more elegantly on touch devices. This utility will apply classes to the defined
// element based on touched status and is overall more responsive then a native click event.
// --------------------------------------------------------------------------------------------
Zepto(function($) {
		
	touchEnhance = function($el, touchEvent) {
		
		// Assign custom function
		$el.on('custom-touch', function(){
			touchEvent();
		});
		
		var isTouch = navigator.userAgent.match(/(iPad|iPhone|iPod|Android|BlackBerry)/ig);
		// For development purposes, and just in case this mobile-optimized experience
		// is ever being consumed on a P&C (point and click) device,
		// use click instead of touch when necessary
		if(!isTouch) {
			$el.click(function() {
				$el.trigger('custom-touch');
			});
		}

		// When the user touches. We are recognizing that the user has tapped over a DOM
		// element but has not yet decided to set of a 'touch' of that element.
		$el.on('touchstart', function(e) {
			window.clearTimeout($el.data('countdownToTapped'));
			$el.data('countdownToTapped', window.setTimeout(function() {
				$el.addClass('tapped');
				console.log('touched');
			}, 5));

			// Always stop propagation on touch events
			// Sorry :(
			e.stopPropagation();

			// TODO: Prevent default scroll behavior (in certain situations)
			// e.preventDefault();
		});

		// When the user lets go
		// Touchend cancels the tapCountdown timer
		// It also fires the event we're interested in if the tapped state is already set.
		$el.on('touchend', function(e) {

			if($el.hasClass('tapped')) {
				$el.trigger('custom-touch',e);
			} else {
				window.clearTimeout($el.data('countdownToTapped'));
			}
		});

		// Touchcancel cancels the tapCountdown timer
		// If the user's finger wanders into browser UI, or the touch otherwise needs
		// to be canceled, the touchcancel event is sent
		$el.on('touchcancel', function() {

			if($el.hasClass('tapped')) {
				$el.removeClass('tapped');
			} else {
				window.clearTimeout($el.data('countdownToTapped'));
			}
		});

		// Touchmove cancels the countdownToTapped timer, as well as cancelling the tapped state if it is set
		$el.on('touchmove', function(e) {

			if($el.hasClass('tapped')) {
				$el.removeClass('tapped');
				console.log(e.touches[0].pageX);
			} else {
				window.clearTimeout($el.data('countdownToTapped'));
			}

			// Prevent propagation of scrolling
			// e.stopPropagation();
			// TODO: Prevent default scroll behavior (in certain situations)
			// e.preventDefault();
		});
	}
});

