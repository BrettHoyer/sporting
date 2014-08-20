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
    'click #new-game #new-game-button': function (e) {
      e.preventDefault();

      var gameTitle = $('#new-game #game-title').val();
      var gameSpread = $('#new-game #game-spread').val();
      var gameOverUnder = $('#new-game #game-over-under').val();

      Games.insert({gameTitle: gameTitle, gameSpread: gameSpread, gameOverUnder: gameOverUnder});

      $('#new-game input').val('');
    },

    'click #delete-game': function(e){
      e.preventDefault();

      console.log(this);

      Games.remove({_id: this._id})

    }
  });

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
