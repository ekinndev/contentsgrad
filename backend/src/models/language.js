const mongoose = require('mongoose');

const { Schema } = mongoose;

const languageSchema = new Schema(
    {
        name: { type: String, required: true },
        code: { type: String, required: true },
    },
    { timestamps: true },
);

module.exports = mongoose.model('language', languageSchema);
