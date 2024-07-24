import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
// Custom Hooks
import { useUser } from '../hooks/useUser'
// Helpers
import { handleChange, handleFileChange } from '../utils/formHelpers'
// Components
import PageTitle from '../components/PageTitle'

const CreateUser = () => {
  const { createUser } = useUser()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    profileImage: '',
    fName: '',
    lName: '',
    email: '',
    role: 'User',
    password: '',
    confirmPassword: '',
  })

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
      data.append('role', formData.role)
      data.append('password', formData.password)
      data.append('confirmPassword', formData.confirmPassword)
      const res = await createUser(data)
      if (res) {
        toast.success('User Created!')
        navigate('/admin')
      }
    }
  }

  return (
    <>
      <PageTitle title={'Create User'} />
      <form onSubmit={handleSubmit} className='card card--med'>
        <h1>Create User</h1>
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
        <label htmlFor='role'>Role</label>
        <select
          name='role'
          id='role'
          onChange={(e) => handleChange(e, setFormData, formData)}
        >
          <option value='User'>User</option>
          <option value='Admin'>Admin</option>
        </select>

        <button className='btn'>Create User</button>
      </form>
    </>
  )
}

export default CreateUser
