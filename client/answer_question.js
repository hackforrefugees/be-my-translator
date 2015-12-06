if (Meteor.isClient) {
    // code to run in client

   /* Template.questionForm.events({
        'submit .answer_question_text': function(event){
                event.preventDefault();

                Questions.insert({
                    user: "Dummy User 2",
                    question: questionId, //Should be getted from the question
                    timestamp: new Date(),
                    type: "text",
                    data: event.target.text.value,
                });
            },
            'click .go-to-record': function(event) {
                event.preventDefault();
                Router.go('/record');
            },
    });*/
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
