if (Meteor.isClient) {
    Template.question_view.helpers({
        questions: function () {
            return Questions.find({});
        },

        // question_details dummy data
        /*
        questions: [
            {
                user: "User 1",
                lang_from: "English",
                lang_to: "Swedish",
                title: "Apple",
                type: "text",
                data: "What's apple in Swedish?",
                answers: [
                    {
                        user: "Translator 1",
                        type: "text",
                        data: "Äpple",
                    },
                    {
                        user: "Translator 2",
                        type: "text",
                        data: "Päron",
                    },
                    {
                        user: "Translator 3",
                        type: "text",
                        data: "Äppele",
                    }
                ],
            }
        ]
        */
    });

    Template.question_answer.events({
        "click .answered": function (event, template) {
            var parent = Template.parentData();
            Questions.update(
                { _id: parent._id },
                { $set: { approved: template.data._id } }
            );
        },
    });

    Template.question_approved.helpers({
        answer: function () {
            // Get just that single matching item
            var item = Questions.findOne(
                {"answers._id": this.item},
                {"_id": 0, "answers.$": 1}).answers[0];
            // Make sure question_answer now this is an approved answer
            item.approved = true;
            return item;
        }
    });
}
