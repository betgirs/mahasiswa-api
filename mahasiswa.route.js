const router = require('express').Router();
const mongoose = require('mongoose');
const MahasiswaSchema = require('./mahasiswa.schema');

const mahasiswaModel = mongoose.model("Mahasiswa",MahasiswaSchema);

router.get('/', async (req,res)=>{
    try{
        const mahasiswa = await mahasiswaModel.find();
        res.status(200).json(mahasiswa);
    }catch(eror){
        res.status(500).json({
            message: error.message
        });
    }
  
});

router.get('/', async (req,res)=>{
    try{
        const mahasiswa = await mahasiswaModel.findOne(req.body.nrp, req.body);
        if (!mahasiswa) {
            return res.status(404).json({ message: 'Mahasiswa not found' });
        }
        res.status(200).json({
            message: 'Data mahasiswa ditemukan',
            mahasiswa
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
  
});

router.post('/', async (req, res) => {
    try {
        const mahasiswa = await mahasiswaModel.create(req.body);
        res.status(201).json({
            message: 'Data mahasiswa berhasil dibuat',
            mahasiswa
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Update mahasiswa by ID
router.put('/:id', async (req, res) => {
    try {
        const mahasiswa = await mahasiswaModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!mahasiswa) {
            return res.status(404).json({ message: 'Mahasiswa not found' });
        }
        res.status(200).json({
            message: 'Data mahasiswa berhasil diperbarui',
            mahasiswa
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Delete mahasiswa by ID
// router.delete('/', async (req, res) => {
//     try {
//         const mahasiswa = await mahasiswaModel.findByIdAndDelete(req.params.id);
//         if (!mahasiswa) {
//             return res.status(404).json({ message: 'Mahasiswa not found' });
//         }
//         res.status(200).json({
//             message: 'Data mahasiswa berhasil dihapus',
//             mahasiswa
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// });
// Delete mahasiswa by ID from URL parameter
router.delete('/:id', async (req, res) => {
    try {
        const mahasiswa = await mahasiswaModel.findByIdAndDelete(req.params.id);
        if (!mahasiswa) {
            return res.status(404).json({ message: 'Mahasiswa not found' });
        }
        res.status(200).json({
            message: 'Data mahasiswa berhasil dihapus',
            mahasiswa
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


  module.exports = router;