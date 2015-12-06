if (Meteor.isClient) {
    Template.questionForm.events({
        'submit .ask_question': function(event){
            event.preventDefault();

            var question_doc = {
                user: "Dummy User 1",
                lang_from: event.target.lang_from.value,
                lang_to: event.target.lang_to.value,
                title: event.target.title.value,
                timestamp: new Date(),
                type: "text", // default
                data: event.target.text.value,
            };

            var photo = Session.get("photo");
            if (photo) {
                // Prepare document for photo type
                question_doc.type = "photo";
                delete question_doc["data"];
            }

            Questions.insert(question_doc, function (err, question_id) {
                if (err) {
                    // TODO: error handling
                    console.log("error in questions insert:", err);
                }
                else if (photo) {
                    // Upload photo to MongoDB GridFS in background
                    Meteor.call("uploadQuestionPhoto", question_id, photo, function (err, response) {
                        console.log(err);
                        console.log(response);
                        if (err) {
                            // TODO: error handling
                            console.log("got error from imageToMongo:", err, response);
                        }
                    });
                    Session.set("photo", undefined);
                }
            });

            // TODO: loop...
            event.target.lang_from.value = "";
            event.target.lang_to.value = "";
            event.target.title.value = "";
            event.target.text.value = "";
        },
        'click .go-to-record': function(event) {
            event.preventDefault();
            Router.go('/record');
        },
    });
}
