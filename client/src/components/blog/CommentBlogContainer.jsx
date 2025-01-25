import { formatViews, timeAgo } from '../../lib/utils'
import { useAuthStore } from '../../store/authStore';
import { useBlogStore } from '../../store/blogStore'
import UserIconSmall from '../profile/UserIconSmall'
import { FaTrashAlt } from "react-icons/fa";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";



export default function CommentBlogContainer() {
  const { user } = useAuthStore()
  const { blog, deleteComment, likeOrUnlikeComment } = useBlogStore()

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId)
  }
  const handleLikeOrDislikeComment = async (commentId) => {
    await likeOrUnlikeComment(commentId)
  }
  return (
    <div>
      {blog.comments?.length > 0 ? (
        blog.comments.slice().reverse().map((comment) => (
          <div
            key={comment._id}
            className='flex justify-between items-start '
          >
            <div className='p-2 flex gap-2'>
              <UserIconSmall image={comment.author.profileImage} />
              <div className='flex flex-col'>
                <div>
                  <div className='text-xs flex items-center gap-2'>
                    <h1 className='font-semibold'>@{comment.author.username}</h1>
                    <span className='text-slate-700'>{timeAgo(comment.createdAt)}</span>
                  </div>
                  <p>{comment.content}</p>
                </div>

                <div className='flex'>
                  <div
                    onClick={() => handleLikeOrDislikeComment(comment._id)}
                    className='p-1 cursor-pointer'
                  >
                    {comment.LikeUsers.includes(user._id) ? <AiFillLike /> : <AiOutlineLike />}
                  </div>

                  <h1>{formatViews(comment.LikeUsers.length)}</h1>
                </div>
              </div>
            </div>

            {comment.author._id === user._id && (
              <div
                className='cursor-pointer text-xl hover:bg-slate-200 rounded-full p-1 relative hover:text-red-600'
                onClick={() => handleDeleteComment(comment._id)}
              >
                <FaTrashAlt />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  )
}