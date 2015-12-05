Questions = new Mongo.Collection('questions');

if(Meteor.isServer){
	Questions.allow({
		insert: function(userId, questionId){
			if(userId && questionId){
				return true;
			}
		}
	});

	Meteor.publish('questions', function(){
		return Questions.find();
	});
}