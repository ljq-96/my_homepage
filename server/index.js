const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./router/router')
const bookmarkRouter = require('./router/bookmark')
const blogRouter = require('./router/blog')
const catalogRouter = require('./router/catalog')
const otherRouter = require('./router/other')
const token = require('./common/token')
const app = express()

// 允许跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type,Accept,X-Requested-With,Authorization'
  )
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if (req.method.toLowerCase() == 'options') {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.use('/', express.static('./quaint/'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(token)
app.use(router)
app.use('/api/bookmark', bookmarkRouter)
app.use('/api/catalog', catalogRouter)
app.use('/api/blog', blogRouter)
app.use('/api', otherRouter)

mongoose.set('useFindAndModify', false)
mongoose
  .connect('mongodb://localhost:27017/my', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(
    () => {
      console.log('MongoDB连接成功')
      app.listen(4000, function () {
        console.log('running 4000...')
      })
    },
    reason => console.log(reason)
  )
