var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
	url: { type: String, required: true },
	fileName: { type: String, require: true },
});

var fileModel = mongoose.model('imageModel', imageSchema);

module.exports = fileModel;