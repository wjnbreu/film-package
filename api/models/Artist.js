/**
 * Artist
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	schema: true,

  attributes: {
	
	name: {
		type: 'string'
	},

	title: {
		type: 'string'
	},

	nickname: {
		type: 'string'
	},

	bio: {
		type: 'string'
	},

	lecture: {
		type: 'url'
	},

	radio: {
		type: 'url'
	},

	magazine: {
		type: 'url'
	},

	website: {
		type: 'url'
	},




	toJSON: function(){
		var obj = this.toObject();
		delete obj.password;
		delete obj.confirmation;
		delete obj.encryptedPassword;
		delete obj._csrf;
		return obj;
	}
	
  }


};