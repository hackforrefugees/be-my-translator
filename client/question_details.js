Router.route('/details/:_id', {
    layoutTemplate: 'main',
    template: 'question_details',
    data: function() {
        var q = Questions.findOne({ _id: this.params._id});
        console.log(q);
        return q;
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
}
