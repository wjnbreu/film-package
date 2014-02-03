/**
 * Default 403 (Forbidden) middleware
 *
 * This middleware can be invoked from a controller or policy:
 * res.forbidden( [message] )
 *
 *
 * @param {String|Object|Array} message
 *      optional message to inject into view locals or JSON response
 * 
 */

module.exports[403] = function badRequest(message, req, res) {

res.redirect('/');

};