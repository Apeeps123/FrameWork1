const connection = require('../config/database');

class Model_Pendidikan {

    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Pendidikan', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async store(data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO Pendidikan SET ?', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Pendidikan WHERE id_pendidikan = ?', id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE Pendidikan SET ? WHERE id_pendidikan = ?', [data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM Pendidikan WHERE id_pendidikan = ?', id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async getAllWithMahasiswa() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT p.*, m.nama_depan, m.nama_belakang
                FROM pendidikan p
                JOIN mahasiswa m ON p.id_mahasiswa = m.id_mahasiswa
            `;
            connection.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
}

module.exports = Model_Pendidikan;
