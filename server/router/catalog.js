const express = require('express')
const userModel = require('../model/user')
const blogModel = require('../model/blog')
const router = express.Router()

// 获取目录外的文章
router.get('/out', async (req, res) => {
  const { token } = req
  const data = await blogModel.find(
    { user_id: token.id, in_catalog: false },
    { title: 1, _id: 1, type: 1 }
  )
  res.status(200).json({
    ok: 1,
    data: data.map(item => {
      return {
        blog: item,
        children: [],
        isOpen: true
      }
    })
  })
})

// 获取目录内的文章
router.get('/in', async (req, res) => {
  const { token } = req
  const { catalog } = await userModel.findById(token.id)
  const isOpen = req.query.open === 'true' ? true : false
  async function populate(arr) {
    const tempArr = []
    for (let item of arr) {
      const tempObj = {}
      tempObj.blog = await blogModel.findById(item.blog, {
        title: 1,
        _id: 1,
        type: 1
      })
      tempObj.isOpen = isOpen
      tempObj.children = item.children.length
        ? await populate(item.children)
        : item.children
      tempArr.push(tempObj)
    }
    return tempArr
  }

  res.status(200).json({
    ok: 1,
    data: await populate(catalog)
  })
})

// 修改文章是否在目录
router.post('/status', async (req, res) => {
  const { token } = req
  const { ids, status } = req.body
  await blogModel.updateMany(
    { user_id: token.id, _id: { $in: ids } },
    { in_catalog: status }
  )
  res.status(200).json({
    ok: 1,
    message: '添加成功'
  })
})

// 保存目录
router.post('/sort', async (req, res) => {
  const { token } = req
  const { catalog } = req.body
  await userModel.updateOne({ _id: token.id }, { catalog })
  res.status(200).json({
    ok: 1,
    message: '排序成功'
  })
})

module.exports = router
