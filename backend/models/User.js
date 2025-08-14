const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'please add a name'],
        },
        email: {
            type: String,
            required: [true, 'please add a email'],
            unique: true,
            match: [
                /^\S+@\S+\.\S+$/,
                "Please use a valid email address",
            ],
        },
        password: {
            type: String,
            required: [true, 'please add a password'],
            minlength: 6,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model('User', userSchema);