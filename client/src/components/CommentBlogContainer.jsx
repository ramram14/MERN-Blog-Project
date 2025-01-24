import { timeAgo } from '../lib/utils'
import { useBlogStore } from '../store/blogStore'
import UserIconSmall from './UserIconSmall'

export default function CommentBlogContainer() {
  const { blog } = useBlogStore()
  return (
    <div>
      {blog.comments?.length > 0 ? (
        blog.comments.map((comment) => (
          <div
            key={comment._id}
            className='flex items-start gap-4 p-2'
          >
            <UserIconSmall image={comment.author.profileImage} />
            <div>
              <div className='text-xs flex items-center gap-2'>
                <h1 className='font-semibold'>@{comment.author.username}</h1>
                <span className='text-slate-700'>{timeAgo(comment.createdAt)}</span>
              </div>
              <p>{comment.content}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  )
}