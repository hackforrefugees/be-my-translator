Router.route('/answer', {
    layoutTemplate: 'main',
    template: 'answer_tab',
});

if (Meteor.isClient) {
    Meteor.subscribe('questions');

    Template.answer_tab.helpers({
        ongoing: function () {
            return Questions.find({approved: {$exists: false}}, {sort: {timestamp: -1}});
        },
        answered: function () {
            return Questions.find({approved: {$exists: true}}, {sort: {timestamp: -1}});
        },
    });

    Template.question_detail_button.events({
        'click .question-item': function(event) {
            event.preventDefault();
            Router.go('/details/' + this._id);
        }
    });
}
