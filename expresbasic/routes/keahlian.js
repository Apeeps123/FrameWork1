var express = require('express');
var router = express.Router();
var connection = require('../config/database.js');
const Model_Keahlian = require('../model/Model_Keahlian');
const Model_Mahasiswa = require('../model/Model_Mahasiswa');


router.get('/', async function(req, res, next) {
    try {
      let keahlianList = await Model_Keahlian.getAllWithMahasiswa();
      res.render('keahlian/index', {
        data: keahlianList,
        message: req.flash('success') 
      });
    } catch (err) {
      res.render('error', { error: err, message: 'Terjadi kesalahan pada fungsi' });
    }
  });

router.get('/create', async function(req, res, next) {
    try {
      let mahasiswaList = await Model_Mahasiswa.getAll();
  
      res.render('keahlian/create', {
        mahasiswaList: mahasiswaList,
        nama_keahlian: '',
        tingkat_keahlian: ''
      });
    } catch (err) {
      res.render('error', { error: err });
    }
  });
  
  // Menyimpan data keahlian baru
  router.post('/store', async function(req, res, next) {
    try {
      let { nama_keahlian, tingkat_keahlian, id_mahasiswa } = req.body;
      let data = {
        nama_keahlian,
        tingkat_keahlian,
        id_mahasiswa
      };
      await Model_Keahlian.create(data);
      req.flash('success', 'Data Keahlian Berhasil Disimpan');
      res.redirect('/keahlian');
    } catch (err) {
      req.flash('error', 'Terjadi kesalahan pada fungsi');
      res.redirect('/keahlian');
    }
  });

// Menampilkan form edit keahlian
router.get('/edit/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let row = await Model_Keahlian.getById(id);
    res.render('keahlian/edit', {
      id: row.id_keahlian,
      nama_keahlian: row.nama_keahlian,
      tingkat_keahlian: row.tingkat_keahlian
    });
  } catch (err) {
    res.render('error', { error: err });
  }
});

// Menyimpan perubahan pada keahlian
router.post('/update/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let { nama_keahlian, tingkat_keahlian } = req.body;
    let data = {
      nama_keahlian,
      tingkat_keahlian
    };
    await Model_Keahlian.update(id, data);
    req.flash('success', 'Data Keahlian Berhasil Diupdate');
    res.redirect('/keahlian');
  } catch (err) {
    req.flash('error', 'Terjadi kesalahan pada fungsi');
    res.redirect('/keahlian');
  }
});

// Menghapus data keahlian
router.get('/delete/:id', async function(req, res) {
  try {
    let id = req.params.id;
    await Model_Keahlian.delete(id);
    req.flash('success', 'Data Keahlian Berhasil Dihapus');
    res.redirect('/keahlian');
  } catch (err) {
    req.flash('error', 'Terjadi kesalahan pada fungsi');
    res.redirect('/keahlian');
  }
});

module.exports = router;
