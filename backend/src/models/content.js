const mongoose = require('mongoose');

const { Schema } = mongoose;

const contentSchema = new Schema(
    {
        contentType: { type: Schema.Types.ObjectId, ref: 'contentType' },
        space: { type: Schema.Types.ObjectId, ref: 'space' },
        language: { type: Schema.Types.ObjectId, ref: 'language' },
    },
    { timestamps: true, strict: false },
);

module.exports = mongoose.model('content', contentSchema);
