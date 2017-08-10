$(document).ready(function() {
		// Hoverintent for Default Drop Down Navigation
		// function defaultHoverOver(){
		// 	$(this).find(".children").stop().fadeTo('fast', 1).show(); 	  
		// };
			
		// function defaultHoverOut(){
		// 	$(this).find(".children").stop().fadeTo('fast', 0, function() {
		// 		$(this).hide();
		// 	});
		// }
	
		// var config = {
		// 	sensitivity: 1,       // number = sensitivity threshold (must be 1 or higher)
		// 	interval: 50,        // number = milliseconds for onMouseOver polling interval
		// 	over: defaultHoverOver,  // function = onMouseOver callback (REQUIRED)
		// 	timeout: 500,         // number = milliseconds delay before onMouseOut
		// 	out: defaultHoverOut     // function = onMouseOut callback (REQUIRED)
		// };
	
	function responsiveMenu(){
	// responsiveWidth = $(window).width() < 800
	
	// 	if (responsiveWidth) {
			$("#primary-nav li").click(function(e) {
				if( $(this).children(".children").length > 0 && $(this).children(".children").is(":hidden")) {
						e.preventDefault();
	            $(this).find(".children").stop().slideDown();
            	$(this).find(".primary-nav-toggle").addClass("flyout_toggle_active");
				} 
			});
		// } else{$("#primary-nav li").hoverIntent(config);}
	}
	function responsiveMenuResize(){
		$(window).resize(function() {
			return responsiveMenu(); 
		});
	}
	
	$("#full-modal,#responsive-menu-toggle").click(function() {
			if (!$("#responsive-menu-toggle").hasClass(".closed")){
				$("#primary-nav li").children(".children").hide();
			}
		});
 responsiveMenu();
 responsiveMenuResize();
});
















