# Slide Out Nav

Super responsive slide out navigation for mobile web apps in the form of a jQuery plug-in. Inspired by iOS apps like Facebook and Path. Leverages hammer.js for touch events and hardware accelerated CSS for animations.

## Usage
	
	// Init
	$('body').slideOutNav();
	
	// Init with options
	$('body').slideOutNav({
		dragOpen: false
	});
	
	// Save so its public methods are accessible
	var slideOutNav = $('body').data('slideOutNav');
	
	// Example click event calling sideNav public method
	$('#close').hammer().on("tap", function(){
		
		// Call var to access public methods
		slideOutNav.close();
		
		// Make sure not to return href
		return false;
	});



	

