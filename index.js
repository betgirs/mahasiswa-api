
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mahasiswaRoute = require("./mahasiswa.route")

const app = express();
const PORT = process.env.PORT || 3000;



app.use(bodyParser.json())
/*
Handle alamat / , lalu kirimkan response hello world
*/
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

/*
Handle method POST dengan alamat /penjumlahan ,
lalu kirimkan response hasil penjumlahan
*/
app.post('/penjumlahan', (req, res)=> {
    res.json({result: req.body.a + req.body.b})
  })

// konek ke database
mongoose.connect(process.env.DBHOST);
const db = mongoose.connection;
db.on('error', (error) => {
console.log(error);
});
db.once('connected', () => {
console.log('Mongo berhasil terkoneksi');
})

app.use('/mahasiswa', mahasiswaRoute)

/*
Sediakan server pada localhost dengan port 3000
*/
app.listen(3000, () => {
    console.log('Server is listenin on PORT :' + PORT);
})