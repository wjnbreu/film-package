/**
 * SessionController
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

var bcrypt = require('bcrypt');


module.exports = {
    
'new': function(req, res){

	res.view('session/new', {
		_layoutFile: '../layouts/userLayout.ejs'
	});
},

create: function(req, res, next){
	//check for email and password in params send via the form
	//if none, redirect the browser to the sign-in form
	if (!req.param('email') || !req.param('password')){
		var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired',
		message: 'You must enter both a username and password.'}];

		//remember that err is the object being passed down (aka flash.err),
		//whose value is another object with the key of usernamePasswordRequiredError
		req.session.flash = {
			err: usernamePasswordRequiredError
		};

		res.redirect('/session/new');
		return;
	}

	//try to find user by email address
	User.findOneByEmail(req.param('email')).done(function(err, user){
		if (err) return next(err);

		//if no user is found...
		if (!user) {
			var noAccountError = [{name: 'noAccount', message: 'The email address ' + req.param('email') + ' not found'}];
			req.session.flash = {
				err: noAccountError
			};
			res.redirect('/session/new');
			return;
		}

		//compare password from the form params
		bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid){
			if (err) return next(err);

			//if the password from the form deosnt' amtch the password from the database...
			if (!valid){
				var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch', message: 'Invalid username and password combination.'}];
				req.session.flash = {
					err: usernamePasswordMismatchError
				};
				res.redirect('/session/new');
				return;
			}

			//log user in
			req.session.authenticated = true;
			req.session.User = user;

			//change status to online
			user.online = true;
			user.save(function(err, user){
				if (err) return next(err);
			});

			//inform other sockets that this user is now logged in
			User.publishUpdate(user.id, {
				loggedIn: true,
				id: user.id
			});

			//if the user is also an admin, redirect to the user list
			//eg (views/user/index.ejs)
			//this is used in conjuction with config/policies.js file
			if (req.session.User.admin){
				res.redirect('/user');
				return;
			}

			//redirect to their profile page (eg /views/user/show.ejs)
			res.redirect('/user/show/' + user.id);
		});
	});
	},

	destroy: function(req, res, next){

		User.findOne(req.session.User.id, function foundUser(err, user){

			var userId = req.session.User.id;

			//the user is logging out
			User.update(userId, {
				online: false
			}, function (err){
				if (err) return next(err);

				//inform other sockets that user is logged out
				User.publishUpdate(user.id, {
					loggedIn: false,
					id: user.id
				});

				//wipe out session (log out)
				req.session.destroy();

				//redirect broswer to sign in page
				res.redirect('/session/new');
			});
		});
	}
  
};
