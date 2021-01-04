const mongoose = require('mongoose')

const BookMarkSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  url: String,
  icon: String,
  size: {
    type: String,
    enum: ['small', 'middle', 'wide', 'large']
  }
})



module.exports = mongoose.model('BookMark', BookMarkSchema)
