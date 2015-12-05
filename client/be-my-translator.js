if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  QuestionCollection = new Mongo.Collection('questions');


  Template.home_page.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.home_page.events({
    'click button': function () {
      // increment the counter when button is clicked
      //QuestionCollection.
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
