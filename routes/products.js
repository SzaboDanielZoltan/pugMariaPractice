const express = require('express');
const DB = require('../module/db');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const db = new DB();
  db.mockData(0).then(
    jsonArray => res.render('products', { products: jsonArray }),
  );
});

router.get('/:id', (req, res) => {
  const productID = parseInt(req.params.id, 10);
  const db = new DB();
  db.mockData(productID).then(
    productObject => res.render('details', { product: productObject }),
  );
});

module.exports = router;
