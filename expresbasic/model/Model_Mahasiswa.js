const connection = require('../config/database');

class Model_Mahasiswa {

    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Mahasiswa', (err, rows) => {
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
            connection.query('INSERT INTO Mahasiswa SET ?', data, (err, result) => {
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
            connection.query('SELECT * FROM Mahasiswa WHERE id_mahasiswa = ?', id, (err, rows) => {
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
            connection.query('UPDATE Mahasiswa SET ? WHERE id_mahasiswa = ?', [data, id], (err, result) => {
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
            connection.query('DELETE FROM Mahasiswa WHERE id_mahasiswa = ?', id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_Mahasiswa;
