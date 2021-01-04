const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_time: {
    type: Date,
    default: Date.now
  },
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Number,
    // [-1不能登录, 0默认, 1管理员]
    default: 0
  },
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BookMark'
    }
  ],
  catalog: [
    {
      blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      },
      children: []
    }
  ]
})

module.exports = mongoose.model('User', UserSchema)
