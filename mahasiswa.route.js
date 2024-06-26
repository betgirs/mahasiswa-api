const router = require('express').Router();
const mongoose = require('mongoose');
const MahasiswaSchema = require('./mahasiswa.schema');


const mahasiswaModel = mongoose.model("Mahasiswa",MahasiswaSchema);

  // GET all mahasiswa or mahasiswa by nrp
router.get('/', async (req, res) => {
  try {
    const nrp = req.query.nrp; // Mengakses parameter nrp dari URL
    const id  = req.query.id;// Mengakses parameter id dari URL

    if (nrp) { // Jika nrp ada
      const mahasiswa = await mahasiswaModel.find({ nrp });
      if (!mahasiswa) {
        return res.status(404).json({ 
          status: false, 
          message: 'Mahasiswa not found' });
      }
      res.status(200).json({ 
        status: true, 
        data: mahasiswa });
    } else if(id){
      const mahasiswa = await mahasiswaModel.findOne({id});
      if (!mahasiswa) {
        return res.status(404).json({ 
          status: false, 
          message: 'Mahasiswa not found' });
      }
      res.status(200).json({ 
        status: true, 
        data: mahasiswa });
    }
    else { // Jika nrp tidak ada
      const mahasiswa = await mahasiswaModel.find();
      res.status(200).json({ 
        status: true, 
        data: mahasiswa });
    }
  } catch (error) {
    res.status(500).json({ 
      status: false, 
      message: error.message });
  }
});
  
  router.post('/', async (req, res) => {
    try {
      const { nrp, nama, email, jurusan } = req.body;
      const mahasiswa = new mahasiswaModel({ nrp, nama, email, jurusan });
      await mahasiswa.save();
      res.status(201).json({
        status: true,
        message: 'Data mahasiswa berhasil dibuat',
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message
      });
    }
  });

  

// Update mahasiswa by ID
router.put('/', async (req, res) => {
    try {
      const { id, nrp, nama, email, jurusan } = req.body;
      const mahasiswa = await mahasiswaModel.findOneAndUpdate(
        { id },
        { nrp, nama, email, jurusan },
        { new: true }
      );
      if (!mahasiswa) {
        return res.status(404).json({
          status: false,
          message: 'Mahasiswa not found'
        });
      }
      res.status(200).json({
        status: true,
        message: 'Data mahasiswa berhasil diperbarui',
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message
      });
    }
  });


router.delete('/', async (req, res) => {
    try {
      const { id } = req.body;
      const mahasiswa = await mahasiswaModel.findOneAndDelete({ id });
      if (!mahasiswa) {
        return res.status(404).json({
          status: false,
          message: 'Mahasiswa not found'
        });
      }
      res.status(200).json({
        status: true,
        message: 'Data mahasiswa berhasil dihapus',
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message
      });
    }
  });
  


  module.exports = router;