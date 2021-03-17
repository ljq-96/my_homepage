const express = require('express')
const userModel = require('../model/user')
const bookmarkModel = require('../model/bookmark')
const router = express.Router()

// bookmarkModel
//   .updateMany({}, { $unset: { prev_id: 1, next_id: 1 } })
//   .then(res => {
//     console.log(res)
//   })

// 获取书签
router.get('/', async (req, res) => {
  const { token } = req
  const result = await userModel
    .findById(token.id)
    .populate(['bookmarks', 'bookmark'])
  res.status(200).json({
    ok: 1,
    data: result ? result.bookmarks : []
  })
})

// 修改或新增书签
router.post('/update', async (req, res) => {
  const { token } = req
  const { id, info } = req.body
  let bookmark
  if (id) {
    bookmark = await bookmarkModel.findOneAndUpdate(
      { _id: id, user_id: token.id },
      info,
      { new: true }
    )
  } else {
    bookmark = await bookmarkModel.create({ ...info, user_id: token.id })
    await userModel.updateOne(
      { _id: token.id },
      { $addToSet: { bookmarks: bookmark._id } }
    )
  }
  res.status(200).json({
    ok: 1,
    data: bookmark
  })
})

// 删除书签
router.post('/delete', async (req, res) => {
  const { token } = req
  const { id } = req.body
  await bookmarkModel.deleteOne({ _id: id, user_id: token.id })
  await userModel.updateOne({ _id: token.id }, { $pull: { bookmarks: id } })
  res.status(200).json({
    ok: 1,
    message: '删除成功'
  })
})

// 排序书签
router.post('/sort', async (req, res) => {
  const { bookmarks } = req.body
  const { token } = req
  const updated = await userModel.findByIdAndUpdate(
    token.id,
    { bookmarks },
    { new: true }
  )
  res.status(200).json({
    ok: 1,
    data: updated.bookmarks,
    message: '排序成功'
  })
})

module.exports = router
