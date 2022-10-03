const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');

const handleError = require('../utils/handleError');
const User = require('../models/User');
const { create } = require('../models/PracticeText');

const handleLogin = async (req, res) => {
  const { emailAddress, password } = req.body;
  if (!emailAddress || !password) {
    return res.status(400).json({ "message": "Email address and password are required to login" });
  }

  try {
    const user = await User.findOne({ emailAddress: emailAddress });
    if (!user) {
      return res.status(400).json({ "message": `User with email address ${emailAddress} not found` });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.sendStatus(401);
    }

    const { accessToken, refreshToken } = createAuthTokensForUser(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.json(accessToken);

  } catch (err) {
    return handleError(err, res);
  }
}

const createAuthTokensForUser = (user) => {
  const tokens = {};

  tokens.accessToken = jwt.sign(
    { "username": user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '5m' }
  );
  tokens.refreshToken = jwt.sign(
    { "username": user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );

  return tokens;
}

module.exports = { handleLogin}
