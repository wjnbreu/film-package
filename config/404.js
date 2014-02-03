/**
 * Default 404 (Not Found) handler
 *
 * If no route matches are found for a request, Sails will respond using this handler.
 * 
 * This middleware can also be invoked manually from a controller or policy:
 * Usage: res.notFound()
 */

module.exports[404] = function pageNotFound(req, res) {

  res.redirect('/');

};