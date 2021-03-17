const express = require('express')
const { news, getNews, getTranslate } = require('../common/news')
const router = express.Router()

router.get('/weibo', async (req, res) => {
  if (news.isEmpty) {
    await getNews()
  }
  res.status(200).send({
    ok: 1,
    data: news.weibo
  })
})

router.get('/translate', async (req, res) => {
  const result = await getTranslate(req.query.words)
  res.status(200).json({
    code: 200,
    result: result
  })
})

module.exports = router
