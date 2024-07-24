import { useState, useEffect } from 'react'
// Custom Hooks
import { usePost } from '../hooks/usePost'
// Components
import Loader from '../components/Loader'
import PageTitle from '../components/PageTitle'
import PostCard from '../components/PostCard'

const Posts = () => {
  const { getPosts, deletePost } = usePost()

  const [posts, setPosts] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)

      let res = await getPosts()
      setPosts(res)

      setIsLoading(false)
    }

    fetchPosts()
  }, [])

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm(
      'Are you sure you want to permentaly delete this post?'
    )
    if (userConfirmed) {
      const res = await deletePost(id)
      setPosts((prev) => prev.filter((post) => post._id !== res._id))
    }
  }

  // Conditional loader
  if (isLoading) return <Loader />

  return (
    <>
      <PageTitle title={'Posts'} />
      {posts?.length ? (
        <div className='container--repeat'>
          {posts.map((post) => {
            return (
              <PostCard
                key={post._id}
                post={post}
                handleDelete={handleDelete}
              />
            )
          })}
        </div>
      ) : (
        <h2>No Posts Found</h2>
      )}
    </>
  )
}

export default Posts
