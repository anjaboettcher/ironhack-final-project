import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink as NLink } from 'react-router-dom'

import {
  faUser,
  faSearch,
  faPlus,
  faList,
} from '@fortawesome/free-solid-svg-icons'

export default function BottomNavBar() {
  return (
    <Container
      className="BottomNavBar pt-2 pb-2"
      style={{ backgroundColor: '#FD8664' }}
    >
      <Row>
        <Col style={{ color: 'black' }} tag={Link} to="/recipes/my-recipes">
          <FontAwesomeIcon
            icon={faUser}
            size="2x"
            className="icon"
            //     onClick={this.showEditForm}
          />
          <div style={{ fontSize: '65%' }}> Profile </div>
        </Col>
        <Col style={{ color: 'black' }} tag={Link} to="/">
          <FontAwesomeIcon icon={faSearch} size="2x" className="icon" />
          <div style={{ fontSize: '65%' }}> Search </div>
        </Col>
        <Col style={{ color: 'black' }} tag={Link} to="/">
          <FontAwesomeIcon icon={faPlus} size="2x" className="icon" />
          <div style={{ fontSize: '65%' }}> Create Recipe </div>
        </Col>
        <Col style={{ color: 'black' }} tag={Link} to="/">
          <FontAwesomeIcon icon={faList} size="2x" className="icon" />
          <div style={{ fontSize: '65%' }}> List </div>
        </Col>
      </Row>
    </Container>
  )
}
