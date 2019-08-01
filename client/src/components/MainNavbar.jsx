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

  // {api.isLoggedIn() ? <Route path="/add-library" component={AddLibrary} /> : <Route path="/add-library" component={Login} />}

  const links = [{ to: '/news', text: 'News' }]
  if (!api.isLoggedIn()) {
    links.push({ to: '/signup', text: 'Signup' })
    links.push({ to: '/login', text: 'Login' })
  }
  if (api.isLoggedIn()) {
    links.push({
      to: '/profile',
      text: 'Profile Settings',
    })
    links.push({ to: '/', text: 'Logout', onClick: handleLogoutClick })
  }

  const getTitle = () => {
    const titles = {
      '/recipes/create-recipe': ' Create recipe',
      '/recipes/my-recipes': ' My recipes',
      '/recipes/explore': ' Explore',
      '/my-list': ' Grocery List',
      '/news': ' News',
      '/profile': ' Profile',
      '/logout': ' Logout',
      '/signup': ' Sign Up',
      '/login': ' Log In',
      '/recipes/*': ' Recipe Detail',
    }

    const path = window.location.pathname
    const match = Object.keys(titles).find(key => !!path.match(key))
    return titles[match]
  }

  return (
    <Navbar
      style={{
        backgroundColor: '#F6F6F1',
        width: '100%',
        boxShadow: 'none',
      }}
      light
      expand="sm"
    >
      <NavbarBrand
        tag={Link}
        to="/"
        style={{
          fontWeight: 'semi-bold',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}
      >
        <img
          src={'../images/fork-test-black.png'}
          alt="fork"
          className="img-responsive"
          height="30"
        />
        {getTitle()}
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" style={{ boxShadow: 'none' }} navbar>
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
