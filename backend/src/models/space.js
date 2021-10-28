const mongoose = require('mongoose');

const { Schema } = mongoose;

const spaceSchema = new Schema(
    {
        name: { type: String, required: true },
    },
    { timestamps: true },
);

module.exports = mongoose.model('space', spaceSchema);
