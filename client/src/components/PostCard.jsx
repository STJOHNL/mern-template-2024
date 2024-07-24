import { Link } from 'react-router-dom'
import { FaRegTrashCan } from 'react-icons/fa6'
import { FaRegEdit } from 'react-icons/fa'

const PostCard = ({ post, handleDelete }) => {
  const postTitle =
    post.title.length > 30 ? post.title.substr(0, 30) + '...' : post.title
  const postBody =
    post.body.length > 145 ? post.body.substr(0, 145) + '...' : post.body

  return (
    <div className='card'>
      <Link to={`/posts/${post._id}`}>
        <h1>{postTitle}</h1>
      </Link>
      <Link to={`/post/edit/${post._id}`} className='btn btn--subtle'>
        <FaRegEdit className='btn--icon' />
      </Link>
      <button
        onClick={() => handleDelete(post._id)}
        className='btn btn--subtle'
      >
        <FaRegTrashCan className='btn--icon--danger' />
      </button>
      {post.image.length && (
        <img
          src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${post.image}`}
          alt={postTitle}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: postBody }}></div>
      <Link to={`/posts/${post._id}`}>Read more</Link>
    </div>
  )
}

export default PostCard
