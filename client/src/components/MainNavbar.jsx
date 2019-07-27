import React, { useState } from 'react'
import api from '../api'
import { Link, NavLink as NLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

function MainNavbar(props) {
  const [isOpen, setIsOpen] = useState(false)
  function toggle() {
    setIsOpen(!isOpen)
  }
  function handleLogoutClick(e) {
    api.logout()
  }
  const links = [{ to: '/news', text: 'News' }]
  if (!api.isLoggedIn()) {
    links.push({ to: '/signup', text: 'Signup' })
    links.push({ to: '/login', text: 'Login' })
  }
  if (api.isLoggedIn()) {
    links.push({
      to: '/profile',
      text: 'Profile Settings',
      onClick: handleLogoutClick,
    })
    links.push({ to: '/', text: 'Logout', onClick: handleLogoutClick })
  }
  return (
    <Navbar
      style={{
        backgroundColor: '#FD8664',
        width: '100%',
      }}
      dark
      expand="sm"
    >
      <NavbarBrand tag={Link} to="/">
        Foodify
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {links.map(link => (
            <NavItem key={link.to}>
              <NavLink tag={NLink} to={link.to} exact onClick={link.onClick}>
                {link.text}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default withRouter(MainNavbar)

// function MainNavbar(props) {
//   function handleLogoutClick(e) {
//     api.logout()
//   }
//   return (
//     <nav className="App-header">
//       <h1 className="App-title">Foodify</h1>
//       <NavLink to="/" exact>
//         Home
//       </NavLink>
//       <NavLink to="/countries">Countries</NavLink>
//       <NavLink to="/add-country">Add country</NavLink>
//       {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
//       {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
//       {api.isLoggedIn() && (
//         <Link to="/" onClick={handleLogoutClick}>
//           Logout
//         </Link>
//       )}
//       <NavLink to="/secret">Secret</NavLink>
//     </nav>
//   )
// }

// export default withRouter(MainNavbar)
