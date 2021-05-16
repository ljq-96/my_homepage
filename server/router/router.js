const express = require('express')
const fs = require('fs')
const formidable = require('formidable')
const jwt = require('jsonwebtoken')
const Blog = require('../model/blog')
const BookMark = require('../model/bookmark')
const userModel = require('../model/user')
const router = express.Router()

// async function getBookMarks(user) {
//   const result = []
//   let temp = await BookMark.findOne({ user_id: user.id, prev_id: null })
//   if (temp) {
//     result.push(temp)
//     let next_id = temp.next_id
//     while (next_id) {
//       temp = await BookMark.findById(next_id)
//       next_id = temp.next_id
//       result.push(temp)
//     }
//   }
//   return result
// }

router.get('/', (req, res) => {
  pReadFile('./quaint/index.html').then(value => {
    res.status(200).end(value)
  })
})

router.post('/user/register', (req, res) => {
  const data = req.body
  userModel.findOne({ userName: data.userName }).then(value => {
    if (value) {
      res.status(200).json({
        code: 200,
        message: '用户名已存在'
      })
    } else {
      new userModel(data).save().then(doc => {
        res.status(200).json({
          code: 200,
          message: 'success',
          token: jwt.sign(
            {
              id: doc._id,
              userName: doc.userName,
              password: doc.password,
              status: doc.status
            },
            'quaint'
          )
        })
      })
    }
  })
})

router.post('/user/login', (req, res) => {
  const data = req.body
  if (Object.keys(data).length === 2) {
    userModel.findOne(data).then(value => {
      if (value) {
        res.status(200).json({
          code: 200,
          message: 'success',
          token: jwt.sign(
            {
              id: value._id,
              userName: value.userName,
              password: value.password,
              status: value.status
            },
            'quaint'
          )
        })
      } else {
        res.status(200).json({
          code: 200,
          message: '用户名或密码错误'
        })
      }
    })
  } else {
    res.status(200).json({
      code: 200,
      message: '用户名或密码不能为空'
    })
  }
})

// router.post('/bookmark/del', async (req, res) => {
//   const docSort = new DocSort(BookMark)
//   await docSort.goOut(req.body.id)
//   await BookMark.deleteOne({ _id: req.body.id })
//   res.status(200).send({ code: 200 })
// })

// router.get('/news/weibo', async (req, res) => {
//   if (news.isEmpty) {
//     await getNews()
//   }
//   res.status(200).send({
//     code: 200,
//     weibohot: news.weibo
//   })
// })

// router.get('/translate', async (req, res) => {
//   const result = await getTranslate(req.query.words)
//   res.status(200).json({
//     code: 200,
//     result: result
//   })
// })

// router.get('/articles', function (req, res) {
//   const pageSize = req.query.page ? req.query.page : 1
//   const limit = 8
//   const filter = req.query.tag ? { tags: req.query.tag } : {}
//   const token = req.headers.authorization
//   const user = jwt.verify(token, 'quaint')
//   filter.type = 'DOC'
//   filter.user_id = user.id
//   Blog.find(filter)
//     .sort({ time: -1 })
//     .limit(limit)
//     .skip((pageSize - 1) * limit)
//     .then(value => {
//       const articles = []
//       value.forEach(item => {
//         const { title, tags, time, truncate, _id } = item
//         articles.push({ title, tags, time, truncate, time, _id })
//       })
//       res.status(200).send({
//         code: 200,
//         articles
//       })
//     })
// })

// router.get('/sticky', (req, res) => {
//   const token = req.headers.authorization
//   if (token) {
//     const user = jwt.verify(token, 'quaint')
//     Blog.find({ sticky: true, user_id: user.id, type: 'DOC' }).then(value =>
//       res.status(200).send({
//         code: 200,
//         articles: value
//       })
//     )
//   }
// })

// router.get('/article/:name', function (req, res) {
//   const token = req.headers.authorization
//   if (token) {
//     const user = jwt.verify(token, 'quaint')
//     let title = req.params.name
//     Blog.findOne(
//       { user_id: user.id, title: title, type: 'DOC' },
//       (err, doc) => {
//         if (doc) {
//           const { tags, content, time, _id } = doc
//           res.status(200).json({
//             code: 200,
//             article: { content, tags, time, _id }
//           })
//         }
//       }
//     )
//   }
// })

// router.get('/tag', function (req, res) {
//   const token = req.headers.authorization
//   if (token) {
//     const user = jwt.verify(token, 'quaint')
//     let tagObj = {}
//     Blog.find({ user_id: user.id, type: 'DOC' })
//       .then(value => {
//         value.forEach(item => {
//           item.tags.forEach(tag => {
//             if (tagObj[tag]) {
//               tagObj[tag]++
//             } else {
//               tagObj[tag] = 1
//             }
//           })
//         })
//       })
//       .then(() => {
//         let tagArr = []
//         let keys = Object.keys(tagObj)
//         while (keys.length) {
//           let key = keys.reduce((a, b) => (tagObj[a] > tagObj[b] ? a : b))
//           keys.splice(keys.indexOf(key), 1)
//           tagArr.push({
//             title: key,
//             info: tagObj[key]
//           })
//         }
//         res.status(200).json({
//           code: 200,
//           tags: tagArr
//         })
//       })
//   }
// })

