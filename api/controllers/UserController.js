/**
 * UserController
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
		res.view({
			_layoutFile: "../layouts/userLayout.ejs"
		});
	},

	create: function (req, res, next){
		//create a user with params sent from
		//the signup form new.ejs
		User.create( req.params.all(), function userCreated (err, user){

			//if there's an error
			if (err){
				console.log(err);
				req.session.flash = {
					err: err
				};


				//if error,redirect to signup page
				return res.redirect('/user/new');
			}

			//Log user in
			req.session.authenticated = true;
			req.session.User = user;

			//change status to online
			user.online = true;
			user.save(function(err, user){
				if (err) return next(err);
			});

			//after success, redirect to show action
			res.redirect('/user/show/'+user.id);
		});
	},

	show: function(req, res, next){
		User.findOne(req.param('id'), function foundUser (err, user){
			if (err) return next(err);
			if (!user) return next('User doesn\'t exist.');
			res.view({
				user: user,
				_layoutFile: "../layouts/userLayout.ejs"
			});
		});
	},

	index: function(req, res, next){

		//get an array of all users in the User db
		User.find(function foundUsers(err, users){
			if (err) return next(err);

			//pass array down to index.ejs page
			res.view({
				users: users,
				_layoutFile: "../layouts/userLayout.ejs"
			});
		});
	},


	//edit.ejs
	edit: function(req, res, next){
		//find the user from the id passed in via paramenters
		User.findOne(req.param('id'), function foundUser(err, user){
			if (err) return next(err);
			if (!user) return next('User doesn\'t exist.');

			res.view({
				user: user,
				_layoutFile: "../layouts/userLayout.ejs"
			});
		});
	},

	//process the info from the edit view
	update: function (req, res, next){
		User.update(req.param('id'), req.params.all(), function userUpdated(err){
			if (err) {
				return res.redirect('/user/edit/' + req.param('id'));
			}

			res.redirect('/user/show/' + req.param('id'));
		});
	},

	destroy: function(req, res, next){
		User.findOne(req.param('id'), function foundUser(err, user){
			if (err) return next(err);

			if (!user) return next('User doesn\'t exist.');

			User.destroy(req.param('id'), function userDestroyed(err){
				if (err) return next(err);
			});

			res.redirect('/user');
		});
	}
  
};
