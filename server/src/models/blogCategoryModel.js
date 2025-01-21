import mongoose from 'mongoose';

const blogCategorySchema = mongoose.Schema({
  name: {
    type: String,
    enum: ['Lifestyle', 'Hobby', 'Finance', 'Health', 'Philosophy', 'Technology', 'Self Improvement', 'Food', 'Education', 'Entertainment'],
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
})

const BlogCategory = mongoose.model('Category', blogCategorySchema);
export default BlogCategory;
