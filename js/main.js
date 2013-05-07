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
				
				// console.log('drag!');
				
				// Init drag
				// var posX = event.gesture.deltaX;
				
				// console.log(posX);
				
				// $app.css('-webkit-transform', 'translate('+posX+'px, 0)');
				
				
				
				// stick to the finger
                var drag_offset = event.gesture.center.pageX;
				
				// var drag_offset = ((100/docW)*event.gesture.deltaX) / 1;

                setContainerOffset(drag_offset);
				
				// console.log(event.gesture);
				console.log(drag_offset);
				
				function setContainerOffset(x) {
					
		            if(Modernizr.csstransforms3d) {
		                $app.css("transform", "translate3d("+x+"px,0,0)");
						$app.css("-webkit-transition", "0s ease-in");
		            }
		            else {
		                var px = (appWidth / 100) * x;
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