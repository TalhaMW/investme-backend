const express = require('express');
const { body, validationResult } = require('express-validator');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//
const User = require('../../Models/User');

const route = express.Router();

//
const extractUser = (data) => ({ name, email, password } = data);
const hashPassword = async (password, rounds) => {
  const salt = await bcrypt.genSalt(rounds);
  return await bcrypt.hash(password, salt);
};
//
//
const validationChecks = [
  body('email', 'Invalid Email').isEmail(),
  body('password', 'Please enter password of atleast 6 words').isLength({
    min: 6,
  }),
];
//

async function addUser(req, res) {
  console.log(req.body);
  extractUser(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    console.log(errors.array()[0]);
    throw new Error(JSON.stringify(errors.array()));
  }

  const user = await User.findOne({ email });
  if (!user) {
    const encryptedPass = await hashPassword(password, 10);
    const createdUser = await User.create({
      name,
      email,
      password: encryptedPass,
    });

    jwt.sign(
      { id: createdUser.id, name: createdUser.name },
      'Glorius Goal',
      (error, token) => {
        if (error) throw new Error(error);
        res.status(200).json(token);
      }
    );
    return;
  }
  res.status(400);
  throw new Error('User Already Registered');
}
//

// Type: POST /auth/register
// @access public
// /api/auth
// for Register  user

route.post('/register', validationChecks, expressAsyncHandler(addUser));

// Type: POST /auth/login
// @access public
// /api/auths
// for Login User

async function loginUser(req, res) {
  console.log(req.body);
  extractUser(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    console.log(errors.array()[0]);
    throw new Error(JSON.stringify(errors.array()));
  }

  const user = await User.findOne({ email });
  const passwordMatch = user
    ? await bcrypt.compare(password, user.password)
    : false;

  console.log(user);
  console.log(password);

  if (!user || !passwordMatch) {
    return res.status(404).json("user does'nt exist");
  }

  jwt.sign({ id: user.id, name: user.name }, 'Glorius Goal', (error, token) => {
    if (error) throw new Error(error);
    res.status(200).json(`user is sign in successfully with token ${token}`);
  });
  return;
}

route.post('/login', validationChecks, expressAsyncHandler(loginUser));

module.exports = route;
