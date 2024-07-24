import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
// Custom Hooks
import { usePost } from '../hooks/usePost'
// Components
import Loader from '../components/Loader'
import PageTitle from '../components/PageTitle'

const Post = () => {
  const { id } = useParams()
  const { getPost } = usePost()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [post, setPost] = useState()

  useEffect(() => {
    const fetchPost = async (id) => {
      setIsLoading(true)
      const res = await getPost(id)
      setPost(res)
      setIsLoading(false)
    }
    fetchPost(id)
  }, [id])

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm(
      'Are you sure you want to permentaly delete this post?'
    )
    if (userConfirmed) {
      const res = await deletePost(id)
      navigate('/posts')
    }
  }

  // Conditional loader
  if (isLoading) return <Loader />

  return (
    <>
      <PageTitle title={post?.title ? post.title : 'Post'} />
      {post && (
        <div>
          <h1>{post.title}</h1>

          <Link to={`/post/edit/${post._id}`}>Edit</Link>
          <button onClick={() => handleDelete(post._id)}>Delete</button>
          {post.image.length && (
            <img
              src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${post.image}`}
              alt={post.title}
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
        </div>
      )}
      <Link to={`/posts`}>Return to posts</Link>
    </>
  )
}

export default Post
