$(document).ready(function(){

var imgWidth = 250; //px
var padding = 100;
var artist = $('#wrapper').find('.artists ul li a');
var artistLength = artist.length;
var images = $('#wrapper').find('.artist-images img');
var imageBlock = $('#wrapper').find('.artist-images');



function setDisplayOn(){
	$('#wrapper').find('.artist-images').css({
		display: 'block'
	});
}


function hideImages(){
	images.each(function(){
		$(this).addClass('hidden');
	});
}
//loop through each image from database and set to hidden


var cast = $('#insert-name').text();


if (cast.indexOf('Cast') !== -1){
	$('#insert-name').on('click', function(){

	});
}

//SLIDE UP INFO WHEN CLICKED
artist.on('click', function(){
	var name = $(this).data('name');
	var pic = $(this).data('pic');
	//empty out default picture
	$('#artist-info').find('.assets img').empty();
	addInfo(name, pic);
	$('#artist-info').transition({
		left: 0
	}, 500, "ease");
});


//EXIT INFO BOX
$('#artist-info').find('.exit').on('click', function(){
	$(this).addClass('hidden');
	$('#artist-info').transition({
		left: '100%'
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
artist.on('mouseenter', function(){
	artist.css({
		opacity: 0.5
	});
	var name = $(this).data('name');
	var pic = $(this).data('pic');
	imageBlock.css({
		display: 'block'
	});
	$('#insert-name').hide();

	//loop again through images and find matching one
	images.each(function(){
		$(this).addClass('hidden');

		if ($(this).hasClass(pic)){
			$(this).removeClass('hidden');
		}
	});
});

artist.on('mouseleave', function(){
	hideImages();
	imageBlock.css({
		display: 'none'
	});
	$('#insert-name').show();
	artist.css({
		opacity: 1
	});
});


//get images ready to load
setDisplayOn();


//hide all images on load
hideImages();





}); //end doc ready
