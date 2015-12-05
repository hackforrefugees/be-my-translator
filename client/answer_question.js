if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.answer_question.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.answer_question.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
