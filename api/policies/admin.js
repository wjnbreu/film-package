/**
Allow any authenticated util.isError
*/

module.exports = function (req, res, next){
	//user is allowed, proceed to controller
	if (req.session.User && req.session.User.admin){
		return next();
	}

	//user is not allowed
	else{
		var requireAdminError = [{name: 'requireAdminError', message: "You must be an admin."}];
		req.session.flash = {
			err: requireAdminError
		};
		res.redirect('/session/new');
		return;
	}
};