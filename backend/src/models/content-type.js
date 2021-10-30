const mongoose = require('mongoose');

const { Schema } = mongoose;

const contentTypeSchema = new Schema(
    {
        name: { type: String, required: true, lowercase: true, trim: true, unique: true },
        fields: { type: Schema.Types.Map, required: true },
    },
    { timestamps: true },
);

module.exports = mongoose.model('contentType', contentTypeSchema);
