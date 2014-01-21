/**
 * ArtistController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	
  'new': function(req, res){
		res.view();
	},

	create: function(req, res, next){
		//create an artist with params sent from
		//the signup form new.ejs
		Artist.create(req.params.all(), function artistCreated (err, artist){

			//if there's an error
			if (err){
				console.log(err);
				req.session.flash = {
					err: err
				};


				//if error,redirect to signup page
				return res.redirect('/artist/new');
			}

			//after success, redirect to show action
			res.redirect('/artist/show/'+artist.id);
		});

	},

	show: function(req, res, next){
		Artist.findOne(req.param('id'), function foundArtist (err, artist){
			if (err) return next(err);
			if (!artist) return next('Artist doesn\'t exist.');
			res.view({
				artist: artist
			});
		});
	},

	list: function(req, res, next){
		//send all user objects to main page for display
		Artist.find(function foundArtists(err, artists){
			res.view({
				artists: artists
			});
		});
	},

 index: function(req, res, next){
	Artist.find().sort('name').exec(function foundArtists(err, artists){
		res.view({
			layout: "layouts/artistLayout.ejs",
			artists: artists
		});
	});
  },

	//edit.ejs
	edit: function(req, res, next){
		//find the artist from the id passed in via paramenters
		Artist.findOne(req.param('id'), function foundArtist(err, artist){
			if (err) return next(err);
			if (!artist) return next('Artist doesn\'t exist.');

			res.view({
				artist: artist
			});
		});
	},

	//process the info from the edit view
	update: function (req, res, next){
		Artist.update(req.param('id'), req.params.all(), function artistUpdated(err){
			if (err) {
				return res.redirect('/artist/edit/' + req.param('id'));
			}

			res.redirect('/artist/show/' + req.param('id'));
		});
	},

	destroy: function(req, res, next){
		Artist.findOne(req.param('id'), function foundArtist(err, artist){
			if (err) return next(err);

			if (!artist) return next('Artist doesn\'t exist.');

			Artist.destroy(req.param('id'), function artistDestroyed(err){
				if (err) return next(err);
			});

			res.redirect('/artist');
		});
	}
  
};
