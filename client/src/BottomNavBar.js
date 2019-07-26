import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faSearch,
  faPlus,
  faList,
} from '@fortawesome/free-solid-svg-icons'

export default function BottomNavBar() {
  return (
    <Container
      className="BottomNavBar pt-2"
      style={{ backgroundColor: '#FD8664' }}
    >
      <Row>
        <Col>
          <FontAwesomeIcon
            icon={faUser}
            size="2x"
            className="icon"
            //     onClick={this.showEditForm}
          />
          <div style={{ fontSize: '65%' }}> Profile </div>
        </Col>
        <Col>
          <FontAwesomeIcon icon={faSearch} size="2x" className="icon" />
          <div style={{ fontSize: '65%' }}> Search </div>
        </Col>
        <Col>
          <FontAwesomeIcon icon={faPlus} size="2x" className="icon" />
          <div style={{ fontSize: '65%' }}> Create Recipe </div>
        </Col>
        <Col>
          <FontAwesomeIcon icon={faList} size="2x" className="icon" />
          <div style={{ fontSize: '65%' }}> List </div>
        </Col>
      </Row>
    </Container>
  )
}
