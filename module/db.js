const path = require('path');
const fs = require('fs');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  database: 'shop', user: 'root', password: 'root', connectionLimit: 5,
});

module.exports = class DB {
  constructor() {
    pool.getConnection().then(
      conn => this.conn = conn,
    );
  }

  postOpinionsToJson(req, res) {
    return new Promise((resolve, reject) => {
      const opinion = req.body;
      const opinionPath = path.join(__dirname, 'opinions.json');
      fs.readFile(opinionPath, 'utf8', (err, opinions) => {
        if (err) {
          return err;
        }
        const opinionArray = JSON.parse(opinions);
        opinionArray.push(opinion);
        fs.writeFile(opinionPath, JSON.stringify(opinionArray, null, 2), 'utf8', (error) => {
          if (error) {
            reject(false);
          }
          resolve(true);
        });
      });
    });
  }

  async read() {
    const sql = `
    SELECT p.id, p.name, p.price, p.stock, m.name AS manufacturer, p.active, p.insdate
      FROM products AS p
        INNER JOIN manufacturers AS m ON p.maufacturer = m.id;`;
    const result = await this.conn.query(sql);
    return result;
  }
};
