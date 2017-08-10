$(document).ready(function() {

	  $("html.ie7 #primary-nav .sub .children > li:nth-child(4n)").after('<div class="clear"></div>');

	  // Hoverintent for Mega Menu Navigation
	  function megaHoverOver(){
	    $(this).find(".sub").stop().fadeTo('fast', 1).show();
            $(this).find(".sub .children > li:nth-child(4n+1)").css({'clear' : 'both'});
	  };

	  function megaHoverOut(){
	    $(this).find(".sub").stop().fadeTo('fast', 0, function() {
	      $(this).hide();
	    });
	  }

	  var config = {
	    sensitivity: 1,       // number = sensitivity threshold (must be 1 or higher)
	    interval: 50,        // number = milliseconds for onMouseOver polling interval
	    over: megaHoverOver,  // function = onMouseOver callback (REQUIRED)
	    timeout: 500,         // number = milliseconds delay before onMouseOut
	    out: megaHoverOut     // function = onMouseOut callback (REQUIRED)
	  };

    $("#primary-nav .sub").css({'opacity':'0'});
	  $("#primary-nav ul li").hoverIntent(config);

});