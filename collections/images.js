var imageStore = new FS.Store.GridFS("images");
Images = new FS.Collection("images", { stores: [imageStore] });

if(Meteor.isServer) {
	Images.allow({
		// TODO: might want to have at least some checks here...
		insert: function() {
			return true;
		},
		download: function() {
			return true;
		}
	});

	// Insertion function converting from Base64
    Meteor.methods({
        uploadQuestionPhoto: function(question_id, photo) {
            buf = new Buffer(photo.replace(/^data:image\/\w+;base64,/, ""),'base64');
			var img = new FS.File();
			img.attachData(buf, {type: 'image/jpeg'});
			img.name("question-photo.jpg");
			Images.insert(img, function (err, fileObj) {
				if (err) {
					console.log("Error inside imageToMongo");
					console.log(err);
				} else {
					Questions.update(
						{ _id: question_id },
						{ $set: { data: "/cfs/files/images/" + fileObj._id } }
					);
				}
			});
			return "Background update on " + question_id;
        },
	});
}
