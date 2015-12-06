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

  Template.questionForm.helpers({
    //return some months into the template which will be displayed using {{spacebars}}
    months: function () {
      return [
      'Swedish',
	  'English',
      ];
    }
  });




  Template.questionForm.events({
    'change select': function (e, t) {//e is the change event data, t is the template instance
    // the reference to select element in the template instance
      var select = t.$(e.target);
      //the context for the select
      var c = select.context;
      // the 0-based index of the selected option
      var selectedIndex = c.selectedIndex;
      // the value of the option at the selected index
      var selectedValue = c[selectedIndex].value;

      //store the value in Session variable for reative use
      Session.set('selectedLanguage', selectedValue);
      console.log(e,t,c,selectedIndex,selectedValue);
    }
  })



Template.questionForm.events({
    'change select': function (e, t) {//e is the change event data, t is the template instance
    // the reference to select element in the template instance
      var select = t.$(e.target);
      //the context for the select
      var c = select.context;
      // the 0-based index of the selected option
      var selectedIndex = c.selectedIndex;
      // the value of the option at the selected index
      var selectedValue = c[selectedIndex].value;

      //store the value in Session variable for reative use
      Session.set('selectedMonth', selectedValue);
      console.log(e,t,c,selectedIndex,selectedValue);
    }
  })



}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}



