const express = require('express')
const userModel = require('../model/user')
const blogModel = require('../model/blog')
const router = express.Router()

// 查询列表
router.get('/', async (req, res) => {
  const { token, query } = req
  const { pagesize, pagenumber, tag } = query
  delete query.pagenumber
  delete query.pagesize
  delete query.tag
  const filters = {
    user_id: token.id,
    type: 'DOC',
    ...query
  }
  if (tag) {
    filters.tags = { $elemMatch: { $eq: tag } }
  }
  const blogs = await blogModel
    .find(filters, { content: 0, in_catalog: 0 })
    .sort({ create_time: -1 })
    .skip((pagenumber - 1) * pagesize)
    .limit(Number(pagesize))
  res.status(200).json({
    ok: 1,
    data: blogs
  })
})

router.get('/tags', async (req, res) => {
  const { token } = req
  const result = []
  const all = await blogModel.find(
    { user_id: token.id, type: 'DOC' },
    { tags: 1 }
  )
  all.forEach(i => {
    i.tags.forEach(j => {
      
      result.j = result.j
    })
  })
})

// 新增
router.post('/create', async (req, res) => {
  const { token } = req
  const { title, tags, content, truncate, type, in_catalog } = req.body
  const blog = await blogModel.create({
    title,
    tags,
    content,
    truncate,
    type,
    in_catalog,
    user_id: token.id
  })
  res.status(200).json({
    ok: 1,
    data: blog
  })
})

// 删除
router.post('/delete', async (req, res) => {
  const { token } = req
  const { id } = req.body
  const catalog = (await userModel.findById(token.id)).catalog
  await tree(catalog)
  await blogModel.deleteOne({ _id: id, user_id: token.id })
  res.status(200).json({
    ok: 1,
    message: '删除成功'
  })

  // 将目录中的子级移出目录
  async function tree(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (String(arr[i].blog) === id) {
        const current = JSON.stringify(arr[i].children)
        const reg = /"blog":"(.*?)"/g
        let temp
        while ((temp = reg.exec(current)) !== null) {
          await blogModel.updateOne({ _id: temp[1] }, { in_catalog: false })
        }
        arr.splice(i, 1)
        await userModel.updateOne({ _id: token.id }, { catalog })
      }
      if (arr[i].children.length) {
        await tree(arr[i].children)
      }
    }
  }
})

module.exports = router
