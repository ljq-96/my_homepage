const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.headers.authorization
  req.token = token ? jwt.verify(token, 'quaint') : {}
  next()
}
