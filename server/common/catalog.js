const Blog = require('../model/blog')

class CatalogNode {
  constructor(type, title, children, _id) {
    this.type = type
    this.title = title
    this._id = _id
    this.children = children || []
    this.isOpen = false
  }
  push(node) {
    this.children.push(node)
  }
}

async function catalog(filter) {
  filter.level = 1
  filter.prev_id = null
  filter.parent_id = null
  const start = await Blog.findOne(filter)
  if (start) {
    return await findRoot(start._id)
  }

  async function findRoot(id) {
    const result = []
    await findNode(id)

    async function findNode(id) {
      const doc = await Blog.findOne({ _id: id })
      const { type, title, children, _id } = doc
      const node = new CatalogNode(type, title, children, _id)
      const childDoc = await Blog.findOne({ parent_id: id, prev_id: null })

      if (childDoc) {
        node.children = await findRoot(childDoc._id)
      }
      result.push(node)
      if (doc.next_id) {
        await findNode(doc.next_id)
      }
      return node
    }
    
    return result
  }
}

module.exports = catalog
