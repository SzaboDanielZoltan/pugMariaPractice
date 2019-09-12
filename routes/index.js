const express = require('express');
const DB = require('../module/db');

const router = express.Router();


router.get('/', (req, res) => {
  if (req.validToken) {
    res.render('index', { title: 'Express' });
  } else {
    res.redirect('/login');
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('uuid');
  res.redirect('/login');
});

module.exports = router;
