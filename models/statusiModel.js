const mongoose = require('mongoose');

const kolegijSchema = new mongoose.Schema({
  ISVU_kod: String,
  Kolegij: String
});

const studentSchema = new mongoose.Schema({
  Ime: String,
  Prezime: String,
  JMBAG: String
});

const statusSchema = new mongoose.Schema({
  Student: studentSchema,
  Datum: String,
  Postotak: Number,
  Bodovi: Number,
  Ocjena: Number,
  Ispit_Naziv: String,
  Kolegij: kolegijSchema
});

const Status = mongoose.model('Status', statusSchema, 'Statusi');

module.exports = Status;
