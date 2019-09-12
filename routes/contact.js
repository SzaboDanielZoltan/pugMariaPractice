const express = require('express');

const DB = require('../module/db');

const router = express.Router();


router.get('/', (req, res) => {
  if (req.validToken) {
    res.render('contact');
  } else {
    res.redirect('/login');
  }
});

router.post('/', async (req, res) => {
  const db = new DB();
  const written = await db.postOpinionsToJson(req, res);
  if (written) {
    res.render('contact', { datasent: true });
  } else {
    res.render('contact');
  }
});


module.exports = router;
