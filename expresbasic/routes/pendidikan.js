// pendidikan.js
var express = require('express');
var router = express.Router();
const Model_Pendidikan = require('../model/Model_Pendidikan');
const Model_Mahasiswa = require('../model/Model_Mahasiswa');

router.get('/', async function(req, res, next) {
    try {
        let pendidikanList = await Model_Pendidikan.getAllWithMahasiswa();
        res.render('pendidikan/index', {
            data: pendidikanList,
            message: req.flash('success') 
        });
    } catch (err) {
        res.render('error', { error: err, message: 'Terjadi kesalahan pada fungsi' });
    }
});

router.get('/create', async function(req, res, next) {
    try {
        let mahasiswaList = await Model_Mahasiswa.getAll();
        res.render('pendidikan/create', {
            mahasiswaList: mahasiswaList,
            nama_instansi: '',
            jurusan: '',
            tahun_masuk: '',
            tahun_lulus: '',
            nomor_ijazah: '',
            id_mahasiswa: ''
        });
    } catch (err) {
        res.render('error', { error: err });
    }
});

router.post('/store', async function(req, res, next) {
    try {
        let { nama_instansi, jurusan, tahun_masuk, tahun_lulus, nomor_ijazah, id_mahasiswa } = req.body;

        let data = {
            nama_instansi,
            jurusan,
            tahun_masuk,
            tahun_lulus,
            nomor_ijazah,
            id_mahasiswa
        };

        await Model_Pendidikan.store(data);

        req.flash('success', 'Data Pendidikan Berhasil Disimpan');
        res.redirect('/pendidikan');
    } catch (err) {
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.redirect('/pendidikan');
    }
});

router.get('/edit/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let row = await Model_Pendidikan.getById(id);
        let mahasiswaList = await Model_Mahasiswa.getAll();
        res.render('pendidikan/edit', {
            id: row[0].id_pendidikan,
            nama_instansi: row[0].nama_instansi,
            jurusan: row[0].jurusan,
            tahun_masuk: row[0].tahun_masuk,
            tahun_lulus: row[0].tahun_lulus,
            nomor_ijazah: row[0].nomor_ijazah,
            mahasiswaList: mahasiswaList,
            error: null
        });
    } catch (err) {
        console.error(err);
        res.render('error', { error: err });
    }
});


router.post('/update/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let { nama_instansi, jurusan, tahun_masuk, tahun_lulus, nomor_ijazah, id_mahasiswa } = req.body;
        let data = {
            nama_instansi,
            jurusan,
            tahun_masuk,
            tahun_lulus,
            nomor_ijazah,
        };
        await Model_Pendidikan.update(id, data);
        req.flash('success', 'Data Pendidikan Berhasil Diupdate');
        res.redirect('/pendidikan');
    } catch (err) {
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.redirect('/pendidikan');
    }
});

router.get('/delete/:id', async function(req, res) {
    try {
        let id = req.params.id;
        await Model_Pendidikan.delete(id);
        req.flash('success', 'Data Pendidikan Berhasil Dihapus');
        res.redirect('/pendidikan');
    } catch (err) {
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.redirect('/pendidikan');
    }
});

module.exports = router;
