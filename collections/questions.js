Questions = new Mongo.Collection('questions');

if(Meteor.isServer){
	Questions.allow({
		// TODO: might want to have at least some check here...
		insert: function(){
			return true;
		},
		update: function() {
			return true;
		},
	});

	Meteor.publish('questions', function(){
		return Questions.find();
	});
}
