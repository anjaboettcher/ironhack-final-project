import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import api from '../../api.js'
import { Col, Button, Container } from 'reactstrap'
import { MDBCol } from 'mdbreact'
import { Link } from 'react-router-dom'

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.getMyRecipes().then(info => {
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
  }

  function addRecipesToGroceryList(recipeId) {
    api
      .addIngredients(recipeId)
      .then(ingredients => {})
      .catch(err => console.log('catch: ', err))
  }

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

  if (recipes.length === 0)
    return (
      <Container>
        <h5 className="mt-4">
          You havent forked or created any recipes yet.{' '}
          <Link to={'recipes/explore'}>Start exploring recipes now</Link>
        </h5>
      </Container>
    )

  return (
    <Col>
      <div className="border-0 search-bar ">
        <MDBCol>
          <div className="input-group md-form form-sm form-1 pl-0  ">
            <div className="input-group-prepend">
              {/* <span
                className="input-group-text green lighten-3 "
                id="basic-text1"
              >
                <MDBIcon className="text-white rounded-right" icon="search" />
              </span> */}
            </div>
            <input
              className="form-control my-0 py-1 rounded-pill"
              type="text"
              placeholder="Search for a recipe..."
              aria-label="Search"
              value={search}
              onChange={handleChange}
            />
          </div>
        </MDBCol>
      </div>
      <div className="grid">
        {filterBySearch(recipes).map((recipe, i) => (
          <div className="box">
            <div className="imgBox" tag={Link} to="/">
              <Link to={'/recipes/' + recipe._id}>
                <img
                  className="image"
                  alt="error"
                  width="130px"
                  height="130px"
                  src={recipe.picture}
                  // src={
                  //   'https://www.asaucykitchen.com/wp-content/uploads/2019/04/Tomato-Coconut-Curry-Chicken.jpg'
                  // }
                />
              </Link>

              <Link
                to={'/recipes/' + recipe._id}
                style={{ textDecoration: 'none', color: '#696A66' }}
              >
                <div className="boxText border-0 text-uppercase">
                  <div> {recipe.name} </div>
                </div>
              </Link>
            </div>
            <div class="buttons">
              <Button
                color="success"
                size="sm"
                block
                className=" m-0 p-1"
                onClick={() => addRecipesToGroceryList(recipe._id)}
              >
                Add to List
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* {JSON.stringify(recipes)} */}
    </Col>
  )
}
