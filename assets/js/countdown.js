	//USED TO SET YOUTUBE WIDTH
	var width = document.documentElement.clientWidth;
	var height = document.documentElement.clientHeight;
	var done = true;


	//COUNTDOWN
	var target_date = new Date("Feb 18, 2014").getTime();
	//variables for time units
	var days, hours, minutes, seconds;
	var countdown = document.getElementById('countdown');

	setInterval(function(){
		//find number of seconds between now and target
	var current_date = new Date().getTime();
	var seconds_left = (target_date - current_date) / 1000;

	//convert to days, hours, minutes, seconds remaining
	days = parseInt(seconds_left / 86400, 10);
	seconds_left = seconds_left % 86400;

	hours = parseInt(seconds_left / 3600, 10);
	seconds_left = seconds_left % 3600;

	minutes = parseInt(seconds_left / 60, 10);
	seconds = parseInt(seconds_left % 60, 10);

	function loadYoutube(){
		alert('load');
		//LOAD IFRAME CODE ASYNCH
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	// 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
      	alert('ready');
        player = new YT.Player('player', {
          height: height,
          width: width,
          videoId: 'uVzx_p_DrL8',

          playerVars: {
          	'controls': 0,
          	'modestbranding': 1
          },
          events: {
            'onReady': onPlayerReady,
            //'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
        event.target.mute();
      }

	//format countdown string
	countdown.innerHTML = days + 'D, ' + hours + 'H, ' + minutes + 'M, ' + seconds + 'S';

	if ( days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0 && done === true){
		done = false;
		loadYoutube();
	} //end if

	

	}); //end setinterval


