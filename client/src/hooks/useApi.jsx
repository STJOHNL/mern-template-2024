import axios from 'axios'
import toast from 'react-hot-toast'
// Context
import { useUserContext } from '../context/UserContext'

export const useApi = () => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
  })

  // Error handling function
  const handleError = (error) => {
    if (error?.response?.data?.message) {
      if (error?.response?.status == 500) {
        toast.error('Server error')
        return console.error('Server error:', error)
      }
      toast.error(error?.response?.data?.message)
      console.error('Error:', error?.response?.data?.message)
      console.error('Status:', error?.response?.status)
    }
    if (error.response && error.response.status === 401) {
      // Dispatch LOGOUT action
      useUserContext.setCurrentUser(null)
      window.location.href = '/' // Redirect to login
    } else {
      // Handle other errors
      console.error('Server error:', error)
    }
  }

  // GET request
  const get = async (url) => {
    try {
      const { data } = await api.get(url)
      return data
    } catch (error) {
      handleError(error)
    }
  }

  // POST request
  const post = async (url, body) => {
    try {
      const { data } = await api.post(url, body)
      return data
    } catch (error) {
      handleError(error)
    }
  }

  // PUT request
  const put = async (url, body) => {
    try {
      const { data } = await api.put(url, body)
      return data
    } catch (error) {
      handleError(error)
    }
  }

  // DELETE request
  const del = async (url) => {
    try {
      const { data } = await api.delete(url)
      return data
    } catch (error) {
      handleError(error)
    }
  }

  return {
    get,
    post,
    put,
    del, // Using 'del' as 'delete' is a reserved word in JavaScript
  }
}
