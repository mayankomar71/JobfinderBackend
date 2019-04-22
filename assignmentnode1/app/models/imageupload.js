var mongoose = require('mongoose');
var imageModel = mongoose.Schema({
	url: {
		type: String,
		required: true
	},
	fileName : {
		type: String,
		require: true
	},
	imageType: {
		type: Number,
		required: true
	}

},{ versionKey: false });
module.exports=mongoose.model('imageModel',imageModel)