const express = require('express');
const DB = require('../module/db');

const router = express.Router();


router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
