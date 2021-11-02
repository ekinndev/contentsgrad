const mongoose = require('mongoose');

const { Schema } = mongoose;

const fieldTypesSchema = new Schema(
    {
        fieldName: { type: String, required: true },
        fieldType: {
            type: String,
            required: true,
            enum: [
                'string',
                'number',
                'boolean',
                'integer',
                'float',
                'object',
                'enum',
                'date',
                'url',
                'email',
                'rstring',
            ],
        },
        enumData: [{ type: String, lowercase: true }],
        relationFieldName: { type: String, lowercase: true, default: '' },
        relationContentTypeId: { type: mongoose.Types.ObjectId },
    },
    { _id: false },
);

const contentTypeSchema = new Schema(
    {
        name: { type: String, required: true, lowercase: true, trim: true, unique: true },
        fieldsDatas: { type: [fieldTypesSchema], required: true, validate: v => Array.isArray(v) && v.length > 0 },
        spaces: {
            type: [{ type: Schema.Types.ObjectId, ref: 'space', autopopulate: true }],
            validate: v => Array.isArray(v) && v.length > 0,
        },
    },
    { timestamps: true },
);

contentTypeSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('contentType', contentTypeSchema);
