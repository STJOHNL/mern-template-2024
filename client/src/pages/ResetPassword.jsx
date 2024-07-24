import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
// Custom Hooks
import { useAuth } from '../hooks/useAuth'
// Helpers
import { handleChange } from '../utils/formHelpers'
// Components
import PageTitle from '../components/PageTitle'

const ResetPassword = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const { resetPassword } = useAuth()

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    token: token,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password != formData.confirmPassword) {
      toast.error('Passwords to not match')
    } else {
      const res = await resetPassword(formData)

      if (res) {
        toast.success('Password has been updated!')
        navigate('/')
      }
    }
  }

  return (
    <>
      <PageTitle title={'Reset Password'} />
      <form onSubmit={handleSubmit} className='card card--med'>
        <h1>Create New Password</h1>
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          value={formData.password}
          onChange={(e) => handleChange(e, setFormData, formData)}
        />
        <input
          type='password'
          name='confirmPassword'
          id='confirmPassword'
          placeholder='Confirm Password'
          value={formData.confirmPassword}
          onChange={(e) => handleChange(e, setFormData, formData)}
        />
        <button className='btn'>Update Password</button>
      </form>
    </>
  )
}

export default ResetPassword
