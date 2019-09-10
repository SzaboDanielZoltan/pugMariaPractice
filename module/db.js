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
    SELECT p.id, p.name, p.price, p.stock, p.manufacturer, m.name AS company, p.active, p.insdate
      FROM products AS p
        INNER JOIN manufacturers AS m ON p.manufacturer = m.id;`;
    const result = await this.conn.query(sql);
    console.log(result);
    return result;
  }

  async create(product) {
    const sql = `
    INSERT INTO products
      (name, price, manufacturer, stock, active)
    VALUES
      ('${product.name}', ${product.price}, ${product.manufacturer}, ${product.stock}, 1);
    `;
    const result = await this.conn.query(sql);
    return result;
  }

  async update(product, id) {
    const sql = `
    UPDATE products
      SET
      name='${product.name}',
      price=${product.price},
      manufacturer=${product.manufacturer},
      stock=${product.stock},
      active=${product.active}
    WHERE id=${id};
    `;
    const result = await this.conn.query(sql);
    return result;
  }

  async delete(id) {
    const sql = `
    DELETE FROM products
    WHERE id=${id};
    `;
    const result = await this.conn.query(sql);
    return result;
  }
};
