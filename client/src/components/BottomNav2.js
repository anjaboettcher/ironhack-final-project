import React from 'react'
import api from '../api'
import { withRouter } from 'react-router'
import { Navbar, Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink as NLink } from 'react-router-dom'
import {
  faUser,
  faSearch,
  faPlus,
  faList,
} from '@fortawesome/free-solid-svg-icons'

function BottomNav2(props) {
  const links = [{ to: '/', text: 'Home' }, { to: '/explore', text: 'Search' }]
  if (api.isLoggedIn()) {
    links.push({ to: '/my-recipes', text: 'My recipes' })
    links.push({ to: '/explore', text: 'Search' })
    links.push({ to: '/create-recipe', text: 'Create Recipe' })
    links.push({ to: '/my-list', text: 'List' })
  }

  return (
    <Navbar
      className="bottom-nav-items"
      fixed="bottom"
      expand="lg"
      variant="light"
      bg="light"
      style={{
        backgroundColor: '#FD8664',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '5px 0px',
      }}
    >
      <Row
        style={{
          backgroundColor: '#FD8664',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'space-evenly',
          alignContent: 'center',
        }}
      >
        <Col
          tag={NLink}
          style={{ color: 'white', textDecoration: 'none' }}
          to="/recipes/my-recipes"
        >
          <FontAwesomeIcon icon={faUser} size="1.5x" />
          <div
            style={{
              fontSize: '45%',
            }}
          >
            {' '}
            MY RECIPES{' '}
          </div>
        </Col>
        <Col
          tag={NLink}
          style={{ color: 'white', textDecoration: 'none' }}
          to="/recipes/explore"
        >
          <FontAwesomeIcon icon={faSearch} size="1.5x" className="icon" />
          <div style={{ fontSize: '45%' }}> EXPLORE</div>
        </Col>
        <Col
          tag={NLink}
          style={{ color: 'white', textDecoration: 'none' }}
          to="/recipes/create-recipe"
        >
          <FontAwesomeIcon icon={faPlus} size="1.5x" className="icon" />
          <div style={{ fontSize: '45%' }}> NEW RECIPE </div>
        </Col>
        <Col
          tag={NLink}
          style={{ color: 'white', textDecoration: 'none' }}
          to="/my-list"
        >
          <FontAwesomeIcon icon={faList} size="1.5x" className="icon" />
          <div style={{ fontSize: '45%' }}> GROCERY LIST </div>
        </Col>
      </Row>
    </Navbar>
  )
}

export default withRouter(BottomNav2)
