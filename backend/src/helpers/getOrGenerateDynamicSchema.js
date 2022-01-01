const mongoose = require('mongoose');

const getOrGenerateDynamicSchema = name => {
    const doesSchemaExists = mongoose.modelNames().includes(name);

    if (doesSchemaExists) {
        return mongoose.model(name);
    } else {
        const { Schema } = mongoose;

        const contentSchema = new Schema(
            {
                contentType: { type: Schema.Types.ObjectId, ref: 'contentType', autopopulate: true },
                language: { type: Schema.Types.ObjectId, ref: 'language', autopopulate: true, required: true },
                data: { type: Schema.Types.Mixed, required: true },
                contentId: { type: Schema.Types.String, required: true }, // this id is used for concatenation of contents in different languages
            },
            { timestamps: true },
        );

        contentSchema.plugin(require('mongoose-autopopulate'));

        return mongoose.model(name, contentSchema);
    }
};

module.exports = getOrGenerateDynamicSchema;
