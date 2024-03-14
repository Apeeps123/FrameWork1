const connection = require('../config/database');

class Model_Keahlian {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Keahlian', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM Keahlian WHERE id_keahlian = ?', [id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]);
        }
      });
    });
  }

  static async create(data) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO keahlian SET ?', data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async update(id, data) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE Keahlian SET ? WHERE id_keahlian = ?', [data, id], (err, result) => {
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
      connection.query('DELETE FROM Keahlian WHERE id_keahlian = ?', [id], (err, result) => {
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
        SELECT keahlian.*, mahasiswa.nama_depan, mahasiswa.nama_belakang
        FROM keahlian
        INNER JOIN mahasiswa ON keahlian.id_mahasiswa = mahasiswa.id_mahasiswa
        ORDER BY keahlian.id_keahlian DESC
      `;

      connection.query(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = Model_Keahlian;
