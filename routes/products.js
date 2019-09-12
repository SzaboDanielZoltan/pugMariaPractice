const express = require('express');
const DB = require('../module/db');

const router = express.Router();

const db = new DB();

router.get('/', async (req, res) => {
  if (req.validToken) {
    const realData = await db.read();
    res.render('products', { products: realData });
  } else {
    res.redirect('/login');
  }
});

router.get('/:id', async (req, res) => {
  if (req.validToken) {
    const manufacturers = await db.getManufacturers();
    if (req.params.id === 'newproduct') {
      res.render('newproduct', { companies: manufacturers });
    }
    const realData = await db.read();
    const productObject = realData.filter(product => product.id == req.params.id)[0];
    res.render('details', {
      product: productObject,
      id: req.params.id,
      companies: manufacturers,
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/', async (req, res) => {
  const newProduct = req.body;
  await db.create(newProduct);
  res.redirect('/products');
});

router.post('/:id', async (req, res) => {
  const editedProduct = req.body;
  const editId = req.params.id;
  await db.update(editedProduct, parseInt(editId, 10));
  res.redirect('/products');
});

router.get('/delete/:id', async (req, res) => {
  if (req.validToken) {
    const deleteId = req.params.id;
    await db.delete(parseInt(deleteId, 10));
    res.redirect('/products');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
