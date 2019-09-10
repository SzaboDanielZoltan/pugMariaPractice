const path = require('path');
const fs = require('fs');

module.exports = class DB {
  constructor() {

  }

  mockData(id = 0) {
    if (id === 0) {
      return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, 'products.json');
        fs.readFile(filePath, 'utf8', (err, content) => {
          if (err) {
            return reject(err);
          }
          resolve(JSON.parse(content));
        });
      });
    }
    return new Promise((resolve, reject) => {
      const filePath = path.join(__dirname, 'products.json');
      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
          return reject(err);
        }
        const jsonArray = JSON.parse(content);
        const productObject = jsonArray.filter(product => product.id === id)[0];
        resolve(productObject);
      });
    });
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
};
