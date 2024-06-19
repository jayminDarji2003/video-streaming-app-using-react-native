const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    videos: [{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }]
}, { timestamps: true });

// Export the User model
module.exports = mongoose.model('User', UserSchema);
