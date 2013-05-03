Zepto(function($){
	
	sideNav();
  
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
		
		$('body').removeClass('nav-closed').addClass('nav-open');
		
		state.open = true;
		this.monitor();
	}
	this.close = function() {
		
		console.log('close');
		
		$('body').removeClass('nav-open').addClass('nav-closed');
		
		state.open = false;
		this.monitor();
	}
	this.listen = function() {
		
		touchEvent = function() {
			if ($burger.hasClass('fired')) {
				
				if (state.open === false) {
					this.open();
				}
				else {
					this.close();
				}
				
			} 
			else {
				$burger.addClass('fired');
				this.open();
			}
		}
		
		touchEnhance($burger, touchEvent);
		console.log('listening');
	}
	this.monitor = function() {
		
		if (state.open === true) {
			
			closeEvent = function() {
				this.close();
				
				console.log('content clicked');
			}	
			touchEnhance($content, closeEvent);
		}
		if (state.open === false) {	
		}
	}
	
	this.listen();
}