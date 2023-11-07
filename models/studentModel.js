const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  Ime: String,
  Prezime: String,
  Email: String,
  JMBAG: String,
  Korisnicko_ime: String,
  Lozinka: String,
  Naziv_studija: String,
  Oznaka: String,
  Prava: String
});

const Student = mongoose.model('Student', studentSchema, 'Studenti');

module.exports = Student;
