jQuery(function($){
	
	// Init sideNav
	sideNav();

});

sideNav = function() {
	
	var $burger = $('#burger-btn'),
		$nav = $('.side-nav'),
		$app = $('.app'),
		navWidth = $nav.width();
		$content = $('.content-pane');
	
	state = {
		open:false
	}
	
	console.log(navWidth);
	
	this.open = function() {
		
		console.log('open');
		
		// Add class to body for stying purposes
		$('body').removeClass('nav-closed').addClass('nav-open');
		
		// Unbind content tap
		$content.unbind("tap drag release");
		
		// Bind content tap
		$content.hammer().on("tap drag release", function(event) {
			
			// Detect event type
			if (event.type === 'tap') {
				
				console.log('tap!');
				
				// Fire touchEvent
				touchEvent();
			}
			if (event.type === 'release') {
				console.log('released');
				
				if (Math.abs(event.gesture.deltaX) > navWidth/2) {
					console.log('more than 50%');
					
		            if(Modernizr.csstransforms) {
		                $app.css("transform", "translate(0px,0)");
		            }
		            else {
		                $app.css("left", "0px");
		            }	
				} 
				else {
		            if(Modernizr.csstransforms) {
		                $app.css("transform", "translate("+navWidth+"px,0)");
		            }
		            else {
		                $app.css("left",  navWidth+"px");
		            }	
				}
			}
			if (event.type === 'drag') {
				
				// disable browser scrolling
				event.gesture.preventDefault();
				
				console.log('drag!');
				
				// Init drag
				// var posX = event.gesture.deltaX;
				
				// console.log(posX);
				
				// $app.css('-webkit-transform', 'translate('+posX+'px, 0)');
				
				
				
				// stick to the finger
                var drag_offset = ((navWidth / 100) - event.gesture.deltaX);

                setContainerOffset(drag_offset);
				
				console.log(drag_offset);
				
				function setContainerOffset(pixels, animate) {
					
		           	$app.removeClass("animate");

		            if(animate) {
		                $app.addClass("animate");
		            }
		            if(Modernizr.csstransforms) {
		                $app.css("transform", "translate("+ pixels +"px,0)");
		            }
		            else {
		                var px = (appWidth / 100) * percent;
		                $app.css("left", px+"px");
		            }
		        }
				
				
				
				
				
				// var transform = "translate3d(50px, 0)";	
		        // $app.style.transform = transform;
		        // $app.style.oTransform = transform;
		        // $app.style.msTransform = transform;
		        // $app.style.mozTransform = transform;
		        // $app.style.webkitTransform = transform;
			}
			
		});
		
		// Set state
		state.open = true;
	}
	this.close = function() {
		
		console.log('close');
		
		// Add class to body for styling purposes
		$('body').removeClass('nav-open').addClass('nav-closed');
		
		// Unbind content tap
		$content.unbind("tap drag release");
		
		// Set state
		state.open = false;
	}
	this.listen = function() {
		
		var hammertime = Hammer(document.body);
		
		$burger.hammer().on("tap", function(event) {
			
			// Fire touchEvent
			touchEvent();
		});
		
		console.log('listening');
	}
	
	function touchEvent() {
		
		// If closed, open nav.
		if (state.open === false) {
			this.open();
		}
		
		// Close nav.
		else {
			this.close();
		}
		
	}
	
	// Init listen
	this.listen();
}