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
  const links = [{ to: '/news', text: 'News' }]
  if (api.isLoggedIn()) {
    links.push({ to: '/my-recipes', text: 'My recipes' })
    links.push({ to: '/explore', text: 'Search' })
    links.push({ to: '/create-recipe', text: 'Create Recipe' })
    links.push({ to: '/list', text: 'List' })
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
          <FontAwesomeIcon icon={faUser} size="2x" />
          <div
            style={{
              fontSize: '55%',
            }}
          >
            {' '}
            YOUR RECIPES{' '}
          </div>
        </Col>
        <Col
          tag={NLink}
          style={{ color: 'white', textDecoration: 'none' }}
          to="/recipes/explore"
        >
          <FontAwesomeIcon icon={faSearch} size="2x" className="icon" />
          <div style={{ fontSize: '55%' }}> EXPLORE</div>
        </Col>
        <Col
          tag={NLink}
          style={{ color: 'white', textDecoration: 'none' }}
          to="/recipes/new-recipe"
        >
          <FontAwesomeIcon icon={faPlus} size="2x" className="icon" />
          <div style={{ fontSize: '55%' }}> NEW RECIPE </div>
        </Col>
        <Col
          tag={NLink}
          style={{ color: 'white', textDecoration: 'none' }}
          to="/recipes/list"
        >
          <FontAwesomeIcon icon={faList} size="2x" className="icon" />
          <div style={{ fontSize: '55%' }}> GROCERY LIST </div>
        </Col>
      </Row>
    </Navbar>
  )
}

export default withRouter(BottomNav2)
