import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import api from '../../api.js'
import { Container, Row, Col } from 'reactstrap'

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    api.getRecipes().then(info => {
      console.log('TCL: MyRecipes -> info', info)
      //console.log("TCL: CrudTodos -> response", response);
      setRecipes(info)
      console.log('TCL: MyRecipes -> setRecipes', setRecipes)
    })
  }, [])

  return (
    <div>
      <div>Search Bar</div>
      <Container>
        {recipes.map((recipe, i) => (
          <Row key={i} className="m-2">
            <Col className=" box m-2">
              <img
                className="image"
                alt="error"
                width="100%"
                src={recipe.picture}
              />
              <div className="boxText"> {recipe.name}</div>
            </Col>
            <Col className=" box m-2">
              <img
                className="image"
                alt="error"
                width="100%"
                src={recipe.picture}
              />
              <div className="boxText"> {recipe.name}</div>
            </Col>
          </Row>
        ))}

        {/* {recipes.map((recipe, i) => (
          <div className="boxcontainer m-2">
            <div className=" box m-2">
              <img alt="error" width="100%" src={recipe.picture} />
              <div className="boxText"> {recipe.name}</div>
            </div>
          </div>
        ))} */}

        <Row className="m-2">
          <Col className="box m-2">.col</Col>
          <Col className="box m-2">.col</Col>
        </Row>
      </Container>
      {/* {JSON.stringify(recipes)} */}
      cxgdfxgd
    </div>
  )
}
