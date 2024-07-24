import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
// Custom Hooks
import { useAuth } from '../hooks/useAuth'
// Helpers
import { handleChange } from '../utils/formHelpers'
// Components
import PageTitle from '../components/PageTitle'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const { forgotPassword } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await forgotPassword(formData)

    if (res) {
      toast.success(`Email sent to ${formData.email}`)
      navigate('/')
    }
  }

  return (
    <>
      <PageTitle title={'Forgot Password'} />
      <form onSubmit={handleSubmit} className='card card--med'>
        <h1>Forgot Password</h1>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Email'
          value={formData.email}
          onChange={(e) => handleChange(e, setFormData, formData)}
          autoFocus
          required
        />
        <button className='btn'>Send Password Reset</button>
      </form>
    </>
  )
}

export default ForgotPassword
