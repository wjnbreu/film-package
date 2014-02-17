$(document).ready(function() {



 //GLOBAL VARIABLES
	var nav = $('nav a');
	var bottom = $('#nav-bottom a');
	var win_height = $(window).height();
	var win_width = $(window).width();
	var elementHeight = 0; //used for call bounding rect to measure element
	var exit = $('#wrapper').find('#exit');

	//number of content screens - 1
	var scrollBottom = $(window).scrollTop() + (win_height * 4.5);
	var backgrounds = ['top'];
	var scrollSpeed = 500;
	var country;
	var sd_download = $('#download').find('.download-left a');
	var hd_download = $('#download').find('.download-right a');
	
	var hd = "https://s3.amazonaws.com/RBMAFilm/HD+What+Difference+Does+It+Make%3F+A+Film+About+Making+Music";
	var sd = "https://s3.amazonaws.com/RBMAFilm/SD+What+Difference+Does+It+Make%3F+A+Film+About+Making+Music";
	
	var hd_jp = "http://www.rgbpicture.com/img/weird/japan/japan36.jpg";
	var sd_jp = "https://s3.amazonaws.com/RBMAFilm/SD+JP+What+Difference+Does+It+Make%3F";


	findLocation();
	

	function findLocation(){
		try{
			//get ip for japan and choose links
			$.getJSON("http://freegeoip.net/json/",function(data){
				country = data.country_name;

				
				if (country === 'Japan'){
					sd_download.attr('href', sd_jp);
					hd_download.attr('href', hd_jp);

				}

				else {
					sd_download.attr('href', sd);
					hd_download.attr('href', hd);
					init();
				}
			});
		}

		//defaults to OG video if country can't be detected
		catch (error){
			sd_download.attr('href', sd);
			hd_download.attr('href', hd);
			init();
		}
	}



	function init(){

		function swapVideo(vid){
			var height = (measureVideo());
			var width = ($(window).width());
			var target = vid.parent().parent();

			//display appropriate vid based on country
			if (country === 'Japan'){
				target.find('#embed').html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/HUUa-KNyqKk?enablejsapi=1&amp;origin=*&amp;autoplay=1&amp;loop=1&amp;hd=1&amp;modestbranding=0" frameborder="0" seamless="seamless" webkitallowfullscreen="webkitAllowFullScreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen></iframe>');
			}
			else{
				target.find('#embed').html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/_EDnMFJiv8U?enablejsapi=1&amp;origin=*&amp;autoplay=1&amp;loop=1&amp;hd=1&amp;modestbranding=0" frameborder="0" seamless="seamless" webkitallowfullscreen="webkitAllowFullScreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen></iframe>');
			}
			
			target.find('.play').hide();
			target.find('#embed').show();
			target.find('.cover').hide();
			target.find('#embed').css({
				zIndex: '99'
			});
		}

			//USED TO MESAURE SCREEN SIZE TO BE USED FOR VIDEO SIZE
		function measureVideo(){
			var rect = document.getElementById("stream").getBoundingClientRect();
			if (rect.height){
				elementHeight = rect.height;
			}
			else{
				elementHeight = rect.bottom - rect.height; //derive height
			}

			return elementHeight;
		}



		
		//grabs class of link and scrolls accordingly
		function smoothScroll(clk){
			if (clk.hasClass('filmlink')){
				$('#wrapper').animate({
					scrollTop: win_height
				},scrollSpeed);
				$('#pointer').fadeOut();
			}

			//slide out book
			else if(clk.hasClass('booklink')){
				$('#bookframe').html('<iframe src="/book" width="100%" height="100%" border="0"></iframe>');
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
				$('#pointer').fadeOut();
			}
			else if(clk.hasClass('titlelink')){
				$('#wrapper').animate({
					scrollTop: 0
				}, scrollSpeed);
			}
		}


		//used for video
		function getElementLeftTop(thiselement){
			var rect = thiselement.getBoundingClientRect();
			return [rect.left];
		}

		function scrollDown(){
			var scrolltop = $('#wrapper').scrollTop();
			winheight = $(window).height();
			$('#pointer').fadeOut();

			if (scrolltop < (winheight / 2)){
				$('#wrapper').animate({
					scrollTop: (win_height)
				}, scrollSpeed);
			}

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





		//STARTUP EVENT LISTENERS AND FUNCTIONS

		//REFACTOR TO FUNCTIONS!!!	
		$('#download').find('.download-left img').on('mouseenter', function(){
			$(this).attr('src', 'images/standard_def_back.svg');
		});

		$('#download').find('.download-left img').on('mouseleave', function(){
			$(this).attr('src', 'images/standard_def_b.svg');
		});

		$('#download').find('.download-right img').on('mouseenter', function(){
			$(this).attr('src', 'images/high_def_back.svg');
		});

		$('#download').find('.download-right img').on('mouseleave', function(){
			$(this).attr('src', 'images/high_def_b.svg');
		});

		
		//slide out facebook like button on click
		$('#about').find('.social .fb-button').on('click', function(e){
			e.preventDefault();
			$(this).parent().parent().find('iframe').slideToggle('slow');
		});

		//and
		$('#download').find('.fb-button').on('click', function(e){
			e.preventDefault();
			$(this).parent().parent().find('iframe').slideToggle('slow');
		});



		//on nav bar click, grab link class and pass to smooth scroll
		$('nav').on('click', 'a.scroll', function(){
			smoothScroll($(this));
			
		});

		$('#nav-bottom').on('click', 'a.scroll', function(){
			smoothScroll($(this));
			$('#pointer').fadeOut();
		});





		//slide to next screen with arrow up/down
		$(document).keydown(function(e){
			e.stopPropagation();
			if (e.keyCode === 40) {
				scrollDown();
			} else if (e.keyCode === 38) {
				scrollUp();
			}
		});


		//use css animated arrow on hero page to scroll down one page
		$('#pointer').on('click', function(){
			var scrollAmount = $(window).height();
			$('#wrapper').animate({
					scrollTop: (scrollAmount)
				}, 700, function(){
					$('#pointer').fadeOut();
				});
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

		//change video background on play button click
		$('#play-button').on('click', function(){
			swapVideo($(this));
			$(this).fadeOut();

		});



} //end init
}); //end doc readyu



