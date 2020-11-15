const mongoose = require('./db.js')

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
  },
  prev_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  next_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  }
})



module.exports = mongoose.model('BookMark', BookMarkSchema)
