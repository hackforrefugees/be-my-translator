Questions = new Mongo.Collection('questions');

if(Meteor.isServer){
	Questions.allow({
		insert: function(){
			return true;
		}
	});

	Meteor.publish('questions', function(){
		return Questions.find();
	});
}
