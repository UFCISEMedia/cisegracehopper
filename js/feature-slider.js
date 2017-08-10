$(function() {
    var numberOfSeconds = 7;
    var timeBetweenSlides = numberOfSeconds * 1000;

    // Move the specified number of slides from the back to the front
    function moveSlidesToFront(n) {
        for (var i = 0; i < n; i++) {
            $('.slide:first').before($('.slide:last'));
        }
    }

    // Move the specified number of slides from the front to the back
    function moveSlidesToBack(n) {
        for (var i = 0; i < n; i++) {
            $('.slide:last').after($('.slide:first'));
        }
    }

    // Move slides that are not visible in preparation for a jump
    // Returns: Number of slides to move via animation
    function prepareSlides(n) {
        if (n < -1) {
            // Jumping to the left; add slides to the front
            moveSlidesToFront(Math.abs(n) - 1);

            // Shift the slide reel to the right to keep current slide in view
            $slideReel.css({ left: slideWidth * n });

            // Prepare animation for the remaining slide
            n = -1;
        }
        else if (n > 1) {
            // Jumping to the right; add slides to the back
            moveSlidesToBack(1);

            // Shift the slide reel to the left to keep current slide in view
            $slideReel.css({ left: 0 });

            // Prepare animation for the rest
            n = n - 1;
        }

        return n;
    }

    function changeSlide( newSlide ) {
        // cancel any timeout
        clearTimeout( slideTimeout );

        // Disable the navigation while animating
        navEnabled = false;
        
        // change the currSlide value
        var prevSlide = currSlide;
        currSlide = newSlide;
        
        // make sure the currSlide value is not too low or high
        if ( currSlide > maxSlide ) currSlide = 0;
        else if ( currSlide < 0 ) currSlide = maxSlide;

        // Determine if we have jumped
        var numSlides = currSlide - prevSlide;

        // Handle normal transition from end back to beginning without nauseating users
        if (currSlide == 0 && prevSlide == maxSlide) {
            numSlides = 1;
        }

        // Put slides in order for upcoming animation
        var numRemaining = prepareSlides(numSlides);

        // Animate the slide reel further left or right
        var slideReelPosition = -slideWidth * (numRemaining + 1);

        // Override for two slides: skip swapping; just go back and forth
        if (maxSlide == 1) {
            // Going to the right
            slideReelPosition = 0;

            if (currSlide == 1) {
                // Going to the left
                slideReelPosition = -slideWidth;
            }

            numRemaining = 0;
        }

        //console.log("numSlides = [", numSlides, "], numRemaining = [", numRemaining, "], prevSlide = [", prevSlide, "], currSlide = [", currSlide, "], maxSlide = [", maxSlide, "], slideReelPosition = [", slideReelPosition, "]");

        $slideReel.animate({
            left : slideReelPosition
        }, 1200, 'swing', function() {
            // set new timeout if active
            if ( activeSlideshow ) slideTimeout = setTimeout(nextSlide, sliderSpeed);
            
            if(currSlide == 0 && prevSlide == 1 && maxSlide == 1) {
                $('.slide:nth-child(1) .excerpt').stop().fadeIn();
                $('.slide:not(:nth-child(1)) .excerpt').stop().fadeOut();
            }
            // Rotate items to front or back based on direction
            else if (numRemaining < 0) {
                // Went left; put extra slides in front
                moveSlidesToFront(Math.abs(numRemaining));
                $('.slide:nth-child(2) .excerpt').stop().fadeIn();
                $('.slide:not(:nth-child(2)) .excerpt').stop().fadeOut();
            }
            else {
                // Went right; put extra slides at back
                moveSlidesToBack(numRemaining);
                $('.slide:nth-child(2) .excerpt').stop().fadeIn();
                $('.slide:not(:nth-child(2)) .excerpt').stop().fadeOut();
            }

            // Now that slide is in right place, set position of reel for next animation
            if (maxSlide > 1) {
                $slideReel.css({'left' : -slideWidth});
            }

            // Reenable the navigation now the animation is done
            navEnabled = true;
        });
        
        // animate the navigation indicator
        $activeNavItem.animate({
            left : currSlide * 149
        }, 1200, 'swing');
    }
    
    function nextSlide() {
        changeSlide( currSlide + 1 );
    }
    
    // define some variables / DOM references
    var activeSlideshow = true,
    navEnabled = true,
    currSlide = 0,
    slideTimeout,
    $slideshow = $('#slideshow'),
    $slideReel = $slideshow.find('#slideshow-reel'),
    maxSlide = $slideReel.children().length - 1,
    $slideLeftNav = $slideshow.find('#slideshow-left'),
    $slideRightNav = $slideshow.find('#slideshow-right'),
    $activeNavItem = $slideshow.find('#active-nav-item'),
    slideWidth = $('.slide').width();

    // Check the the global defined in markup (WordPress template), or use the value defined at the top (HTML template)
    sliderSpeed = typeof sliderSpeed != 'undefined' ? sliderSpeed : timeBetweenSlides;

    
    // set navigation click events
    
    // left arrow
    $slideLeftNav.click(function(ev) {
        ev.preventDefault();

        if (! navEnabled) return;
        activeSlideshow = false;

        changeSlide( currSlide - 1 );
    });
    
    // right arrow
    $slideRightNav.click(function(ev) {
        ev.preventDefault();

        if (! navEnabled) return;
        activeSlideshow = false;

        changeSlide( currSlide + 1 );
    });
    
    // main navigation
    $slideshow.find('#slideshow-nav a.nav-item').click(function(ev) {
        ev.preventDefault();

        if (! navEnabled) return;
        activeSlideshow = false;

        changeSlide( $(this).index() );
    });
    
    // set the dynamic width
    var slider_nav_stop = $('.nav-item');
    var slider_nav_width = slider_nav_stop.width() * slider_nav_stop.length;
    $('#slideshow-nav').css({'width' : slider_nav_width, 'visibility' : 'visible'});

    // Finish up and animate
    if (maxSlide == 0) {
        // Hide navigation when there is only one slide
        $slideLeftNav.hide();
        $slideRightNav.hide();
        $('#slideshow-nav').css({'display' : 'none'});
    }
    else {
        // Prepare for animation with more than two slides
        if (maxSlide > 1) {
            // Set the position of reel to right side of slide as refrence point to slide left or right from
            $slideReel.css({'left' : -slideWidth});

            // Get the slides in the right order for the next slide
            moveSlidesToFront(1);
        }

        // start the animation
        slideTimeout = setTimeout(nextSlide, sliderSpeed);
    }
    
    // show thumbs on hover
    
    $(".slider-thumb ").hide();
    $("a.nav-item").hover(
        function(){
          if($.browser.msie) {
            $(this).find('.slider-thumb').stop().show();
          } else {
            $(this).find('.slider-thumb').stop().fadeTo(500, 1).show();
          }
        },
        function(){
          if($.browser.msie) {
            $(this).find('.slider-thumb').stop().hide();
          } else {
            $(this).find('.slider-thumb').stop().fadeTo(250, 0).hide();
          }
        });
});
