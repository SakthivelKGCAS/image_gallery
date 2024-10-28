const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    imageTitle: { type: String, required: true },
    imageDescription: { type: String, required: true },
    imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Image', ImageSchema);
