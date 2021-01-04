const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.headers.authorization
  if (token) {
    req.token = jwt.verify(token, 'quaint')
  }
  next()
}
