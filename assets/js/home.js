
 $(document).ready(function() {

/*
CURRENT PROBLEMS!!!!!!!!
CSS arrow down not animating on Firefox
Video background not fading out on video play button click

*/



 //GLOBAL VARIABLES
	var nav = $('nav a');
	var bottom = $('#nav-bottom a');
	var burgerWhite = $('#nav-burger .white');
	var burgerBlack = $('#nav-burger .black');
	var win_height = $(window).height();
	var win_width = $(window).width();
	var elementHeight = 0; //used for call bounding rect to measure element
	var scrollBottom = $(window).scrollTop() + (win_height * 4);
	var backgrounds = ['pillow1', 'pillow2', 'pillow3', 'pillow4', 'pillow6', 'pillow7'];
	var counter = 1;
	var background_counter = 0; //used to make sure backgrounds only change once
	

	function swapVideo(vid){
		var height = measureVideo();
		var width = $(window).width();
		var target = vid.parent().parent();
		target.find('.text').hide();
		target.find('#loop').addClass('video-playing').fadeOut();

		/*OG SOURCE

		<iframe frameborder="0" scrolling="no" seamless="seamless" 
		webkitallowfullscreen="webkitAllowFullScreen" 
		mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen" 
		id="rbmaplayer" width="640" height="360" 
		src="http://www.youtube.com/embed/8dtZsnPKeo8?enablejsapi=1&amp;origin=*&amp;autoplay=0&amp;loop=1&amp;hd=1&amp;controls=0&amp;showinfo=0&amp;modestbranding=1&amp;iv_load_policy=3&amp;rel=0&amp;playlist=O8hi7CaqE8A"></iframe>

		*/
		//display controls on mobile video
		
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			$('#film').find('#embed').html('<iframe frameborder="0" scrolling="no" ' +
										'seamless="seamless" webkitallowfullscreen="webkitAllowFullScreen" ' +
										'mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen" ' +
										'id="rbmaplayer" width="' + width + '" height="' + height + '" ' +
										'src="http://www.youtube.com/embed/uVzx_p_DrL8?enablejsapi=1&amp;origin=*&amp;autoplay=1&amp;loop=1&amp;hd=1&amp;' +
										'controls=1&amp;showinfo=1&amp;modestbranding=0&amp;iv_load_policy=3&amp;' +
										'rel=0"></iframe>');
		}

		else {
			$('#film').find('#embed').html('<iframe frameborder="0" scrolling="no" ' +
										'seamless="seamless" webkitallowfullscreen="webkitAllowFullScreen" ' +
										'mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen" ' +
										'id="rbmaplayer" width="' + width + '" height="' + height + '" ' +
										'src="http://www.youtube.com/embed/uVzx_p_DrL8?enablejsapi=1&amp;origin=*&amp;autoplay=1&amp;loop=1&amp;hd=1&amp;' +
										'controls=0&amp;showinfo=1&amp;modestbranding=0&amp;iv_load_policy=3&amp;' +
										'rel=0"></iframe>');
		}
		
		target.find('iframe').show();
		$('#film').find('#embed').css({
			zIndex: '9'
		});
	}

	//USED TO MESAURE SCREEN SIZE TO BE USED FOR VIDEO SIZE
	function measureVideo(){
		var rect = document.getElementById("film").getBoundingClientRect();
		if (rect.height){
			elementHeight = rect.height;
		}
		else{
			elementHeight = rect.bottom - rect.height; //derive height
		}

		return elementHeight;
	}

	//PICKS RANDOM BACKGROUND TO DISPLAY ON TITLE SCREEN
	function swapBackground(string){
		var length = string.length;
		var randompic = Math.floor(Math.random() * length);
		$('#title').one().css({
			background: 'url(images/' + string[randompic] + '.jpg) no-repeat left top'
		}).fadeIn();
	}

	//REMOVES VIDEO BACKGROUND FOR MOBILE
	function removeVideo(windowsize){
		if (windowsize < 800){
			$('#film').find('#loop').hide();
		}
		if (windowsize > 800){
			if ($('#loop').hasClass('video-playing')){
				return;
			}
			else{
				$('#film').find('#loop').show();
			}
			
		}
	}



	//hide all main navigation items, replace with arrow
	function navMin(item){
		item.hide();
		$('#nav-burger').fadeIn();
	}

	//show all main navigation items, hide arrows
	function navMax(item){
		$('#nav-burger').hide();
		item.fadeIn();
	}


	//function for determining colors. extra integers added to window height
	//are to provide padding, and are approximate
	function navColors(){
		var top = $('#wrapper').scrollTop();
		win_height = $(window).height();
		//used to track buy book image
		if (top < 58){
		

			burgerWhite.css({
				display: 'none'
			});

			burgerBlack.css({
				display: 'none'
			});

			navMax(nav);
			navMax(bottom);

			//background counter is reset so user background will change
			//again on scroll down
			background_counter = 0;
		}

		if (top >= 58){ //change bottom nav once scroll begins
			

			$('#pointer').fadeOut();

		}

		//SECOND SCREEN
		if (top >= win_height - 35){
			burgerWhite.css({
				display: 'block'
			});

			burgerBlack.css({
				display: 'none'
			});

			navMin(nav);
			navMin(bottom);
		}

		//THIRD SCREEN
		if (top > (win_height * 2) - 35){
			burgerWhite.css({
				display: 'none'
			});

			burgerBlack.css({
				display: 'block'
			});
		}

		//change background once after scroll down
		//counter will be reset when user has scrolled to top again
		if (top > (win_height * 2) + 58){
			if (background_counter === 0){
				swapBackground(backgrounds);
				background_counter = 1;
			}
			
		}

		//FOURTH SCREEN
		//if mobile size, burger should be black
		//if desktop, burger should be white
		if (top > (win_height * 3) - 35){
			burgerWhite.css({
				display: 'block'
			});

			burgerBlack.css({
				display: 'none'
			});
		}

		if (top > (win_height * 4) - 35){
			if (win_width <= 721){
					burgerWhite.css({
						display: 'block'
					});

					burgerBlack.css({
						display: 'none'
					});
			}
			else{
				burgerWhite.css({
					display: 'none'
				});

				burgerBlack.css({
					display: 'block'
				});
			}
			
		}

		if (top < (win_height - 58)){

			navMax(nav);
			navMax(bottom);
			burgerWhite.css({
				display: 'none'
			});

			burgerBlack.css({
				display: 'none'
			});
		}

		if (win_width > 800){
			if ( top < (scrollBottom) && counter === 0){
				counter = 1;
				$('#about .buy').transition({
					right: '-50%'
				}, 750);
				
			}

			if ( top > (scrollBottom) && counter === 1){
				$('#about .buy').transition({
					right: '0'
				}, 750);
				counter = 0;
			}
		}
	}
	
	function smoothScroll(clk){
		if (clk.hasClass('filmlink')){
			$('#wrapper').animate({
				scrollTop: win_height + 10
			},500);
		}
		else if(clk.hasClass('booklink')){
			$('#wrapper').animate({
				scrollTop: (win_height * 2) + 10
			}, 750);
		}
		else if(clk.hasClass('extraslink')){
			$('#wrapper').animate({
				scrollTop: (win_height * 3) + 10
			}, 1000);
		}
		else if(clk.hasClass('aboutlink')){
			$('#wrapper').animate({
				scrollTop: (win_height * 4) + 10
			}, 1500);
		}
		else if(clk.hasClass('titlelink')){
			$('#wrapper').animate({
				scrollTop: 0
			}, 500);
		}
	}


	//get height of title text element
	function calculateElementHeight(thiselement){
		var rect = thiselement.getBoundingClientRect();
		if (rect.height){
			elementHeight = rect.height;
		}
		else{
			elementHeight = rect.bottom - rect.height; //derive height
		}

		centerElement(elementHeight, $('#title-text'));
	}

	function getElementLeftTop(thiselement){
		var rect = thiselement.getBoundingClientRect();
		return [rect.left];
	}

	//center title text element based on height of window and element height
	function centerElement(elementHeight){
		win_height = $(window).height();
		var difference = win_height - elementHeight;
		var topMargin = difference / 2;
		$('#title-text').css({
			marginTop: (topMargin - 50) + 'px', //provide 50px padding
			marginBottom: topMargin + 'px'
		});
		console.log(topMargin);
	}

	$(".scroll").click(function(event){
		event.preventDefault();
		smoothScroll($(this));
	});

	$('#pointer').on('click', function(e){
		e.preventDefault();
		$(this).fadeOut('fast');
		$('#wrapper').animate({
				scrollTop: win_height + 10
			},500);
	});

	if (win_width > 800){
			$('#extras .extras-container').on('mouseenter', 'div', function(){
			$(this).find('p').show();
		});

			$('#extras .extras-container').on('mouseleave', 'div', function(){
			$(this).find('p').hide();
		});
	}

	
	function slideBook(){
		var books = $('#book').find('.book-wrapper');
		var leftbook = $('#book').find('img.leftbook');
		var win_width = $(window).width();

		//get left position of right book element
		var left_book_leftpos = getElementLeftTop(document.getElementById('leftbook'));

		//make sure first image is visible if resized
		if(win_width < 800){
			books.transition({
				x: 0
			}, 1000);
		}

		else{
			//if left book is visible
			if (left_book_leftpos > 0){
				books.transition({
					x: -win_width
				}, 2000);
			}

			else if (left_book_leftpos < 0 && left_book_leftpos > (-win_width * 1.5)){
				books.transition({
					x: -(win_width * 2)
				}, 2000);
			}

			else if (left_book_leftpos < (-(win_width * 1.5))){
				books.transition({
					x: 0
				}, 3000);
			}

			//otherwise, wrapper has already animated left
			/*
			else{
				books.transition({
					x: 0
				}, 2000);
			}
			*/
		}
	}


	



	//STARTUP EVENT LISTENERS AND FUNCTIONS
	
	//slide out facebook like button on click
	$('#about').find('.social .fb-button').on('click', function(e){
		e.preventDefault();
		$(this).parent().parent().find('iframe').slideToggle('slow');
	});

	//make sure youtube html is empty on page load
	$('#film').find('#embed').empty();

	//swap background image
	swapBackground(backgrounds);

	//initiate function to measure title element height and call
	//second function to center vertically
	calculateElementHeight(document.getElementById('title-text'));

	removeVideo(win_width);

	//on scroll, change colors of nav items accordingly
	$('#wrapper').scroll(function(){
		navColors();
	});

	//retrigger scroll position colors on resize
	$(window).resize(function(){
		var windowsize = $(window).width();
		removeVideo(windowsize);
		navColors();
		calculateElementHeight(document.getElementById('title-text'));
	});

	//scroll to top on arrow nav click
	$('#nav-burger').on('click', function(){
		$('#wrapper').animate({
				scrollTop: 0
			}, 500);
	});


	//change video background on play button click
	$('#play-button').on('click', function(){
		swapVideo($(this));

	});

	//startup book slide. can change speed slide interval speed here too
	setInterval(slideBook, 7000);
	

});