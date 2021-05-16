const express = require('express')
const router = express.Router()

router.post('/info', async (req, res) => {
  const { userName, id, status } = req.token
  res.status(200).json({
    ok: 1,
    data: {
      userName,
      id,
      status
    }
  })
})

module.exports = router
