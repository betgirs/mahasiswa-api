const router = require('express').Router();
const mongoose = require('mongoose');
const MahasiswaSchema = require('./mahasiswa.schema');

const mahasiswaModel = mongoose.model("Mahasiswa",MahasiswaSchema);

  router.get('/', async (req, res) => {
    const nrp = req.query.nrp; // Mendapatkan parameter kueri nrp
    try {
      if (nrp) {
        const mahasiswa = await mahasiswaModel.findOne({ nrp: nrp });
        if (!mahasiswa) {
          return res.status(404).json({
            status: false,
            message: 'Mahasiswa not found'
          });
        }
        return res.status(200).json({  
          mahasiswa
        });
      } else {
        const mahasiswa = await mahasiswaModel.find();
        return res.status(200).json({
          data: mahasiswa
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message
      });
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
      const mahasiswa = await mahasiswaModel.findByIdAndUpdate(
        id,
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
      const { id } = req.query;
      const mahasiswa = await mahasiswaModel.findByIdAndDelete(id);
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