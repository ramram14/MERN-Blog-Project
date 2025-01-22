import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20
  },
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 10
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  profileImage: {
    type: String
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  commentLikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema);
export default User;