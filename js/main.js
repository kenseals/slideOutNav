jQuery(function($){
	
	// var element = $('.content-pane');
//     var hammertime = Hammer(element).on("swipeleft", function(event) {
//     	console.log();
//     });

	
	
	// ev.gesture.preventDefault();
	
	sideNav();
	
	
		// 
	// var hammertime = Hammer(document.body);
	// 
	//     hammertime.on('tap', function(ev) {
	// 	console.log('hey');
	//     });
	

	// function manageMultitouch(ev){
	//  
	//         switch(ev.type) {
	//             case 'touch':
	//                 last_scale = scale;
	//                 last_rotation = rotation;
	// 
	//                 break;
	// 
	//             case 'drag':
	//                     posX = ev.gesture.deltaX + lastPosX;
	//                     posY = ev.gesture.deltaY + lastPosY;
	//                 break;
	// 
	//             case 'transform':
	//                 rotation = last_rotation + ev.gesture.rotation;
	//                 scale = Math.max(1, Math.min(last_scale * ev.gesture.scale, 10));
	//                 break;
	// 
	//             case 'dragend':
	//                 lastPosX = posX;
	//                 lastPosY = posY;
	//                 break;
	//         }
	// 
	//         var transform =
	//         "translate3d("+posX+"px,"+posY+"px, 0) " +
	//         "scale3d("+scale+","+scale+", 0) " +
	//         "rotate("+rotation+"deg) ";
	// 
	//         elemRect.style.transform = transform;
	//         elemRect.style.oTransform = transform;
	//         elemRect.style.msTransform = transform;
	//         elemRect.style.mozTransform = transform;
	//         elemRect.style.webkitTransform = transform;
	//     }
	// 	
	// 	// console.log(posX);

});

sideNav = function() {
	
	var $burger = $('#burger-btn'),
		$nav = $('.side-nav'),
		$content = $('.content-pane');
	
	state = {
		open:false
	}
	
	this.open = function() {
		
		console.log('open');
		
		// Add class to body for stying purposes
		$('body').removeClass('nav-closed').addClass('nav-open');
		
		// Unbind content tap
		$content.unbind("tap");
		
		// Bind content tap
		$content.hammer().on("tap", function(event) {
			
			// Fire touchEvent
			touchEvent();
			console.log('content clicked');
		});
		
		// Set state
		state.open = true;
	}
	this.close = function() {
		
		console.log('close');
		
		// Add class to body for styling purposes
		$('body').removeClass('nav-open').addClass('nav-closed');
		
		// Unbind content tap
		$content.unbind("tap");
		
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