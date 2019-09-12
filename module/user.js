const mariadb = require('mariadb');

const pool = mariadb.createPool({
  database: 'shop', user: 'root', password: 'root', connectionLimit: 5,
});

module.exports = class UserService {
  constructor() {
    pool.getConnection().then(
      conn => this.conn = conn,
    );
  }

  async login(user) {
    const sql = `
    SELECT * FROM users
    WHERE email = '${user.email}' AND password = SHA1('${user.password}');
    `;
    const result = await this.conn.query(sql);
    return result;
  }

  async getUserByToken(token) {
    const sql = `
    SELECT * FROM users
    WHERE token = '${token}'
    `;
    const result = await this.conn.query(sql);
    return result;
  }

  async updateToken(user, token) {
    const sql = `
    UPDATE users
    SET token = '${token}'
    WHERE email = '${user.email}' AND password = SHA1('${user.password}');
    `;
    const result = await this.conn.query(sql);
    return result;
  }

  async newUser(user) {
    const sql = `
    INSERT INTO users
    (name, email, password, token)
    VALUES
      ('${user.name}', '${user.email}', SHA1('${user.password}'), 1);
    `;
    const result = await this.conn.query(sql);
    return result;
  }

  async getAllToken() {
    const sql = `
    SELECT token FROM users;
    `;
    const result = await this.conn.query(sql);
    return result;
  }
};
