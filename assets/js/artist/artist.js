$(document).ready(function(){

	//THINGS TO DO: DISABLE ALL INSERT NAMES. NOT NEEDED ANYMORE
	//MAKE SURE IMAGES AREN'T LOADING ON MOBILE UNTIL CLICKED

var imgWidth = 250; //px
var padding = 100;
var artistList = $('#wrapper').find('.artists');
var artist = $('#wrapper').find('.artists ul a');
var artistLength = artist.length;
var images = $('#wrapper').find('.artist-images img');
var imageBlock = $('#wrapper').find('.artist-images');
var links = $('#artist-info').find('.links ul');
var cast = $('#insert-name').text();
var title = $('#insert-name');



function setDisplayOn(){
	$('#wrapper').find('.artist-images').css({
		display: 'block'
	});
}


function hideImages(){
	images.each(function(){
		$(this).addClass('hidden');
	});
	//get images ready to load
	setDisplayOn();
}
//loop through each image from database and set to hidden


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

	//loop through ul's, hide them, then show only the one that matches the class of artist clicked
	links.each(function(){
		$(this).css({
			display: 'none'
		});
		$(this).addClass('hidden');
		if ($(this).hasClass(pic + '-links')){
			$(this).removeClass('hidden');
			$(this).css({
				display: 'block'
			});
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

	var name = $(this).data('name');
	var pic = $(this).data('pic');
	imageBlock.css({
		display: 'block'
	});
	//$('#insert-name').hide();

	//loop again through images and find matching one
	images.each(function(){
		$(this).addClass('hidden');

		if ($(this).hasClass(pic)){
			$(this).removeClass('hidden');
			$(this).transition({
				width: '101%'
			}, 900);
		}
	});
});

artist.on('mouseleave', function(){
	hideImages();
	images.each(function(){
		$(this).css({
			width: '100%'
		});
	});
	imageBlock.css({
		display: 'none'
	});
	$('#insert-name').show();
	artist.css({
		color: 'white',
		backgroundColor: 'transparent'
	});
});


//hide all images on load, makes callback to set images to display block
hideImages();







}); //end doc ready
