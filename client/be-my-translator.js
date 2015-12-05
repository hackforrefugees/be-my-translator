Router.route('/', {
    layoutTemplate: 'main',
    template: 'questionForm',
});

if (Meteor.isClient) {
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
