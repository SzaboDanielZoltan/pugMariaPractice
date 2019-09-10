const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('contact');
});

router.post('/', (req, res) => {
  const opinion = req.body;
  const opinionPath = path.join(__dirname, '../module/opinions.json');
  fs.readFile(opinionPath, 'utf8', (err, opinions) => {
    if (err) {
      return err;
    }
    const opinionArray = JSON.parse(opinions);
    opinionArray.push(opinion);
    fs.writeFile(opinionPath, JSON.stringify(opinionArray, null, 2), 'utf8', (error) => {
      if (error) {
        return error;
      }
      res.render('contact', { datasent: true });
    });
  });
});


module.exports = router;
