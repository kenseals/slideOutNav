$(document).ready(function(){
	
	// Init sideNav
	$('body').sideNav({
		dragOpen:true,
		dragClose:true
	});
	
	// Save so its public methods are accessible
	var sideNav = $('body').data('sideNav');
	
	// Example click event calling sideNav public method
	$('#example').add('#nav a').click(function(){
		
		// Call var to access public methods
		sideNav.close();
		
		// Make sure not to return href
		return false;
	});
	
});



(function($){	
	var SideNav = function(element, options){
	    var elem = $(element),
	    	obj = this;
	
		var defaults = {
			dataAttrs: false,
			prefix: "side-nav",
			burger: "burger",
			nav: "nav",
			app: "app",
			content: "content",
			clickOpen: true,
			clickClose: true,
			dragOpen: false,
			dragClose: true
		};
	
		var config = $.extend(defaults, options || {})

		var state = {
			open:false
		};
		
		var eventNames = {
			tap: "tap",
			drag: "drag dragend"
		};
	
		var prefix = "data-"+config.prefix,
			burger = config.burger,
			nav = config.nav,
			app = config.app,
			content = config.content,
			eventList = eventNames.tap+eventNames.drag,
			openEvents = openEvents,
			closeEvents = closeEvents;
		
		if (config.dataAttrs === false) {
		
			var $burger = $('#'+burger),
				$nav = $('#'+nav),
				$app = $('#'+app),
				$content = $('#'+content),
				navWidth = $nav.width();
		}
		else {
		
			var $burger = $('['+prefix+'="'+burger+'"]'),
				$nav = $('['+prefix+'="'+nav+'"]'),
				$app = $('['+prefix+'="'+app+'"]'),
				$content = $('['+prefix+'="'+content+'"]'),
				navWidth = $nav.width();
		}
		
		
		// Parse through passed events to determine what events we're using
		(function eventSetup() {	
			if (config.clickOpen == true) {
				
				openEvents = eventNames.tap;
			
			} 
			if (config.clickClose == true) {
				
				closeEvents = eventNames.tap;
			
			} 
			if (config.dragOpen == true) {
			
				openEvents = eventNames.drag;
			
			} 
			if (config.dragClose == true) {
			
				closeEvents = eventNames.drag;
			
			} 
			if (config.clickOpen == true && config.dragOpen == true) {
			
				openEvents = eventNames.tap+" "+eventNames.drag;
			
			} 
			if (config.clickClose == true && config.dragClose == true) {
			
				closeEvents = eventNames.tap+" "+eventNames.drag;
			
			}
			
			console.log("open events: "+openEvents);
			console.log("close events: "+closeEvents);
		})();

		this.open = function() {

			console.log('open');

			// Add class to body for stying purposes
			$('body').removeClass('nav-closed').addClass('nav-open');

			// Animate App
	        if(Modernizr.csstransforms) {
	            $app.css("transform", "translate("+navWidth+"px,0)");
				$app.css("-webkit-transition", "0.2s ease-out");
	        }
	        else {
	            $app.css("left",  navWidth+"px");
	        }

			// Unbind content tap
			$content.unbind(closeEvents);

			// Bind content tap
			$content.hammer().on(closeEvents, function(event) {
	
				// Detect event type
				if (event.type === 'tap') {
		
					console.log('tap!');
		
					// Fire touchEvent
					touchEvent();
		
				}
				if (event.type === 'dragend') {
					console.log('released');
		
					if (Math.abs(event.gesture.deltaX) > navWidth/2) {
						console.log('more than 50%');
			
			            if(Modernizr.csstransforms) {
			                $app.css("transform", "translate(0px,0)");
							$app.css("-webkit-transition", "0.2s ease-out");
			            }
			            else {
			                $app.css("left", "0px");
			            }	
			
						// Fire touchEvent
						touchEvent();
					} 
					else {
			            if(Modernizr.csstransforms) {
			                $app.css("transform", "translate("+navWidth+"px,0)");
							$app.css("-webkit-transition", "0.2s ease-out");
			            }
			            else {
			                $app.css("left",  navWidth+"px");
			            }	
					}
		
				}
				if (event.type === 'drag') {
		
					// disable browser scrolling
					event.gesture.preventDefault();
		
					// stick to the finger
	                var dragOffset = event.gesture.center.pageX,
						dragStart = event.gesture.startEvent.center.pageX,
						offset = dragOffset - (dragStart - navWidth);
			
					// Move app container
	                moveAppContainer(offset);
		
					function moveAppContainer(offset) {
			
			            if(Modernizr.csstransforms3d) {
			                $app.css("transform", "translate3d("+offset+"px,0,0)");
			            }
						else if (Modernizr.csstransforms) {
			                $app.css("transform", "translate("+offset+"px,0)");
						}
			            else {
			                $app.css("left", offset+"px");
			            }
			
						$app.css("-webkit-transition", "0s ease-in");
			        }
		
				}
	
	
			});

			// Set state
			state.open = true;
		}
		this.close = function() {

			console.log('close');

			// Add class to body for styling purposes
			$('body').removeClass('nav-open').addClass('nav-closed');

			// Animate App
	        if(Modernizr.csstransforms) {
	            $app.css("transform", "translate(0px,0)");
				$app.css("-webkit-transition", "0.2s ease-out");
	        }
	        else {
	            $app.css("left", "0px");
	        }	

			// Unbind content tap
			$content.unbind("closeEvents");

			// Set state
			state.open = false;
		}
		this.listen = function() {

			// Bind tap event to burger button
			$content.hammer().on(openEvents, function(event) {
	
				// Detect event type
				if (event.type === 'tap') {
		
					console.log('tap!');
		
					// Fire touchEvent
					touchEvent();
		
				}
				if (event.type === 'dragend') {
					console.log('released');
		
					if (Math.abs(event.gesture.deltaX) > navWidth/2) {
						console.log('more than 50%');
			
			            if(Modernizr.csstransforms) {
			                $app.css("transform", "translate("+navWidth+",0)");
							$app.css("-webkit-transition", "0.2s ease-out");
			            }
			            else {
			                $app.css("left", "0px");
			            }	
			
						// Fire touchEvent
						touchEvent();
					} 
					else {
			            if(Modernizr.csstransforms) {
			                $app.css("transform", "translate(0px,0)");
							$app.css("-webkit-transition", "0.2s ease-out");
			            }
			            else {
			                $app.css("left",  navWidth+"px");
			            }	
					}
		
				}
				if (event.type === 'drag') {
		
					// disable browser scrolling
					event.gesture.preventDefault();
		
					// stick to the finger
	                var dragOffset = event.gesture.center.pageX,
						dragStart = event.gesture.startEvent.center.pageX,
						offset = dragOffset - (dragStart - navWidth);
			
					// Move app container
	                moveAppContainer(offset);
		
					function moveAppContainer(offset) {
			
			            if(Modernizr.csstransforms3d) {
			                $app.css("transform", "translate3d("+offset+"px,0,0)");
			            }
						else if (Modernizr.csstransforms) {
			                $app.css("transform", "translate("+offset+"px,0)");
						}
			            else {
			                $app.css("left", offset+"px");
			            }
			
						$app.css("-webkit-transition", "0s ease-in");
			        }
		
				}
			
			});

			console.log('listening');
		}

		function touchEvent() {

			// If closed, open nav.
			if (state.open === false) {
				console.log('state closed');
				obj.open();
			}

			// Close nav.
			else {
				console.log('state open');
				obj.close();
			}	
		}
	
		// Start listening for open event
		this.listen();
	
	};

	$.fn.sideNav = function(options){
		return this.each(function(){
			var element = $(this);

			// Return early if this element already has a plugin instance
			if (element.data('sideNav')) return;

			// pass options to plugin constructor
			var sideNav = new SideNav(this, options);

			// Store plugin object in this element's data
			element.data('sideNav', sideNav);
		});
	};
})(jQuery);