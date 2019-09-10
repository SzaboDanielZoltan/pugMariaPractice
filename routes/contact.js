const express = require('express');

const DB = require('../module/db');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('contact');
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
