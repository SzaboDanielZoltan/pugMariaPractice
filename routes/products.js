const express = require('express');
const DB = require('../module/db');

const router = express.Router();

const db = new DB();

router.get('/', async (req, res) => {
  const realData = await db.read();
  res.render('products', { products: realData });
});

router.get('/:id', async (req, res) => {
  const realData = await db.read();
  const productObject = realData.filter(product => product.id == req.params.id)[0];
  res.render('details', { product: productObject });
});

module.exports = router;
