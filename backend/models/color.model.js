const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const ColorSchema = new mongoose.Schema({
    hex: {
        type: String,
        required: true
    },
    token: {
        type: Number,
        required: true
    },
    parent_id: {
        type: Schema.Types.ObjectId,
        ref: 'BaseColor',
        required: true
    }
});

const Color = mongoose.model("Color", ColorSchema);

module.exports = Color;