const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: { type: String, required: true, minlength: 2, maxlength: 64 },
    },
    { timestamps: true },
);

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
});

module.exports = mongoose.model('user', userSchema);
