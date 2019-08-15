import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import api from '../../api.js'
import { MDBCol } from 'mdbreact'
import { Link } from 'react-router-dom'

export default function Explore() {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(null)

  // let NbrOfPeople = [
  //   { value: 1, label: '1' },
  //   { value: 2, label: '2' },
  //   { value: 3, label: '3' },
  //   { value: 4, label: '4' },
  //   { value: 5, label: '5' },
  //   { value: 6, label: '6' },
  //   { value: 7, label: '7' },
  //   { value: 8, label: '8' },
  //   { value: 9, label: '9' },
  //   { value: 10, label: '10' },
  // ]

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

  function handleChange(e) {
    setSearch(e.target.value)
  }

  function checkForUser(recipe) {
    return String(user._id) !== String(recipe._owner._id)
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
  }

  function removeDuplicates(allRecipes) {
    // return [...new Set(allRecipes)]

    if (allRecipes.length === 0) {
      return allRecipes
    }

    let sortedRecipes = allRecipes.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      } else return 1
    })

    let nonDuplicates = [sortedRecipes[0]]
    for (let i = 1; i < sortedRecipes.length; i++) {
      if (sortedRecipes[i].name !== sortedRecipes[i - 1].name) {
        nonDuplicates.push(sortedRecipes[i])
      }
    }
    return nonDuplicates
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
        {removeDuplicates(filterBySearch(recipes)).map((recipe, i) => (
          <div class="row">
            <div class="col-12 mt-3">
              <Link
                to={'/recipes/' + recipe._id}
                style={{ textDecoration: 'none', color: '#696A66' }}
              >
                <div class="card">
                  <div class="card-horizontal border">
                    {/* <div style={{ height: '100%', objectFit: 'cover' }}> */}
                    <div
                      style={{
                        width: '50%',
                        height: '100%',
                        display: 'flex',
                        flex: '1 1 auto',
                      }}
                    >
                      <img
                        className="img-square-wrapper"
                        alt="error"
                        src={recipe.picture}
                      />
                    </div>
                    {/* </div> */}

                    <div className="card-body-explore">
                      <h5 className="card-title">
                        {recipe.name.length < 30
                          ? recipe.name
                          : recipe.name.slice(0, 30) + '...'}
                      </h5>
                      <hr />
                      <img
                        className="recipe-profile-picture"
                        alt="error"
                        src={recipe._owner.image}
                      />
                      <br />
                      <strong>Cook:</strong> {recipe._owner.username} <br />{' '}
                      <strong>Duration:</strong> {recipe.duration}
                      <br />
                      <strong>Ingredients:</strong> {recipe.ingredients.length}
                      <hr style={{ marginBottom: '0px' }} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
