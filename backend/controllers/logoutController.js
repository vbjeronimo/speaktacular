const jwtCookieOptions = require('../config/jwtCookieOptions');
const handleError = require('../utils/handleError');
const User = require('../models/User');

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  try {
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie('jwt', jwtCookieOptions);
      return res.sendStatus(204);
    }

    user.refreshToken = '';
    await user.save();

    res.clearCookie('jwt', jwtCookieOptions);
    res.sendStatus(204);

  } catch (err) {
    return handleError(err, res);
  }
}

module.exports = {  handleLogout }
