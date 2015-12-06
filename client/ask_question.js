if (Meteor.isClient) {
    Template.questionForm.events({
        'submit .ask_question': function(event){
            event.preventDefault();

            Questions.insert({
                user: "Dummy User 1",
                lang_from: event.target.lang_from.value,
                lang_to: event.target.lang_to.value,
                title: event.target.title.value,
                timestamp: new Date(),
                type: "text",
                data: event.target.text.value,
            });
            // TODO: loop...
            event.target.lang_from.value = "";
            event.target.lang_to.value = "";
            event.target.title.value = "";
            event.target.text.value = "";
        },
        'click .go-to-record': function(event) {
            event.preventDefault();
            Router.go('/record');
        },
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
