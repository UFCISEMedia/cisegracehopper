$(document).ready(function() {
	$("html.ie7 #primary-nav .sub .children > li:nth-child(4n)").after('<div class="clear"></div>');

	// Hoverintent for Default Drop Down Navigation
	// function megaHoverOver(){
	//  $(this).find(".sub").stop().fadeTo('fast', 1).show();
	// 		$(this).find(".sub .children > li:nth-child(4n+1)").css({'clear' : 'both'});
	// };

	// function megaHoverOut(){
	// 	$(this).find(".sub").stop().fadeTo('fast', 0, function() {
	// 		$(this).hide();
	// 	});
	// }

	// var config = {
	// 	sensitivity: 1,       // number = sensitivity threshold (must be 1 or higher)
	// 	interval: 50,        // number = milliseconds for onMouseOver polling interval
	// 	over: megaHoverOver,  // function = onMouseOver callback (REQUIRED)
	// 	timeout: 500,         // number = milliseconds delay before onMouseOut
	// 	out: megaHoverOut     // function = onMouseOut callback (REQUIRED)
	// };

	function responsiveMega(){

		 // responsiveWidth = $(window).width() < 1800
		 // if (responsiveWidth) {

			$("#primary-nav").addClass("responsive-mega");
			
			$("#primary-nav li").click(function(e) {
				if( $(this).children(".sub").length > 0 && $(this).children(".sub").is(":hidden")) {
						e.preventDefault();
						$(this).find(".sub").stop().slideDown();
						$(this).find(".primary-nav-toggle").addClass("flyout_toggle_active");
				} 
			});
		// } else{$("#primary-nav ul li").hoverIntent(config);}

	}
	function responsiveMegaResize(){
		$(window).resize(function() {
			return responsiveMega(); 
		});
	}
	
	$("#full-modal,#responsive-menu-toggle").click(function() {
		if (!$("#responsive-menu-toggle").hasClass(".closed")){
			$("#primary-nav li").children(".sub").hide();
		}
	});
	responsiveMega();
	responsiveMegaResize();

});
















