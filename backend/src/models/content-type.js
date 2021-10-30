const mongoose = require('mongoose');

const { Schema } = mongoose;

const contentTypeSchema = new Schema(
    {
        name: { type: String, required: true, lowercase: true, trim: true, unique: true },
        fields: { type: Schema.Types.Map, required: true },
        spaces: {
            type: [{ type: Schema.Types.ObjectId, ref: 'space', autopopulate: true }],
            validate: v => Array.isArray(v) && v.length > 0,
        },
    },
    { timestamps: true },
);

contentTypeSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('contentType', contentTypeSchema);
