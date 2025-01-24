import { timeAgo } from '../../lib/utils'
import { useAuthStore } from '../../store/authStore';
import { useBlogStore } from '../../store/blogStore'
import UserIconSmall from '../profile/UserIconSmall'
import { FaTrashAlt } from "react-icons/fa";



export default function CommentBlogContainer() {
  const { user } = useAuthStore()
  const { blog, deleteComment } = useBlogStore()

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId)
  }
  return (
    <div>
      {blog.comments?.length > 0 ? (
        blog.comments.map((comment) => (
          <div
            key={comment._id}
            className='flex justify-between items-start '
          >
            <div className='p-2 flex gap-2'>
              <UserIconSmall image={comment.author.profileImage} />
              <div>
                <div className='text-xs flex items-center gap-2'>
                  <h1 className='font-semibold'>@{comment.author.username}</h1>
                  <span className='text-slate-700'>{timeAgo(comment.createdAt)}</span>
                </div>
                <p>{comment.content}</p>
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