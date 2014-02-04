$(document).ready(function() {

//DOUBLE CHECK BURGER DOWN FUNCTIONS

 //GLOBAL VARIABLES
	var nav = $('nav a');
	var bottom = $('#nav-bottom a');
	var burgerWhite = $('#nav-burger .white');
	var burgerDown = $('#nav-down');
	var win_height = $(window).height();
	var win_width = $(window).width();
	var elementHeight = 0; //used for call bounding rect to measure element
	var exit = $('#wrapper').find('#exit');

	//number of content screens - 1
	var scrollBottom = $(window).scrollTop() + (win_height * 4.5);
	var backgrounds = ['top'];
	var counter = 1;
	var background_counter = 0; //used to make sure backgrounds only change once
	var scrollSpeed = 500;

	var artists = ['Afrika Bambaataa', 'DJ Assault', 'Brian Eno', 'Van Dyke Parks',
	'Rakim', 'Bernie Worrell', 'Stephen O’Malley', 'Trancemicsoul', 'Jimi Nxir', 'Quietdust',
	'Ale Hop', 'Koreless', 'Kraftmatiks', 'Lee Perry', 'Thundercat', 'Leo Aldrey',
	'Nile Rodgers', 'Philip Glass', 'Deborah Harry', 'De La Montagne', 'Mr. Selfish',
	'Ken Scott', 'Malcolm Cecil', 'Melmann', 'Ale Hop', 'Julian Love',
	'Falty DL', 'Orlando Volcano', 'Benjamin Damage', 'Nick Hook', 'François K',
	'James Murphy', 'Skream', 'Jamie Jupiter', 'Egyptian Lover', 'Richie Hawtin',
	'Seth Troxler', 'Steve Arrington', 'Todd Edwards', 'Easton West',
	'Giorgio Moroder', 'Q-Tip', 'Mathew Jonson', 'Erykah Badu', 'Tom Moulton', 'Pantha Du Prince',
	'Flying Lotus', 'Gaslamp Killer', 'Louis Baker', 'Big Freedia', 'Star Eyes', 'Just Blaze',
	'Young Guru'];



	//change out autoplay=none to autoplay=1 on click
	function swapVideo(vid){
		var height = measureVideo();
		var width = $(window).width();
		var target = vid.parent().parent();
		target.find('.text').hide();
		target.find('#loop').addClass('video-playing').fadeOut();



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



	//hide all main navigation items, replace with arrow.
	//only fires when window width > 800
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
			//make sure nav arrow is hidden
			burgerWhite.css({
				display: 'none'
			});

			//make sure nav links display
			navMax(nav);
			navMax(bottom);

		}

		//make sure down burger is hidden 
		if (top > 0 && top < win_height){
				burgerDown.css({
				display: 'none'
			});
		}

		// LOSE POINTER ONCE SCROLL BEGINS
		if (top >= 58){
			//lose css animation
			$('#pointer').fadeOut();
		}

		//SECOND SCREEN
		if (top >= win_height - 35){
			//add nav pointer
			burgerWhite.css({
				display: 'block'
			});
			burgerDown.css({
				display: 'block'
			});

			//CLOSE ALL NAVIGATION
			navMin(nav);
			navMin(bottom);
		}

		//IF BACK ON HERO PAGE
		if (top < (win_height - 58)){
			//re-add navigation links
			navMax(nav);
			navMax(bottom);
			//lose nav pointer
			burgerWhite.css({
				display: 'none'
			});
		}
	}
	
	function smoothScroll(clk){
		if (clk.hasClass('filmlink')){
			$('#wrapper').animate({
				scrollTop: win_height + 10
			},scrollSpeed);
		}

		//slide out book
		else if(clk.hasClass('booklink')){
			$('#bookframe').transition({
				left: 0,
				top: 0
			}, 1000,function(){
				//make sure exit button is visible
				exit.removeClass('hidden').fadeIn();
			});

		}

		else if(clk.hasClass('aboutlink')){

			$('#wrapper').animate({
				scrollTop: $('#aboutlink').offset().top
			}, scrollSpeed);
		}
		else if(clk.hasClass('titlelink')){
			$('#wrapper').animate({
				scrollTop: 0
			}, scrollSpeed);
		}
	}



	function getElementLeftTop(thiselement){
		var rect = thiselement.getBoundingClientRect();
		return [rect.left];
	}




	//STARTUP EVENT LISTENERS AND FUNCTIONS
	
	//slide out facebook like button on click
	$('#about').find('.social .fb-button').on('click', function(e){
		e.preventDefault();
		$(this).parent().parent().find('iframe').slideToggle('slow');
	});

	//make sure youtube html is empty on page load
	$('#film').find('#embed').empty();


	//on nav bar click, grab link class and pass to smooth scroll
	$('nav').on('click', 'a.scroll', function(){
		smoothScroll($(this));
	});

	$('#nav-bottom').on('click', 'a.scroll', function(){
		smoothScroll($(this));
	});

	//call remove video function. will only remove loop if on device
	removeVideo(win_width);

	//on scroll, change colors of nav items accordingly
	$('#wrapper').scroll(function(){
		if (win_width > 800){
			navColors();
		}
		else{
			return;
		}
		
	});

	//retrigger scroll position colors on resize
	$(window).resize(function(){
		var windowsize = $(window).width();
		removeVideo(windowsize);
		if (windowsize > 800){
			navColors();
		}
		
	});


	function scrollDown(){
		var scrolltop = $('#wrapper').scrollTop();
		winheight = $(window).height();

		//if between first and third screen (countdown screen)
		if (scrolltop >= (winheight / 2) && scrolltop < (winheight * 2)){
			$('#wrapper').animate({
				scrollTop: (win_height * 2)
			}, scrollSpeed);
		}
		//between third and fourth screen (movie screen)
		if (scrolltop >= (winheight * 2 ) && (scrolltop < winheight * 3)){
			$('#wrapper').animate({
				scrollTop: (win_height * 3)
			}, scrollSpeed);
		}

		//between fourth and fifth screen (artist screen)
		if (scrolltop >= (winheight * 3 ) && (scrolltop < winheight * 4)){
			$('#wrapper').animate({
				scrollTop: (win_height * 4)
			}, scrollSpeed);
		}
		//go to the bottom of the about screen
		if (scrolltop >= (winheight * 4)){
			$('#wrapper').animate({
				scrollTop: (win_height * 6)
			}, scrollSpeed);
		}
	}

	function scrollUp(){
		var scrolltop = $('#wrapper').scrollTop();
		winheight = $(window).height();

		//if between first and third screen (movie screen)
		if (scrolltop >= (winheight / 2) && scrolltop < (winheight * 2)){
			$('#wrapper').animate({
				scrollTop: 0
			}, scrollSpeed);
		}
		//between third and fourth screen (info and about)
		if (scrolltop >= ( winheight * 2 ) && ( scrolltop < winheight * 3 )){
			$('#wrapper').animate({
				scrollTop: win_height
			}, scrollSpeed);
		}
		//go to the bottom of the about screen
		if (scrolltop >= (winheight * 3) && scrolltop < (win_height * 4)){
			$('#wrapper').animate({
				scrollTop: (win_height * 2)
			}, scrollSpeed);
		}

		//between fourth and fifth screen (artist screen)
		if (scrolltop >= (winheight * 4 ) && (scrolltop < winheight * 5)){
			$('#wrapper').animate({
				scrollTop: (win_height * 3) //allow extra padding
			}, scrollSpeed);
		}

		if (scrolltop >= (win_height * 5)){
			$('#wrapper').animate({
				scrollTop: (win_height * 4)
			}, scrollSpeed);
		}
	}

	//scroll up one screen on nav burger up click
	$('#nav-burger').on('click', scrollUp);


	//scroll down exactly on screen on nav down click
	$('#nav-down').on('click', scrollDown);


	//change video background on play button click
	$('#play-button').on('click', function(){
		swapVideo($(this));

	});

	//use css animated arrow on hero page to scroll down one page
	$('#pointer').on('click', function(){
		var scrollAmount = $(window).height();
		$('#wrapper').animate({
				scrollTop: scrollAmount
			}, 500);
	});

	//if book iframe is open, allow exit button to close iframe
	exit.on('click', function(){
		if (!(exit.hasClass('hidden'))){
			if (win_width > 768){
				$('#bookframe').transition({
					left: '100%',
					top: '-100%'
				}, 1000);
				$(this).addClass('hidden');
				//set back to none, so we can fade in when re-opened
				$(this).css({
					display: 'none'
				});
			}
			else{
				$('#bookframe').transition({
					left: '100%',
					top: '0'
				}, 1000);
				$(this).addClass('hidden');
				//set back to none, so we can fade in when re-opened
				$(this).css({
					display: 'none'
				});
			}
			
		}
	});

});