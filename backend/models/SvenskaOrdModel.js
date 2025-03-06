const mongoose = require('mongoose');

const svenskaOrdSchema = new mongoose.Schema({
    swedish: {
        type: String,
        required: true
    },
    english: {
        type: String,
        required: true
    },
    example: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SvenskaOrd', svenskaOrdSchema);