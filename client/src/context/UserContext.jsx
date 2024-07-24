import { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const readUserFromToken = () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const payload = jwtDecode(token)

        if (Date.now() < payload.exp * 1000) {
          setUser(payload.user) // Set user directly from payload
        }
      }
    } catch (error) {
      console.log(error)
      localStorage.clear() // Token is expired
      setUser(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    readUserFromToken() // Check token on mount
  }, [])

  const logOut = () => {
    localStorage.clear()
    setUser(null) // Update state to trigger re-renders
  }

  const setToken = (token) => {
    localStorage.setItem('token', token)
    readUserFromToken() // Update user state upon setting a new token
  }

  return (
    <UserContext.Provider value={{ user, setUser, logOut, setToken, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
