const express = require('express')
const fs = require('fs')
const formidable = require('formidable')
const userModel = require('../model/user')
const blogModel = require('../model/blog')
const router = express.Router()

// 查询列表
router.get('/', async (req, res) => {
  const { token, query } = req
  const { pageSize, currentPage, tag, ...queryFilter } = query
  const filters = {
    user_id: token.id,
    type: 'DOC',
    ...queryFilter
  }
  if (tag) {
    filters.tags = { $elemMatch: { $eq: tag } }
  }
  const blogs = await blogModel
    .find(filters, { in_catalog: 0 })
    .sort({ create_time: -1 })
    .skip((currentPage - 1) * pageSize)
    .limit(Number(pageSize))
  const total = await blogModel.find(filters).countDocuments()
  res.status(200).json({
    ok: 1,
    data: blogs,
    total
  })
})

// 查询具体文章
router.get('/one/:id', async (req, res) => {
  const { id } = req.params
  const blog = await blogModel.findById(id)
  const prev = await blogModel
    .find(
      {
        user_id: blog.user_id,
        _id: { $gt: id }
      },
      {
        _id: 1,
        title: 1
      }
    )
    .sort({ _id: 1 })
    .limit(1)
  const next = await blogModel
    .find(
      {
        user_id: blog.user_id,
        _id: { $lt: id }
      },
      {
        _id: 1,
        title: 1
      }
    )
    .sort({ _id: -1 })
    .limit(1)
  res.status(200).json({
    ok: 1,
    data: {
      blog,
      next: next[0],
      prev: prev[0]
    }
  })
})

// 获取所有标签
router.get('/tags', async (req, res) => {
  const { token } = req
  const result = []
  const all = await blogModel.find(
    { user_id: token.id, type: 'DOC' },
    { tags: 1 }
  )
  all.forEach(i => {
    i.tags.forEach(j => {
      const c = result.find(t => t.name === j)
      if (c) {
        c.value++
      } else {
        result.push({ name: j, value: 1 })
      }
    })
  })
  result.sort((a, b) => b.value - a.value)
  res.status(200).json({
    ok: 1,
    data: result
  })
})

// 新增
router.post('/create', async (req, res) => {
  const { token } = req
  const blog = await blogModel.create({
    ...req.body,
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
  const { _id } = req.body
  const catalog = (await userModel.findById(token.id)).catalog
  await tree(catalog)
  await blogModel.deleteOne({ _id: _id, user_id: token.id })
  res.status(200).json({
    ok: 1,
    message: '删除成功'
  })

  // 将目录中的子级移出目录
  async function tree(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (String(arr[i].blog) === _id) {
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

// 更新
router.post('/update', async (req, res) => {
  const { _id, info } = req.body
  const data = await blogModel.updateOne(
    { _id },
    { ...info, update_time: new Date() },
    { new: true }
  )
  res.status(200).json({
    ok: 1,
    msg: '更新成功',
    data
  })
})

// 读文件
router.post('/read', async (req, res) => {
  const form = new formidable.IncomingForm()
  form.uploadDir = './temp'
  form.keepExtensions = true
  form.parse(req)
  form.on('file', (name, file) => {
    fs.readFile(file.path, (err, data) => {
      if (!err) {
        res.status(200).json({
          ok: 1,
          data: data.toString()
        })
        fs.unlink(file.path, function (err) {
          if (err) throw err
        })
      }
    })
  })
})

// 判断标题是否重复
router.post('/test', (req, res) => {
  const { token } = req
  const { title } = req.body
  blogModel.findOne({ user_id: token.id, title }, (err, doc) => {
    if (doc) {
      res.status(200).json({
        ok: 0,
        message: '标题重复'
      })
    } else {
      res.status(200).json({
        ok: 1,
        message: '标题可用'
      })
    }
  })
})

// 获取样式
router.get('/style', async (req, res) => {
  const { token } = req
  const style = fs.readFileSync('./common/blog-style.css')
  res.status(200).json({
    ok: 1,
    data: style.toString()
  })
})

module.exports = router
