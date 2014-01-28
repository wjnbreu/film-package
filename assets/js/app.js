/**
 * app.js
 *
 * This file contains some conventional defaults for working with Socket.io + Sails.
 * It is designed to get you up and running fast, but is by no means anything special.
 *
 * Feel free to change none, some, or ALL of this file to fit your needs!
 */


(function (io) {

  // as soon as this file is loaded, connect automatically, 
  var socket = io.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  socket.on('connect', function socketConnected() {

    console.log("This is from the connect: ", this.socket.sessionId);

    //listen for the socket message
    socket.on('message', cometMessageReceivedFromServer);

    //subscribe to the user model classroom and instance room
    socket.get('/user/subscribe');


    ///////////////////////////////////////////////////////////
    // Here's where you'll want to add any custom logic for
    // when the browser establishes its socket connection to 
    // the Sails.js server.
    ///////////////////////////////////////////////////////////
    log(
        'Socket is now connected and globally accessible as `socket`.\n' + 
        'e.g. to send a GET request to Sails, try \n' + 
        '`socket.get("/", function (response) ' +
        '{ console.log(response); })`'
    );
    ///////////////////////////////////////////////////////////


  });


  // Expose connected `socket` instance globally so that it's easy
  // to experiment with from the browser console while prototyping.
  window.socket = socket;


  // Simple log function to keep the example simple
  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }
  

})(

  // In case you're wrapping socket.io to prevent pollution of the global namespace,
  // you can replace `window.io` with your own `io` here:
  window.io

);

function cometMessageReceivedFromServer(message){
  //function routes the message based on teh model which issued it
  console.log("here's the message: ", message);

  //this message has to do with User model
  if (message.model === 'user'){
    var userId = message.id;
    updateUserInDom(userId, message);
  }
}

function updateUserInDom(userId, message){

  //what page am I on?
  var page = document.location.pathname;

  //strip trailing slash if we've got one
  page = page.replace(/(\/)$/, '');

  //route to appropriate user update handler based on which page you're on
  switch(page){
    //if we're on user index
    case '/user':
      //this is a message coming from publishUpdate
      if (message.verb === 'update'){
        UserIndexPage.updateUser(userId, message);
      }

      //coming from publish/create
      if (message.verb === 'create'){
        UserIndexPage.addUser(message);
      }

      //publishdestroy
      if (message.verb === 'destroy'){
        UserIndexPage.destroyUser(userId);
      }
      break;

  }
}


//USER INDEX PAGE DOM MANIPULATION LOGIC
var UserIndexPage = {
  updateUser: function(id, message){
    if (message.data.loggedIn){
      var $userRow = $('tr[data-id="' + id + '"] td img').first();
      $userRow.attr('src', "/images/icon-online.png");
    }
    else{
      var $userRow = $('tr[data-id="' + id + '"] td img').first();
      $userRow.attr('src', "/images/icon-offline.png");
    }

  }

};

