const express = require('express')
const router = express.Router()

router.post('/info', async (req, res) => {
  const { userName, id } = req.token
  res.status(200).json({
    ok: 1,
    data: {
      userName,
      id
    }
  })
})

module.exports = router
