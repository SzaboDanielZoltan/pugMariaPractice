const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if (req.validToken) {
    res.render('about', { title: 'Express' });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
