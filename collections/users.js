if(Meteor.isClient){
	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_ONLY'
	});
} else {
	Meteor.publish("allUserNames", function(){
		if(this.userId){ //We should only send data to logged in users.
			return Meteor.users.find({}, {fields: {'profile.usersname': 1}});
		} else {
		     return "Dummy User1 ";
		}
	});
}