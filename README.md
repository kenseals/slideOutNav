# Slide Out Nav

Super responsive slide out navigation for mobile web apps in the form of a jQuery plug-in. Inspired by iOS apps like Facebook and Path. Leverages hammer.js for touch events and hardware accelerated CSS for animations.

## Usage

```
.slideOutNav( [options] )
```

```javascript
// $someElement is a jQuery set which matches a single element, e.g. $('body')
var slideOutNavOnSomeElement = $someElement.slideOutNav( options );
```

```javascript
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
```


##### Available Options

```javascript

// Usage:
// `.slideOutNav( options )`

var exampleSlideOutNavOptions = {

	// slideOutNav infers the elements it should use by inspecting your HTML.
	// By default, it uses ids to do this, i.e. `<div id="nav"></div>`
	// This is convenient, but as you probably know, comes with all sorts of side effects.
	// The following two options allow you to use and configure data-attributes instead:
	
	
	// Whether to expect data-attributes instead of ids.
	// Defaults to false.
	dataAttrs: false,
	
	// The prefix to expect on the aforementioned data-attributes
	// e.g. overriding this option with "slide" would set up slideOutNav
	// to look for a `data-slide` attribute instead of `data-side-nav`.
	//
	// Only relevant if `dataAttrs` is set to true.
	//
	// Defaults to `side-nav`.
	prefix: 'side-nav',
	
	
	
	
	// The following options control the strings used to mark your HTML elements
	// for use with slideOutNav.
	//
	// If you have dataAttrs enabled, these options control the suffix:
	// e.g. `<div class="menu" data-side-nav="nav">stuff inside of our menu</div>`
	//
	// Otherwise, they control the entire id:
	// e.g. `<div class="menu" id="nav">stuff inside of our menu</div>`
	
	// Defaults to `nav`.
	nav: 'nav',
	
	// Main content which will be shifted over to the right when the menu is opened.
	//
	// Defaults to `app`.
	app: 'app',
	
	// Context for click and touch events.  Should probably be the same as `app`.
	//
	// Defaults to `content`.
	content: 'content',
	
	
	
	
	
	
	
	
	
	
	
	// The following two options control whether global event listeners
	// should be registered to recognize a "drag" gesture on touch devices.
	
	
	
	// Interpret a "drag" from the left side of the screen as user intent
	// to open the menu.
	//
	// Defaults to false.
	dragOpen: false,
	
	// Interpret a leftward "drag" as user intent to close the menu.
	//
	// Defaults to true.
	dragClose: true,
	
	
	
	
	
	
	
	
	// The following are some convenience options for automatically binding
	// click events to open the nav.
	
	clickOpen: true,
	burger: 'burger',
	clickCloase: true
};
	
```

