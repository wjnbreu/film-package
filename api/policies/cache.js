module.exports = function(req, res, next){

	var memjs = require('memjs');
	var mc = memjs.Client.create();

	next();
};