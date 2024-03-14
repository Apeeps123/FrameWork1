var express = require('express');
var router = express.Router();
const Model_Mahasiswa = require('../model/Model_Mahasiswa');

router.get('/', async function(req, res, next) {
    try {
        let rows = await Model_Mahasiswa.getAll();
        res.render('mahasiswa/index', {
            data: rows
        });
    } catch (error) {
        console.error(error);
        res.render('error', { error });
    }
});

router.get('/create', function(req, res, next) {
    res.render('mahasiswa/create', {
        nrp: '',
        nama_depan: '',
        nama_belakang: '',
        jenis_kelamin: '',
        agama: '',
        umur: '',
        tinggi_badan: '',
        gol_darah: '',
        alamat: '',
        hobi: '',
        email: '',
        no_telepon: ''
    });
});

router.post('/store', async function(req, res, next) {
    try {
        let {
            nrp,
            nama_depan,
            nama_belakang,
            jenis_kelamin,
            agama,
            umur,
            tinggi_badan,
            gol_darah,
            alamat,
            hobi,
            email,
            no_telepon
        } = req.body;

        let data = {
            nrp,
            nama_depan,
            nama_belakang,
            jenis_kelamin,
            agama,
            umur,
            tinggi_badan,
            gol_darah,
            alamat,
            hobi,
            email,
            no_telepon
        };

        await Model_Mahasiswa.store(data);
        req.flash("success", "Data Berhasil Disimpan");
        res.redirect("/mahasiswa");
    } catch (error) {
        console.error(error);
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.redirect('/mahasiswa');
    }
});

router.get('/edit/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        console.log('Edit ID:', id); // Log ID for debugging
        let rows = await Model_Mahasiswa.getById(id);

        if (rows && rows.length > 0) {
            res.render('mahasiswa/edit', {
                id: rows[0].id_mahasiswa,
                nrp: rows[0].nrp,
                nama_depan: rows[0].nama_depan,
                nama_belakang: rows[0].nama_belakang,
                jenis_kelamin: rows[0].jenis_kelamin,
                agama: rows[0].agama,
                umur: rows[0].umur,
                tinggi_badan: rows[0].tinggi_badan,
                gol_darah: rows[0].gol_darah,
                alamat: rows[0].alamat,
                hobi: rows[0].hobi,
                email: rows[0].email,
                no_telepon: rows[0].no_telepon
            });
        } else {
            req.flash('error', 'Data not found');
            res.redirect('/mahasiswa');
        }
    } catch (error) {
        console.error(error);
        res.render('error', { error });
    }
});


router.post('/update/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        console.log('Update ID:', id);

        let {
            nrp,
            nama_depan,
            nama_belakang,
            jenis_kelamin,
            agama,
            umur,
            tinggi_badan,
            gol_darah,
            alamat,
            hobi,
            email,
            no_telepon
        } = req.body;
        console.log('Update Data (req.body):', req.body);

        let data = {
            nrp,
            nama_depan,
            nama_belakang,
            jenis_kelamin,
            agama,
            umur,
            tinggi_badan,
            gol_darah,
            alamat,
            hobi,
            email,
            no_telepon
        };

        console.log('Data to be updated:', data);

        // Log the result of the update method
        let updateResult = await Model_Mahasiswa.update(id, data);
        console.log('Update Result:', updateResult);

        req.flash('success', 'Data berhasil diupdate!');
        res.redirect('/mahasiswa');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.redirect('/mahasiswa');
    }
});

router.get('/delete/:id', async function(req, res) {
    try {
        let id = req.params.id;
        await Model_Mahasiswa.delete(id);
        req.flash('success', 'Data berhasil dihapus');
        res.redirect('/mahasiswa');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.redirect('/mahasiswa');
    }
});

module.exports = router;
