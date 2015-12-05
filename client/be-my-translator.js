if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  QuestionCollection = new Mongo.Collection('questions');


  Template.home_page.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.home_page.events({
    'click button': function () {
      // increment the counter when button is clicked
      //QuestionCollection.
    }
  });

  Template.questionForm.events({
    // take a pic
    "click .takePhoto": function(event, template) {
        var cameraOptions = {
            width: 800,
            height: 600
        };
        MeteorCamera.getPicture(cameraOptions, function (error, data) {
           if (!error) {
               template.$('.photo').attr('src', data); 
           }
        });
        event.preventDefault();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
