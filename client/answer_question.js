if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  Session.setDefault('textInput', "");


  Template.answer_question.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.ask_question.events({
        "submit form": function (event, template) {
        var inputValue = event.target.textInput.value;
      // increment the counter when button is clicked
       alert(inputValue);
       Session.set('textInput', Session.get('inputValue'));

       //QuestionCollection.insert(text: textInput, )
     }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
