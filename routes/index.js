const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/logout', (req, res) => {
  res.clearCookie('uuid');
  res.redirect('/login');
});

module.exports = router;
