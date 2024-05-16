const mongoose = require('mongoose');


const MahasiswaSchema = new mongoose.Schema({ 
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