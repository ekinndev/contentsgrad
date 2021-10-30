const mongoose = require('mongoose');

const { Schema } = mongoose;

const contentSchema = new Schema(
    {
        contentType: { type: Schema.Types.ObjectId, ref: 'contentType', autopopulate: true },
        language: { type: Schema.Types.ObjectId, ref: 'language', autopopulate: true, required: true },
        data: { type: Schema.Types.Map, required: true },
    },
    { timestamps: true },
);

contentSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('content', contentSchema);
