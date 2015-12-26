Router.route('/ask', {
    layoutTemplate: 'main',
    template: 'ask_tab',
});

if (Meteor.isClient) {
    Meteor.subscribe('questions');

    Template.ask_tab.helpers({
      currentUserName: function() {
        return Meteor.user().username;
      },

      ongoing: function () {
        return Questions.find( {$and: [{approved: {$exists: false}}, {user: Meteor.userId()}]}, {sort: {timestamp: -1}});
      },

      answered: function () {
        return Questions.find( {$and: [{approved: {$exists: true}}, {user: Meteor.userId()}]}, {sort: {timestamp: -1}});
      },

    });

    Template.question_detail_button.events({
        'click .question-item': function(event) {
            event.preventDefault();
            Router.go('/details/' + this._id);
        }
    });
}