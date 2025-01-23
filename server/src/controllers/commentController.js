import Blog from '../models/blogModel.js';
import Comment from '../models/commentModel.js';
import User from '../models/userModel.js';

export const createCommentByBlogId = async (req, res) => {
  try {
    const user = req.userData;
    const blogId = req.params.blogId
    const { content } = req.body;

    const comment = await Comment.create({
      content,
      author: user._id,
      blog: blogId
    })

    const updateCommentOnBlog = Blog.updateOne({ _id: blogId }, { $push: { comments: comment._id } })
    const updateCommentOnUser = User.updateOne({ _id: user._id }, { $push: { comments: comment._id } })

    Promise.all([updateCommentOnBlog, updateCommentOnUser])
    return res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      data: comment
    })
  } catch (error) {
    console.log('Error in createComment controller', error.message)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
};

export const deleteCommentByCommentId = async (req, res) => {
  try {
    const commentId = req.params.commentId
    const comment = await Comment.findByIdAndDelete(commentId)
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      })
    }
    const deleteCommentOnBlogPromise = Blog.findByIdAndUpdate(
      comment.blog,
      { $pull: { comments: commentId } },
      { new: true }
    )
    const deleteCommentOnUserPromise = User.findByIdAndUpdate(
      comment.author,
      { $pull: { comments: commentId } },
      { new: true }
    )

    await Promise.all([deleteCommentOnBlogPromise, deleteCommentOnUserPromise])

    return res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    })
  } catch (error) {
    console.log('Error in deleteComment controller', error.message)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}