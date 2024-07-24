import { useApi } from './useApi'

export const useAuth = () => {
  const { post } = useApi()

  const login = async (formData) => {
    const data = await post('/auth/login', formData)
    return data
  }

  const register = async (formData) => {
    const data = await post('/auth/register', formData)
    return data
  }

  const forgotPassword = async (formData) => {
    const data = await post('/auth/forgot-password', formData)
    return data
  }

  const resetPassword = async (formData) => {
    const data = await post('/auth/reset-password', formData)
    return data
  }

  return {
    login,
    register,
    forgotPassword,
    resetPassword,
  }
}
