class DocSort {
  constructor(schema) {
    this.schema = schema
  }
  async insert(_id) {
    const first = await this.schema.findOne({
      level: 1,
      parent_id: null,
      prev_id: null
    })
    if (first) {
      await this.schema.updateOne({ _id: first._id }, { prev_id: _id })
    }
    await this.schema.updateOne(
      { _id: _id },
      {
        level: 1,
        prev_id: null,
        parent_id: null,
        next_id: first ? first._id : null
      }
    )
  }
  async remove(_id) {
    const doc = await this.goOut(_id)
    const children = await this.schema.find({ parent_id: _id })
    if (children.length) {
      for (let item of children) {
        await this.schema.updateOne(
          { _id: item._id },
          { level: 0, parent_id: null, next_id: null, prev_id: null }
        )
      }
    }
    await this.schema.updateOne(
      { _id: _id },
      { level: 0, parent_id: null, next_id: null, prev_id: null }
    )
    if (doc.type === 'TITLE') {
      await this.schema.deleteOne({ _id: _id })
    }
  }
  async moveAfter(_id, target_id) {
    await this.goOut(_id)
    const targetDoc = await this.schema.findById(target_id)
    if (targetDoc.next_id) {
      await this.schema.updateOne({ _id: targetDoc.next_id }, { prev_id: _id })
      await this.schema.updateOne({ _id: _id }, { next_id: targetDoc.next_id })
    }
    await this.schema.updateOne({ _id: targetDoc._id }, { next_id: _id })
    await this.schema.updateOne({ _id: _id }, { prev_id: targetDoc._id })
  }
  async moveBefore(_id, target_id) {
    await this.goOut(_id)
    const targetDoc = await this.schema.findById(target_id)
    if (targetDoc.prev_id) {
      await this.schema.updateOne({ _id: targetDoc.prev_id }, { next_id: _id })
      await this.schema.updateOne({ _id: _id }, { prev_id: targetDoc.prev_id })
    }
    await this.schema.updateOne({ _id: targetDoc._id }, { prev_id: _id })
    await this.schema.updateOne({ _id: _id }, { next_id: targetDoc._id })
  }
  async prependChild(_id, target_id) {
    await this.goOut(_id)
    const targetDocChild = await this.schema.findOne({
      parent_id: target_id,
      prev_id: null
    })
    await this.schema.updateOne(
      { _id: _id },
      { parent_id: target_id, prev_id: null, next_id: null }
    )

    if (targetDocChild) {
      await this.schema.updateOne({ _id: targetDocChild._id }, { prev_id: _id })
      await this.schema.updateOne({ _id: _id }, { next_id: targetDocChild._id })
    }
  }
  async goOut(_id) {
    const doc = await this.schema.findById(_id)
    const { prev_id, next_id } = doc
    if (prev_id) {
      await this.schema.updateOne({ _id: prev_id }, { next_id: next_id })
    }
    if (next_id) {
      await this.schema.updateOne({ _id: next_id }, { prev_id: prev_id })
    }
    return doc
  }
}

module.exports = DocSort
