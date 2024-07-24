import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router-dom'
// Assets
import logo from '../../assets/logo.svg'
// Context
import { useUserContext } from '../../context/UserContext'
// Components
import HoverDropdown from './HoverDropdown'
import ClickDropdown from './ClickDropdown'

const Header = () => {
  const navigate = useNavigate()
  const { user, logOut } = useUserContext()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800)
    }

    window.addEventListener('resize', handleResize)
    // Initial check
    handleResize()
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty dependency array to run only once on mount

  const handleLogOut = () => {
    logOut()
    toast.success('Logged out!')
    navigate('/')
  }

  const adminItems = [
    { label: 'Admin', path: `/admin` },
    { label: 'Create Post', path: `/post/create` },
  ]

  const mobileItems = [
    { label: 'Dashboard', path: `/dashboard` },
    { label: 'Posts', path: `/posts` },
  ]

  user?.role === 'Admin'
    ? mobileItems.push({ label: 'Admin', path: `/admin` })
    : ''

  return (
    <header>
      {user && (
        <>
          <div className='nav__profile__background'>
            <nav className='nav__profile'>
              <NavLink
                to={`/profile/${user._id}`}
                className={({ isActive }) =>
                  isActive ? 'nav__link nav__link--active' : 'nav__link'
                }
              >
                My Profile
              </NavLink>
              <button
                onClick={() => handleLogOut()}
                className='btn btn--subtle nav__link'
              >
                Log Out
              </button>
            </nav>
          </div>
          {/* Desktop navbar */}
          {!isMobile && (
            <nav className='nav--desktop'>
              <NavLink
                to={'/dashboard'}
                className={({ isActive }) =>
                  isActive ? 'nav__link nav__link--active' : 'nav__link'
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to={'/posts'}
                className={({ isActive }) =>
                  isActive ? 'nav__link nav__link--active' : 'nav__link'
                }
              >
                Posts
              </NavLink>

              <NavLink to={'/dashboard'} className={'nav__link--logo'}>
                <img src={logo} alt='Logo' className='nav__logo' />
              </NavLink>
              {user.role == 'Admin' && (
                <HoverDropdown
                  mainTitle={'Admin'}
                  mainRoute={'/admin'}
                  items={adminItems}
                />
              )}
            </nav>
          )}

          {/* Mobile navbar */}
          {isMobile && (
            <nav className='nav--mobile'>
              <NavLink to={'/dashboard'} className={'nav__link--logo'}>
                <img src={logo} alt='Lace Up' className='nav__logo' />
              </NavLink>
              <ClickDropdown
                mainTitle={'Dashboard'}
                mainRoute={'/dashboard'}
                items={mobileItems}
              />
            </nav>
          )}
        </>
      )}
    </header>
  )
}
export default Header
