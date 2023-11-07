const mongoose = require("mongoose");

const kolegijSchema = new mongoose.Schema({
    Naziv: String,
    Kratica: String,
    ISVU_kod: Number
});

const Kolegij = mongoose.model('Kolegij', kolegijSchema, "Kolegiji");

module.exports = Kolegij;