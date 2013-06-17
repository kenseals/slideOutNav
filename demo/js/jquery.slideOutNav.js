(function($){	
	var SlideOutNav = function(element, options){
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
	
		var config = $.extend(defaults, options || {});

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
			eventList = eventNames.tap+" "+eventNames.drag;
		
		if (config.dataAttrs === false) {
		
			var $burger = $('#'+burger),
				$nav = $('#'+nav),
				$app = $('#'+app),
				$content = $('#'+content),
				navWidth = $nav.width();
		} else {
		
			var $burger = $('['+prefix+'="'+burger+'"]'),
				$nav = $('['+prefix+'="'+nav+'"]'),
				$app = $('['+prefix+'="'+app+'"]'),
				$content = $('['+prefix+'="'+content+'"]'),
				navWidth = $nav.width();
		}

		this.open = function() {

			console.log('open');

			// Animate App
	        openAnim();
			
			// Unbind close events
			$content.unbind(eventList);
			
			if (config.dragClose === true){
					
				// bind drag event for close
				dragListen();	
			}
			
			if (config.clickClose === true) {
				
				// bind click event for close
				contentClickListen();
			}

		};
		
		this.close = function() {

			console.log('close');

			// Animate App
	        closeAnim();	

			// Unbind content click events
			$content.unbind(eventNames.tap);
		};
		
		this.listen = function() {
			
			// Add class to body for styling purposes
			$('body').removeClass('nav-open').addClass('nav-closed');
			
			if (config.clickOpen === true) {
			
				// call burgerListen
				burgerListen();
			} 
			
			if (config.dragOpen === true) {
			
				// call dragListen
				dragListen();	
			}
			
			console.log('listening');
		};
		
		

		var touchEvent = function() {

			// If closed, open nav.
			if (state.open === false) {
				console.log('opening');
				obj.open();
			} else {
				console.log('closing');
				obj.close();
			}	
		};
		
		var burgerListen = function() {
			
			console.log('burger listen');
			
			// Bind tap event to burger button
			$burger.hammer().on(eventNames.tap, function(event) {
			
				console.log('tap!');

				// Fire touchEvent
				touchEvent();
			
			});
		};
		
		var contentClickListen = function() {
			
			console.log('content click listen');
			
			// Bind tap event to burger button
			$content.hammer().on(eventNames.tap, function(event) {
			
				console.log('tap!');

				// Fire touchEvent
				touchEvent();
			
			});
		};
		
		var dragListen = function() {
			
			console.log('drag listen');
			
			// Bind drag event to content
			$content.hammer().on(eventNames.drag, function(event) {
			
				// If drag
				if (event.type === 'drag') {
					
					// detect left/right direction
					if (event.gesture.direction === "left" || event.gesture.direction === "right") {
							
						// disable vertical browser scroll
						event.gesture.preventDefault();
					}
	
					// stick to the finger
	                var dragOffset = event.gesture.center.pageX,
						dragStart = event.gesture.startEvent.center.pageX,
						offset = offset;
						
					if (state.open === true) {
						var offset = dragOffset - (dragStart - navWidth);
						
						// If dragging left, move app container
						if (event.gesture.direction === "left") {
							
							// Prevent sliding past left side of viewport
							if (offset >= 0) {
								// Move app container
				                moveAppContainer(offset);
							}
						}
						
						// Detect vertical scroll
						if (event.gesture.direction === "up" || event.gesture.direction === "down"){
							
							// Prevent vertical scroll on touch device
							event.gesture.preventDefault();
						}
						
					} else {
						var offset = dragOffset - dragStart;
						
						// If dragging right, move app container
						if (event.gesture.direction === "right") {
						
							// Move app container
			                moveAppContainer(offset);
						}
					}	
					
				}
			
				// If drag end
				if (event.type === 'dragend') {
					
					console.log('released');
	
					// If moved more than 50%
					if (Math.abs(event.gesture.deltaX) > navWidth/2) {
						
						console.log('more than 50%');
						
						if (state.open === true) {
							
							if (event.gesture.direction === "left") {
								closeAnim();
								
								// Fire touchEvent
								touchEvent();
							}
							
						} else {
							
							if (event.gesture.direction === "right") {
								openAnim();
								
								// Fire touchEvent
								touchEvent();
							}
						}
		
					} else {
						
						if (state.open === true) {
							
							openAnim();
						} else {
							
							closeAnim();
						}
					}
				}
			});
		};
		
		var closeAnim = function() {
		
            if (Modernizr.csstransforms3d) {
                
				$app.css("transform", "translate3d(0,0,0)");
            
			} else if(Modernizr.csstransforms) {
				
                $app.css("transform", "translate(0,0)");
				$app.css("-webkit-transition", "0.2s ease-out");
            } else {
                $app.css("left", "0px");
            }
			
			$app.css("-webkit-transition", "0.2s ease-out");
			
			// After animation, add class to body for stying purposes
			$app.bind("transitionend webkitTransitionEnd", function(){
				
				console.log('transition end')
				
				// Set state
				state.open = false;
				$('body').removeClass('nav-open').addClass('nav-closed');
				
				// Allow app container to be scrollable again (for non-touch device)
				$app.css({
					"position": "relative",
					"overflow-y": "auto"
				});
				
				// TODO Set nav scroll position to 0
				$nav.scrollTop(0);
			});
			
			console.log('close anim');
		};	
		
		var openAnim = function() {
			
			console.log('navW = '+navWidth);
			
            if (Modernizr.csstransforms3d) {
				
                $app.css("transform", "translate3d("+navWidth+"px,0,0)");
				
            } else if (Modernizr.csstransforms) {
				
                $app.css("transform", "translate("+navWidth+"px,0)");
            } else {
                $app.css("left",  navWidth+"px");
            }
			
			$app.css("-webkit-transition", "0.2s ease-out");
			
			// After animation, add class to body for stying purposes
			$app.bind("transitionend webkitTransitionEnd", function(){
				
				console.log('transition end');
				
				// Set state
				state.open = true;
				$('body').removeClass('nav-closed').addClass('nav-open');
				
				// Keep app container from being scrollable on non-touch device
				$app.css({
					"position": "absolute",
					"overflow-y": "hidden"
				});
			});
			
			console.log('open anim');
		};
		
		var moveAppContainer = function(offset) {

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
        };
	
		// Start listening for open event
		this.listen();
	
	};

	$.fn.slideOutNav = function(options){
		return this.each(function(){
			var element = $(this);

			// Return early if this element already has a plugin instance
			if (element.data('slideOutNav')) return;

			// pass options to plugin constructor
			var slideOutNav = new SlideOutNav(this, options);

			// Store plugin object in this element's data
			element.data('slideOutNav', slideOutNav);
		});
	};
})(jQuery);