if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  Session.setDefault('textInput', "");


  Template.answer_question.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

    Template.be-my-translator.events({
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
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
