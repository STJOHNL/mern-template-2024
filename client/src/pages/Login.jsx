import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
// Context
import { useUserContext } from '../context/UserContext'
// Custom Hooks
import { useAuth } from '../hooks/useAuth'
// Helpers
import { handleChange } from '../utils/formHelpers'
// Components
import PageTitle from '../components/PageTitle'

const Login = () => {
  const { login } = useAuth()
  const { setToken, user } = useUserContext()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user]) // Check if user is already logged in on mount

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await login(formData)

    if (res?.token) {
      setToken(res?.token)
      toast.success('Welcome!')
      navigate('/dashboard')
    }
  }

  return (
    <>
      <PageTitle title={'Login'} />
      <form onSubmit={handleSubmit} className='card card--med'>
        <h1>Welcome back!</h1>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='john@email.com'
          onChange={(e) => handleChange(e, setFormData, formData)}
          value={formData.email}
          required
          autoFocus
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          onChange={(e) => handleChange(e, setFormData, formData)}
          value={formData.password}
          required
        />

        <button className='btn'>Login</button>
      </form>
    </>
  )
}

export default Login
