import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const HoverDropdown = ({ mainRoute, mainTitle, items }) => {
  const [open, setOpen] = useState(false)

  const toggleDropdown = () => setOpen(!open)

  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <NavLink
        to={mainRoute}
        className={({ isActive }) =>
          isActive ? 'nav__link nav__link--active' : 'nav__link'
        }
      >
        {mainTitle}
      </NavLink>
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

export default HoverDropdown