// router.get('/blog/management', (req, res) => {
//   const token = req.headers.authorization
//   if (token) {
//     const result = []
//     const user = jwt.verify(token, 'quaint')
//     Blog.find({ user_id: user.id, type: 'DOC' })
//       .sort({ time: -1 })
//       .then(value => {
//         value.forEach(item => {
//           const { title, sticky, time, _id } = item
//           const words = item.content.length
//           const tags = item.tags.join(',')
//           result.push({ time, sticky, time, tags, words, title, _id })
//         })
//         res.status(200).send({
//           code: 200,
//           articles: result,
//           length: result.length
//         })
//       })
//   }
// })

// router.post('/blog/catalog/addgroup', async (req, res) => {
//   const token = req.headers.authorization
//   if (token) {
//     const user = jwt.verify(token, 'quaint')
//     const info = req.body
//     info.type = 'TITLE'
//     info.user_id = user.id
//     info.level = 1
//     await new Blog(info).save()
//     const newDoc = await Blog.findOne(info)
//     const firstDoc = await Blog.findOne({
//       level: 1,
//       user_id: user.id,
//       prev_id: null,
//       parent_id: null
//     })
//     if (firstDoc) {
//       await Blog.updateOne({ _id: newDoc._id }, { next_id: firstDoc._id })
//       await Blog.updateOne({ _id: firstDoc._id }, { prev_id: newDoc._id })
//     }
//     res.status(200).json({ code: 200 })
//   }
// })

// router.get('/blog/catalog/remake', async (req, res) => {
//   const token = req.headers.authorization
//   const user = jwt.verify(token, 'quaint')
//   const articles = await Blog.find({ user_id: user.id })
//   for (item of articles) {
//     await Blog.updateOne(
//       { _id: item._id },
//       {
//         level: 0,
//         prev_id: null,
//         next_id: null,
//         parent_id: null
//       }
//     )
//   }
//   res.status(200).json({
//     code: 200,
//     articles: []
//   })
// })

// router.get('/blog/catalog/outside', (req, res) => {
//   const token = req.headers.authorization
//   const user = jwt.verify(token, 'quaint')
//   Blog.find({ user_id: user.id, level: 0 }).then(value => {
//     res.status(200).json({
//       code: 200,
//       articles: value.map(item => {
//         return {
//           title: item.title,
//           _id: item._id
//         }
//       })
//     })
//   })
// })

// router.get('/blog/catalog/inside', (req, res) => {
//   const token = req.headers.authorization
//   if (token) {
//     const user = jwt.verify(token, 'quaint')
//     catalog({ user_id: user.id }).then(tree =>
//       res.status(200).json({
//         code: 200,
//         articles: tree
//       })
//     )
//   }
// })

// router.post('/blog/catalog/update', async (req, res) => {
//   const { action, _id, target_id } = req.body
//   const docSort = new DocSort(Blog)
//   switch (action) {
//     case 'insert':
//       await docSort.insert(_id)
//       break
//     case 'prependChild':
//       await docSort.prependChild(_id, target_id)
//       break
//     case 'moveAfter':
//       await docSort.moveAfter(_id, target_id)
//       break
//     case 'remove':
//       await docSort.remove(_id)
//       break
//   }
//   const token = req.headers.authorization
//   const user = jwt.verify(token, 'quaint')
//   catalog({ user_id: user.id }).then(tree =>
//     res.status(200).json({
//       code: 200,
//       articles: tree
//     })
//   )
// })

// router.post('/blog/update', (req, res) => {
//   const { _id, info } = req.body
//   const token = req.headers.authorization
//   const truncateReg = /([\s\S]*?)[\r,\n,\r\n]---[\r,\n,\r\n]/
//   if (token) {
//     const user = jwt.verify(token, 'quaint')
//     if (info.tags) {
//       info.tags = info.tags.split(',')
//     }
//     info.update_time = new Date()
//     if (info.content) {
//       info.truncate = truncateReg.exec(info.content)
//         ? truncateReg.exec(info.content)[1]
//         : ''
//     }
//     if (_id) {
//       Blog.updateOne({ _id }, info).then(() =>
//         res.status(200).json({ code: 200 })
//       )
//     } else {
//       info.user_id = user.id
//       new Blog(info).save(err => {
//         if (!err) {
//           res.status(200).json({ code: 200 })
//         }
//       })
//     }
//   }
// })

// router.post('/blog/del', async (req, res) => {
//   const docSort = new DocSort(Blog)
//   await docSort.remove(req.body._id)
//   Blog.deleteOne({ _id: req.body._id }, err => {
//     if (!err) {
//       res.status(200).send({ code: 200 })
//     }
//   })
// })

// router.post('/readfile', (req, res) => {
//   const form = new formidable.IncomingForm()
//   form.uploadDir = './temp'
//   form.keepExtensions = true
//   form.parse(req)
//   form.on('file', (name, file) => {
//     fs.readFile(file.path, (err, data) => {
//       if (!err) {
//         res.status(200).json({
//           code: 200,
//           article: data.toString()
//         })
//         fs.unlink(file.path, function (err) {
//           if (err) throw err
//         })
//       }
//     })
//   })
// })

// router.get('/style', async (req, res) => {
//   const style = await pReadFile('./common/blog-style.css')
//   res.status(200).json({
//     code: 200,
//     style: style.toString()
//   })
// })

function pReadFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = router
