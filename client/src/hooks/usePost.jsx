import { useApi } from './useApi'

export const usePost = () => {
  const { post, get, put, del } = useApi()

  const getPosts = async (formData) => {
    const data = await get('/post', formData)
    return data
  }

  const getPost = async (id) => {
    const data = await get(`/post/${id}`)
    return data
  }

  const createPost = async (formData) => {
    const data = await post('/post', formData)
    return data
  }

  const updatePost = async (formData) => {
    const data = await put('/post', formData)
    return data
  }

  const deletePost = async (id) => {
    const data = await del(`/post/${id}`)
    return data
  }

  return {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
  }
}
