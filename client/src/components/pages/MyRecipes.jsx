import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import api from '../../api.js'
import { Col, Container } from 'reactstrap'
import { MDBCol } from 'mdbreact'
import { Link } from 'react-router-dom'
import Loader from 'react-dots-loader'

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    api.getMyRecipes().then(info => {
      console.log('TCL: MyRecipes -> info', info)
      //console.log("TCL: CrudTodos -> response", response);
      setRecipes(info)
      console.log('TCL: MyRecipes -> setRecipes', setRecipes)
    })
  }, [])

  useEffect(() => {
    api
      .getProfile()
      .then(user => {
        setUser(user)
      })
      .catch(err => console.log(err))
  }, [])

  if (!user) return null

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

  // function addRecipesToGroceryList(recipeId, personcount) {
  //   api
  //     .addIngredients(recipeId, personcount)
  //     .then(ingredients => {})
  //     .catch(err => console.log('catch: ', err))
  // }

  if (recipes.length === 0) {
    return (
      <Container>
        <h5 className="mt-4">
          You havent forked or created any recipes yet.{' '}
          <Link to={'/recipes/explore'}>Start exploring recipes now</Link>
        </h5>
      </Container>
    )
  } else if (recipes.length > 0 && !recipes) {
    return <Loader size={10}>Loading...</Loader>
  }

  return (
    <Col>
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          flexDirection: 'column',
          marginTop: '20px',
          marginBottom: '0px',
        }}
      >
        <div>
          <img
            className="my-recipes-profile-picture"
            alt="error"
            src={user.image}
          />
        </div>

        <h5
          style={{ marginBottom: '0px', marginTop: '10px' }}
          className="card-title"
        >
          Welcome {user.username}!
        </h5>
      </div>

      {/* <div style={{ display: 'flex', alignItems: 'flexstart' }}>
        <img className="recipe-profile-picture" alt="error" src={user.image} />
      </div> */}

      <div className="border-0 search-bar">
        <MDBCol>
          <div className="input-group md-form form-sm form-1 pl-0  ">
            <div className="input-group-prepend" />
            <input
              className="form-control my-0 py-1 rounded-pill"
              type="text"
              placeholder="Search your recipes..."
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
                />
              </Link>
            </div>
            <div className="my-recipe-text">
              {recipe.name.length < 40
                ? recipe.name
                : recipe.name.slice(0, 40) + '...'}
            </div>
          </div>
        ))}
      </div>
      {/* {JSON.stringify(recipes)} */}
    </Col>
  )
}
