const express = require('express');
const UserService = require('../module/user');

const router = express.Router();

const us = new UserService();

const getToken = (l = 20) => {
  let result = '';
  for (let i = 0; i < l; i++) {
    const index = Math.round(Math.random() * 50 + 65);
    result += String.fromCharCode(index);
  }
  return result;
};

/* GET home page. */
router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const result = await us.login(req.body);
  if (result.length === 0) {
    res.render('login', { login: true });
  } else {
    const newToken = getToken();
    us.updateToken(req.body, newToken);
    res.cookie('uuid', newToken);
    res.redirect('/products');
  }
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  us.newUser(req.body);
  res.redirect('/products');
});

module.exports = router;
