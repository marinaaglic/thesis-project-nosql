const mongoose = require("mongoose");

const profesorSchema = new mongoose.Schema({
    Ime: String,
    Prezime: String,
    Zvanje: String,
    Korisnicko_ime: String,
    Lozinka: String,
    Kolegiji: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kolegij'
    }],
    Prava: String
  
});

const Profesor = mongoose.model('Profesor', profesorSchema, "Profesori");

module.exports = Profesor;
