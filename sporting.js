if (Meteor.isClient) {

  Accounts.ui.config({
    requestPermissions: {
      facebook: ['user_location', 'user_photos']
    }
  });

  Template.games.isAdmin = function(){
    if(Meteor.user()){
      return Meteor.user().profile.admin;
    }
  }
  Template.games.matchups = function(){
    var games = Games.find().fetch();
    return games;
  }


  Template.games.events({
    'click #newGame #submit': function (e) {
      e.preventDefault();

      var newGame = $('#newGame #gameTitle').val();

      Games.insert({name: newGame})
    }
  });

  Template.header.greeting = function () {
    return "Welcome to Tarf Sporting, ";
  };

  Template.header.name = function(){
    if(Meteor.user()){
      var firstName = Meteor.user().services.facebook.first_name
      var lastName = Meteor.user().services.facebook.last_name
      return firstName + ' ' + lastName;
    }
  }

  Template.header.profilePic = function(){
    if(Meteor.user())
      return Meteor.user().profile.profilePic;
  }
}

if (Meteor.isServer) {

  Accounts.onCreateUser(function(options, user){
    console.log('options', options, 'user', user)
    user.hello = 'world'
    if (options.profile){
      user.profile = options.profile;
    }

    if(user.services.facebook){
      user.profile.profilePic = 'http://graph.facebook.com/' + user.services.facebook.id + '/picture/'
    }
    return user;
  })

  Meteor.startup(function () {
    // code to run on server at startup
  });
}


//shared client / server
Games = new Meteor.Collection('games');
Users = Meteor.users;

