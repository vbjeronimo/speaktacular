const jwt = require('jsonwebtoken');

const handleError = require('../utils/handleError');
const User = require('../models/User');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  try {
    const user = await User.findOne({ refreshToken });
    if (!user) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, tokenData) => {
        if (err || user.username !== tokenData.username) return res.sendStatus(403);
        const accessToken = jwt.sign(
          { "username": tokenData.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '15m' }
        );
        res.json({ accessToken });
      }
    )
  } catch (err) {
    return handleError(err, res);
  }
}

module.exports = { handleRefreshToken }
