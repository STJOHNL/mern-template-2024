import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'

const ClickDropdown = ({ items }) => {
  const [open, setOpen] = useState(false)

  const toggleDropdown = () => setOpen(!open)

  return (
    <div>
      {open ? (
        <AiOutlineClose onClick={toggleDropdown} className='nav__hamburger' />
      ) : (
        <FaBars onClick={toggleDropdown} className='nav__hamburger' />
      )}

      {open && (
        <div className='nav__dropdown'>
          {items.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              onClick={toggleDropdown}
              className={({ isActive }) =>
                isActive ? 'nav__link nav__link--active' : 'nav__link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}
export default ClickDropdown
