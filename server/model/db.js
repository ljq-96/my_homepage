const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/my', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(
    () => {
      console.log('MongoDB连接成功')
    },
    reason => console.log(reason)
  )

module.exports = mongoose
