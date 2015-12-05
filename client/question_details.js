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
}
