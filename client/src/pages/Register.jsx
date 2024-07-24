import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
// Context
import { useUserContext } from '../context/UserContext'
// Custom Hooks
import { useAuth } from '../hooks/useAuth'
// Helpers
import { handleChange, handleFileChange } from '../utils/formHelpers'
// Components
import PageTitle from '../components/PageTitle'

const Register = () => {
  const { register } = useAuth()
  const { setToken, user } = useUserContext()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    profileImage: '',
    fName: '',
    lName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user]) // Check if user is already logged in on mount

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password != formData.confirmPassword) {
      toast.error('Passwords to not match')
    } else {
      const data = new FormData()
      data.append('profileImage', formData.profileImage)
      data.append('fName', formData.fName)
      data.append('lName', formData.lName)
      data.append('email', formData.email)
      data.append('password', formData.password)
      data.append('confirmPassword', formData.confirmPassword)

      const res = await register(data)
      if (res?.token) {
        setToken(res?.token)
        toast.success('Welcome!')
        navigate('/dashboard')
      }
    }
  }

  return (
    <>
      <PageTitle title={'Register'} />
      <form onSubmit={handleSubmit} className='card card--med'>
        <h1>Welcome!</h1>
        <label htmlFor='profileImage'>Profile Image</label>
        <input
          type='file'
          name='profileImage'
          id='profileImage'
          accept='image/png, image/jpeg'
          onChange={(e) => handleFileChange(e, setFormData, formData)}
        />
        <label htmlFor='fName'>First</label>
        <input
          type='text'
          name='fName'
          id='fName'
          placeholder='First Name'
          onChange={(e) => handleChange(e, setFormData, formData)}
          value={formData.fName}
          required
          autoFocus
        />
        <label htmlFor='lName'>Last</label>
        <input
          type='text'
          name='lName'
          id='lName'
          placeholder='Last Name'
          onChange={(e) => handleChange(e, setFormData, formData)}
          value={formData.lName}
          required
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='john@email.com'
          onChange={(e) => handleChange(e, setFormData, formData)}
          value={formData.email}
          required
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
        <label htmlFor='confirmPassword'>Confirm</label>
        <input
          type='password'
          name='confirmPassword'
          id='confirmPassword'
          placeholder='Confirm Password'
          onChange={(e) => handleChange(e, setFormData, formData)}
          value={formData.confirmPassword}
          required
        />

        <button className='btn'>Register</button>
      </form>
    </>
  )
}

export default Register
