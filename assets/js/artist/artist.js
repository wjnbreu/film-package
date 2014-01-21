$(document).ready(function(){

var imgWidth = 250; //px
var padding = 100;
var images = $('#wrapper').find('.artists ul li img');
var imgLength = images.length;



function makeWidth(){
	var setWidth = ((imgWidth + padding) * (imgLength + 1)); //add exta image place for padding
	$('.artists').css({
		width: setWidth + 'px'
	});
}

$(function() {
	$("#wrapper").mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 1.5);
		event.preventDefault();
	});
});

var cast = $('#insert-name').text();


if (cast.indexOf('Cast') !== -1){
	$('#insert-name').on('click', function(){

	});
}

//SLIDE UP INFO WHEN CLICKED
images.on('click', function(){
	var name = $(this).data('name');
	var pic = $(this).data('pic');
	//empty out default picture
	$('#artist-info').find('.assets img').empty();
	addInfo(name, pic);
	$('#artist-info').transition({
		top: 0
	}, 500, "ease");
});


//EXIT INFO BOX
$('#artist-info').find('.exit').on('click', function(){
	$(this).addClass('hidden');
	$('#artist-info').transition({
		top: '100%'
	}, 500, "ease");
	$(this).parent().find('span').empty();
});

//ADD INFO TO SLIDE BOX
function addInfo(name, pic, nickname){
	$('#artist-info').find('span').text(name);
	$('#artist-info').find('.exit').removeClass('hidden');
	$('#artist-info').find('.assets img').attr('src', '../images/artist/' + pic + '.jpg');

	//loop through h2 titles
	$('#artist-info').find('h2').each(function(){
		//make sure each one is hidden
		$(this).addClass('hidden');

		if ($(this).hasClass(pic + '-title')){
			$(this).removeClass('hidden');
		}
	});

	//loop through each p item (which are dynamically created via database objects)
	$('#artist-info').find('p').each(function(){
		//make sure each one is hidden
		$(this).addClass('hidden');

		//find particular p that matches class of clicked image
		if ($(this).hasClass(pic + '-bio')){
			$(this).removeClass('hidden');
		}
	});
}

//GET NAME TITLES
images.on('mouseenter', function(){
	var name = $(this).data('name');
	$('#insert-name').text(name);
});

images.on('mouseleave', function(){
	$('#insert-name').empty().text('Cast');
});

makeWidth();

}); //end doc ready
