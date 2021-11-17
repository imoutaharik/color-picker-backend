const mongoose = require("mongoose");

const BaseColorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Well, you need to give it a name!']
    }
});

const BaseColor = mongoose.model("BaseColor", BaseColorSchema);

module.exports = BaseColor;