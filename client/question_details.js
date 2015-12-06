Router.route('/details/:_id', {
    layoutTemplate: 'main',
    template: 'question_details',
    data: function() {
        return Questions.findOne({ _id: this.params._id});
    }
});

if (Meteor.isClient) {
    Meteor.subscribe('questions');

    Template.question_answer.events({
        "click .answered": function (event, template) {
            var parent = Template.parentData();
            Questions.update(
                { _id: parent._id },
                { $set: { approved: template.data._id } }
            );
        },
    });

    Template.question_approved.helpers({
        answer: function () {
            // Get just that single matching item
            var item = Questions.findOne(
                {"answers._id": this.item},
                {"_id": 0, "answers.$": 1}).answers[0];
            // Make sure question_answer now this is an approved answer
            item.approved = true;
            return item;
        }
    });

    Template.question_details.events({
        "click .post-new-answer": function (event, template) {
            event.preventDefault();
            Router.go('/new_answer/' + this._id);
        }
    });
}
