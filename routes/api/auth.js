const express = require('express');

const route = express.Router();

// Type: POST /auth/register
// @access public
// /api/auth
// for Register

route.get('/register', (req, res) => {
  res.json('User Routes up and working Register');
});

// Type: POST /auth/login
// @access public
// /api/auth
// for Login

route.get('/login', (req, res) => {
  res.json('User Routes up and working Login');
});

module.exports = route;
