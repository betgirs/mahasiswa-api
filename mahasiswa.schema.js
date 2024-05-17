const mongoose = require('mongoose');

const uuid = require('uuid');
const MahasiswaSchema = new mongoose.Schema({ 
  id: { 
    type: String, 
    required: true, 
    unique: true, 
    default: uuid.v4 },
  nrp: {
    type: String,
    unique: true,
    required: true
  },
  nama: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  jurusan: {
    type: String,
    required: true
  }
});
module.exports = MahasiswaSchema;