import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
// Context
import { useUserContext } from '../context/UserContext'
// Custom Hooks
import { useUser } from '../hooks/useUser'
// Helpers
import { handleChange, handleFileChange } from '../utils/formHelpers'
// Components
import Loader from '../components/Loader'
import PageTitle from '../components/PageTitle'

const Profile = () => {
  const { user, setUser } = useUserContext()
  const { getUser, updateUser } = useUser()
  const { id } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    updatingUserID: user?._id,
    id: '',
    fName: '',
    lName: '',
    email: '',
    profileImage: '',
    role: '',
  })

  useEffect(() => {
    const fetchUser = async (id) => {
      setIsLoading(true)
      const res = await getUser(id)
      setFormData({
        updatingUserID: user?._id,
        id: res?._id,
        fName: res?.fName,
        lName: res?.lName,
        email: res?.email,
        profileImage: res?.profileImage,
        role: res?.role,
      })

      setIsLoading(false)
    }
    fetchUser(id)
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('updatingUserID', user?._id)
    data.append('id', formData.id)
    data.append('fName', formData.fName)
    data.append('lName', formData.lName)
    data.append('email', formData.email)
    data.append('profileImage', formData.profileImage)
    if (user?.role === 'Admin') {
      data.append('role', formData.role)
    }

    const res = await updateUser(data)
    if (res) {
      if (formData.updatingUserID == formData.id) {
        setUser(res)
      }
      toast.success('Changes saved!')
    }
  }

  // Conditional loader
  if (isLoading) return <Loader />

  return (
    <>
      <PageTitle title={'Profile'} />
      <form onSubmit={handleSubmit} className='card card--med'>
        <label htmlFor='profileImage'>Profile Image</label>
        <input
          type='file'
          name='profileImage'
          id='profileImage'
          accept='image/png, image/jpeg'
          onChange={(e) => handleFileChange(e, setFormData, formData)}
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
        <label htmlFor='fName'>First</label>
        <input
          type='text'
          name='fName'
          id='fName'
          placeholder='First Name'
          onChange={(e) => handleChange(e, setFormData, formData)}
          value={formData.fName}
          required
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
        {user?.role === 'Admin' && (
          <>
            <label htmlFor='role'>Role</label>
            <select
              name='role'
              id='role'
              onChange={(e) => handleChange(e, setFormData, formData)}
            >
              <option value={formData.role}>{formData.role}</option>
              <option value='User'>User</option>
              <option value='Admin'>Admin</option>
            </select>
          </>
        )}
        <button className='btn'>Save Changes</button>
      </form>
    </>
  )
}

export default Profile
