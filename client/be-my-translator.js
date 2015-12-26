Router.route('/', {
    layoutTemplate: 'main',
});


/*  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });*/

Template.main.helpers({
	user: function(){
		return Meteor.users.findOne({_id: this._userId});
	},
    currentUser: function() {
            return Meteor.userId();
    },
    currentUserName: function() {
                return Meteor.user().username;
    },
 });

if (Meteor.isServer) {
  Meteor.startup(function () {

    // code to run on server at startup
  });
}



