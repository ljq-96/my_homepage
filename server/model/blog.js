const mongoose = require('mongoose')

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
  create_time: {
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
  in_catalog: {
    type: Boolean,
    default: false
  }
})

const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog
