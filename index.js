
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mahasiswaRoute = require("./mahasiswa.route")

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json())
/*
Handle alamat / , lalu kirimkan response hello world
*/
app.get("/", (req, res) => {
  res.json({ 
    message: "Hello world",
    note:"Untuk melihat mahasiswa lihat https://mahasiswa-api.vercel.app/mahasiswa"});
});


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