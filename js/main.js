$(document).ready(function(){
	
	// Init sideNav
	$('body').sideNav();
	
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
				content: "content"
			};
			
			var config = $.extend(defaults, options || {});
	
			var state = {
				open:false
			};
			
			var prefix = "data-"+config.prefix,
				burger = config.burger,
				nav = config.nav,
				app = config.app,
				content = config.content;
				
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
				$content.unbind("tap drag dragend");
		
				// Bind content tap
				$content.hammer().on("tap drag dragend", function(event) {
			
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
				$content.unbind("tap drag dragend");
		
				// Set state
				state.open = false;
			}
			this.listen = function() {
		
				var hammertime = Hammer(document.body, {
					drag_lock_to_axis:true
				});
		
				$burger.hammer().on("tap", function(event) {
			
					// Fire touchEvent
					touchEvent();
					
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
	
			function matrixToArray(matrix) {
			    return matrix.substr(7, matrix.length - 8).split(', ');
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