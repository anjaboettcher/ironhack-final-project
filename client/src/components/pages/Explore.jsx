import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import api from '../../api.js'

import { MDBCol } from 'mdbreact'
import { Link } from 'react-router-dom'

export default function Explore() {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    api.exploreRecipes().then(info => {
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
        console.log('i ammmmmm useer ', user._id)
        setUser(user)
      })
      .catch(err => console.log(err))
  }, [])

  if (!user) return null

  function handleChange(e) {
    setSearch(e.target.value)
    console.log('search', search)
  }

  function forkThisRecipe(recipeId) {
    console.log('Trying...')
    api
      .forkRecipe(recipeId)
      .then(recipe => {
        console.log('done...')
      })
      .catch(err => console.log('catch: ', err))
  }

  function checkForUser(recipe) {
    return String(user._id) !== String(recipe._owner._id)
  }

  function addRecipesToGroceryList(recipeId) {
    api
      .addIngredients(recipeId)
      .then(ingredients => {})
      .catch(err => console.log('catch: ', err))
  }

  // This is the search bar
  function filterBySearch(allRecipes) {
    return allRecipes.filter(checkForUser).filter(
      recipe =>
        recipe.name.toUpperCase().includes(search.toUpperCase()) ||
        recipe.categories
          .join()
          .toUpperCase()
          .includes(search.toUpperCase()) ||
        recipe._owner.username.toUpperCase().includes(search.toUpperCase())
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
      <MDBCol>
        <div className="input-group md-form form-sm form-1 pl-0">
          <div className="input-group-prepend ">
            {/* <span className="input-group-text green lighten-3" id="basic-text1">
              <MDBIcon className="text-white" icon="search" />
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

      <div class="container-fluid">
        {filterBySearch(recipes).map((recipe, i) => (
          <div class="row">
            <div class="col-12 mt-3">
              <div class="card">
                <div class="card-horizontal">
                  <div class="">
                    <Link to={'/recipes/' + recipe._id}>
                      <img
                        className=""
                        alt="error"
                        width="200px"
                        height="250px"
                        src={recipe.picture}
                      />
                    </Link>
                  </div>
                  <div className="card-body">
                    <Link
                      to={'/recipes/' + recipe._id}
                      style={{ textDecoration: 'none', color: '#696A66' }}
                    >
                      <h5 className="card-title">{recipe.name}</h5>
                      <hr />

                      <div className="mb-3">
                        <strong>Cook:</strong> {recipe._owner.username}
                        <br />
                        <strong>Recipe Duration:</strong> {recipe.duration}
                        <br />
                        <strong>Ingredients:</strong>{' '}
                        {recipe.ingredients.length}
                      </div>
                    </Link>
                    <hr />

                    <button
                      color="secondary"
                      block
                      className="recipe-card-button"
                      onClick={() => forkThisRecipe(recipe._id)}
                    >
                      Fork Recipe
                    </button>
                    <button
                      color="primary"
                      size="sm"
                      block
                      className="recipe-card-button ml-2"
                      onClick={() => addRecipesToGroceryList(recipe._id)}
                    >
                      Grocery List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
