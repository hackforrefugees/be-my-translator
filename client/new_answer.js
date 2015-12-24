Router.route('/new_answer/:_id', {
    layoutTemplate: 'main',
    template: 'new_answer',
    data: function() {
        return Questions.findOne({ _id: this.params._id});
    }
});

if (Meteor.isClient) {
    Template.new_answer.events({
        'submit .new_answer': function(event) {
            event.preventDefault();
            console.log(this);
            var question_id = this._id;
            var answertext = event.target.text.value;
            console.log("updating id '" + question_id + "' with '" + answertext + "'");
            Questions.update(
                { _id: question_id },
                { $push: { answers: {
                    _id: new Mongo.ObjectID(),
                    user: Meteor.userId(),
                    type: "text",
                    data: answertext,
                    timestamp: new Date(),
                    username: Meteor.user().username,
                } } }
            );
            Router.go('/details/' + question_id);
        },
    });
}
