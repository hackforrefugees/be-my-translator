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
}
