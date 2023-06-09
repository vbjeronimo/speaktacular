const bcrypt = require('bcrypt');
const express = require('express');

const User = require('../models/User');

const handleNewUser = async (req, res) => {
  try {
    const { emailAddress, username, password } = req.body;

    let user = await User.findOne({ emailAddress });
    if (user) {
      return res.status(409).json({ "message": `An account already exists with the email address "${emailAddress}"` })
    }
    user = await User.findOne({ username });
    if (user) {
      return res.status(409).json({ "message": `An account already exists with username "${username}"` })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    User.create({
      "emailAddress": emailAddress,
      "username": username,
      "password": hashedPassword
    });

    return res.status(201).json({ "success": `Account ${username} created` })
  } catch (err) {
    return res.status(500).json({ "message": err.message })
  }
}

module.exports = { handleNewUser }
