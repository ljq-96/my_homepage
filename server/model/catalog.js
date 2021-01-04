const mongoose = require('./db.js')

const CatalogSchema = mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  articleId: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: true
  },
  children: {
    type: Array
  }
})

module.exports = mongoose.model('User', UserSchema)
