const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  id: Number,
  userId: Number,
  title: String,
  body: String
})

export default model('Post', postSchema)
