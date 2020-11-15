const mongoose = require('./db.js')

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
    // [不能登录, 默认, 管理员]
    enum: [0, 1, 2],
    default: 1
  }
})

module.exports = mongoose.model('User', UserSchema)
