const mongoose = require('./db.js')

const BlogSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  tags: {
    type: Array
  },
  truncate: {
    type: String
  },
  content: {
    type: String
  },
  time: {
    type: Date,
    default: Date.now
  },
  update_time: {
    type: Date,
    default: Date.now
  },
  sticky: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    enum: ['DOC', 'TITLE'],
    default: 'DOC'
  },
  level: {
    type: Number,
    default: 0
  },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
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

const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog
