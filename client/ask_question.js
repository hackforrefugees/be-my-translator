if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.ask_question.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.ask_question.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

    Template.ask_question.events({
    'submit': function(event){
        event.preventDefault();
        var value =  event.target.text.value;

        alert(value);

        Questions.insert({
            id: 0,
            $addToSet: {comment: value},
            timestamp: new Date()
        });
        event.target.text.value = "";
    }
    });

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
