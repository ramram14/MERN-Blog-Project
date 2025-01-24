import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likeUser: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
})

const Blog = mongoose.model('Blog', blogSchema)
export default Blog;