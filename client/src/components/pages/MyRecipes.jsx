import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import api from '../../api.js'
import { Container, Row, Col } from 'reactstrap'
import { MDBCol, MDBIcon } from 'mdbreact'

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.getRecipes().then(info => {
      console.log('TCL: MyRecipes -> info', info)
      //console.log("TCL: CrudTodos -> response", response);
      setRecipes(info)
      console.log('TCL: MyRecipes -> setRecipes', setRecipes)
    })
  }, [])

  function handleChange(e) {
    setSearch(e.target.value)
    console.log('search', search)
  }

  // This is the search bar
  function filterBySearch(allRecipes) {
    return allRecipes.filter(
      recipe =>
        recipe.name.toUpperCase().includes(search.toUpperCase()) ||
        recipe.categories
          .join()
          .toUpperCase()
          .includes(search.toUpperCase())
    )

    //Way number 2 of doing it!
    // let recipeList = []
    // for (let j = 0; j < allRecipes.length; j++) {
    //   if( allRecipes[j].name.toUpperCase().includes(search.toUpperCase())) {
    //     recipeList.push(allRecipes[j])
    //   }
    //   else {
    //   for (let k = 0; k < allRecipes[j].categories.length; k++) {
    //     if (
    //       allRecipes[j].categories[k]
    //         .toUpperCase()
    //         .includes(search.toUpperCase())
    //     ) {
    //       recipeList.push(allRecipes[j])
    //     }
    //   }
    //   }
    // }
    // console.log('recipeList', recipeList)
    // return recipeList
  }

  return (
    <div>
      <div class="border">
        <MDBCol md="6">
          <div className="input-group md-form form-sm form-1 pl-0">
            <div className="input-group-prepend">
              <span
                className="input-group-text green lighten-3"
                id="basic-text1"
              >
                <MDBIcon className="text-white" icon="search" />
              </span>
            </div>
            <input
              className="form-control my-0 py-1"
              type="text"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={handleChange}
            />
          </div>
        </MDBCol>
      </div>
      <Container>
        {filterBySearch(recipes).map((recipe, i) => (
          <Row key={i} className="m-2">
            {/* {recipe.categories} */}
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
