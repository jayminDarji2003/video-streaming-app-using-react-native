const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Video schema
const VideoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    prompt: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

// Export the Video model
module.exports = mongoose.model('Video', VideoSchema);
