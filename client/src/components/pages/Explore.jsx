import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import api from '../../api.js'
import { MDBCol } from 'mdbreact'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faList } from '@fortawesome/free-solid-svg-icons'
import { FormGroup, Label } from 'reactstrap'
import ReactModal from 'react-modal'
import Select from 'react-select'

export default function Explore() {
  const [personcount, setPersoncount] = useState({
    value: 4,
    label: '4 people',
  })
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(null)

  let NbrOfPeople = [
    { value: 1, label: '1 person' },
    { value: 2, label: '2 people' },
    { value: 3, label: '3 people' },
    { value: 4, label: '4 people' },
    { value: 5, label: '5 person' },
    { value: 6, label: '6 people' },
    { value: 7, label: '7 people' },
    { value: 8, label: '8 people' },
    { value: 9, label: '9 people' },
    { value: 10, label: '10 people' },
  ]

  useEffect(() => {
    api.exploreRecipes().then(info => {
      setRecipes(info)
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

  function changePersonCount(e) {
    console.log(e)
    setPersoncount(e)
  }

  function handleChange(e) {
    setSearch(e.target.value)
  }

  function forkThisRecipe(recipeId) {
    api
      .forkRecipe(recipeId)
      .then(recipe => {})
      .catch(err => console.log('catch: ', err))
  }

  function checkForUser(recipe) {
    return String(user._id) !== String(recipe._owner._id)
  }

  function addRecipesToGroceryList(recipeId, personcount) {
    //console.log('personcount', personcount)
    //console.log('recipeId', recipeId)
    api
      .addIngredients(recipeId, personcount)
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

      <FormGroup>
        <Select
          id="perosncount"
          options={NbrOfPeople}
          value={personcount}
          onChange={changePersonCount}
        />
      </FormGroup>

      <div class="container-fluid">
        {filterBySearch(recipes).map((recipe, i) => (
          <div class="row">
            <div class="col-12 mt-3">
              <div class="card">
                <div class="card-horizontal">
                  <div class="">
                    <Link to={'/recipes/' + recipe._id}>
                      <div class="img-square-wrapper">
                        <img
                          className=""
                          alt="error"
                          width="100%"
                          max-width="100px"
                          height="auto"
                          src={recipe.picture}
                        />
                      </div>
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
                        <strong>Duration:</strong> {recipe.duration}
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
                      className="recipe-button ml-2"
                      onClick={() =>
                        addRecipesToGroceryList(recipe._id, personcount.value)
                      }
                    >
                      Grocery List
                    </button>
                  </div>
                </div>
                <div class="card-footer">
                  <button
                    color="secondary"
                    block
                    className="recipe-card-button mr-2"
                    onClick={() => forkThisRecipe(recipe._id)}
                  >
                    {' '}
                    <img
                      src={'../images/fork-green.png'}
                      alt="fork"
                      className="img-responsive"
                      height="20"
                    />
                    Fork Recipe
                  </button>
                  <button
                    color="primary"
                    size="sm"
                    block
                    className="recipe-card-button "
                    onClick={() =>
                      addRecipesToGroceryList(recipe._id, recipe.personcount)
                    }
                  >
                    {' '}
                    <FontAwesomeIcon
                      icon={faList}
                      size="1x"
                      className="icon"
                    />{' '}
                    Add to grocery list
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
