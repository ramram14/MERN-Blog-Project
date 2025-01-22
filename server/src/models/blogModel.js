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
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['Lifestyle', 'Hobby', 'Finance', 'Health', 'Philosophy', 'Technology', 'Self Improvement', 'Food', 'Education', 'Entertainment'],
    required: true,
  },
  likeUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
})

const Blog = mongoose.model('Blog', blogSchema)
export default Blog;