const bcrypt = require('bcrypt');
const express = require('express');

const User = require('../models/User');

const handleNewUser = async (req, res) => {
  const { emailAddress, username, password } = req.body;

  User.findOne({ emailAddress: emailAddress }, function (err, user) {
    if (err) return res.status(500).json({ "message": err.message })
    if (user) return res.status(409).json({ "message": `An account already exists with the email address "${emailAddress}"` })
  });
  User.findOne({ username: username }, function (err, user) {
    if (err) return res.status(500).json({ "message": err.message })
    if (user) return res.status(409).json({ "message": `An account already exists with username "${username}"` })
  });

  const hashedPassword = await bcrypt.hash(password, 10);
  User.create({
    "emailAddress": emailAddress,
    "username": username,
    "password": hashedPassword
  },
  function (err, newUser) {
    if (err) return res.status(500).json({ "message": err.message })
    return res.status(201).json({ "success": `Account ${username} created` })
  });
}

module.exports = { handleNewUser }
