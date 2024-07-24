import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// Context
import { useUserContext } from '../context/UserContext'
// Custom Hooks
import { useUser } from '../hooks/useUser'
// Components
import Loader from '../components/Loader'
import PageTitle from '../components/PageTitle'

const Admin = () => {
  const { user } = useUserContext()
  const { getUsers, deleteUser } = useUser()

  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)

      let res = await getUsers()
      setUsers(res)

      setIsLoading(false)
    }

    fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm(
      'Are you sure you want to permentaly delete this user?'
    )
    if (userConfirmed) {
      const res = await deleteUser(id)
      setUsers((prev) => prev.filter((user) => user._id !== res._id))
    }
  }

  // Conditional loader
  if (isLoading) return <Loader />

  return (
    <div>
      <PageTitle title={'Admin Dashboard'} />
      <h1>Welcome Admin</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>

      {user?.role === 'Admin' && <Link to='/admin'>Admin Page</Link>}

      {users?.length ? (
        <div>
          {users.map((user) => {
            return (
              <div key={user._id}>
                <p>
                  {user.fName} {user.lName} {user.role}
                </p>
                <Link to={`/profile/${user._id}`}>Edit</Link>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </div>
            )
          })}
        </div>
      ) : (
        <h2>No Users Found</h2>
      )}
    </div>
  )
}
export default Admin
