import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { ListGroup, ListGroupItem, Container } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUsers } from '@fortawesome/free-solid-svg-icons'
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  FormGroup,
  Label,
} from 'reactstrap'
import ReactModal from 'react-modal'
import { useModal } from 'react-modal-hook'
import Select from 'react-select'

import { faList } from '@fortawesome/free-solid-svg-icons'

export default function RecipeDetail(props) {
  let personcountVariable
  const recipeId = props.match.params.recipeId
  const [recipe, setRecipe] = useState(null)
  //const [ingredients, setIngredients] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({
    fork: null,
    add: null,
  })
  const [showModal, hideModal] = useModal(() => (
    <ReactModal
      isOpen
      style={{
        overlay: {
          backgroundColor: 'white',
        },
        content: {
          color: 'lightsteelblue',
        },
      }}
    >
      <span>Do you want to delete this recipe?</span>
      <button
        className="recipe-button"
        style={{ backgroundColor: 'red', color: 'white', border: '0' }}
        onClick={deleteRecipe}
      >
        Yes, delete
      </button>
      <button className="recipe-button" onClick={hideModal}>
        No, keep in my cookbook
      </button>
    </ReactModal>
  ))

  // let NbrOfPeople = []
  // for (let i = 0; i < categories.length; i++) {
  //   categoryOptions.push({ value: categories[i], label: categories[i] })

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

  function changePersonCount(e) {
    personcountVariable = e
    recipe.personcount = e.value
    for (let i = 0; i < recipe.ingredients.length; i++) {
      recipe.ingredients[i].qty =
        Math.round(recipe.ingredients[i].qtyPerPerson * e.value * 2) / 2
    }
    setRecipe({
      ...recipe,
    })
  }

  function deleteRecipe() {
    console.log('props', props.history)
    api
      .deleteRecipe(recipeId)
      .then(recipe => {
        console.log('deleted')
        props.history.push('/recipes/my-recipes')
      })
      .catch(err => console.log('catch: ', err))
  }

  function forkThisRecipe() {
    console.log('Trying...')
    api
      .forkRecipe(recipeId)
      .then(recipe => {
        setMessage({ ...message, fork: `Recipe successfully forked!` })
        setTimeout(() => {
          setMessage({ ...message, fork: null })
        }, 10000)
        console.log('done...')
      })
      .catch(err => console.log('catch: ', err))
  }

  function addRecipesToGroceryList(recipeId) {
    console.log('TEST11111111', recipeId)
    api
      .addIngredients(recipeId, recipe.personcount) // Edit here unsure
      .then(ingredients => {
        setMessage({
          ...message,
          add: `Ingredients have been added to grocery list`,
        })
        setTimeout(() => {
          setMessage({ ...message, add: null })
        }, 10000)
      })
      .catch(err => console.log('catch: ', err))
  }

  const EditButton = () => (
    <Link
      to={`/recipes/${recipeId}/edit-recipe`}
      className="my-3 recipe-button-orange"
    >
      Edit
    </Link>
  )
  const AddButton = () => (
    <button
      className="my-3 recipe-button-orange"
      onClick={() => addRecipesToGroceryList(recipe._id)}
    >
      <FontAwesomeIcon icon={faList} size="1x" className="icon" /> Add to
      Grocery List
    </button>
  )
  const DeleteButton = props => (
    <button className="my-3 delete-button-details-page" onClick={showModal}>
      Delete
    </button>
  )
  const AddToMyListButton = () => (
    <button className="my-3 recipe-button-orange" onClick={forkThisRecipe}>
      Fork this recipe
    </button>
  )

  //if user is logged out, you get an
  // const recipeId = props.match.params.recipeId
  // useEffect(() => {
  //   Promise.all([api.getProfile(), api.getRecipe(recipeId)])
  //     .then(([user, recipe]) => {
  //       setUser(user)
  //       setRecipe(recipe)
  //     })
  //     .catch(err => console.log(err))
  // }, [recipeId])

  useEffect(() => {
    api
      .getProfile()
      .then(user => {
        console.log('i ammmmmm useer ', user._id)
        setUser(user)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    api
      .getRecipe(recipeId)
      .then(recipe => {
        setRecipe(recipe)
      })
      .catch(err => console.log(err))
  }, [recipeId])

  const ButtonType2 = ({ recipe, user }) => {
    if (recipe._owner._id) {
      return <AddButton />
    }
  }

  const ButtonType = ({ recipe, user }) => {
    if (!api.isLoggedIn() || recipe._owner._id !== user._id) {
      return (
        <div className="border-0">
          <AddToMyListButton />
        </div>
      )
    } else if (recipe._owner._id) {
      return (
        <div className="border-0">
          <EditButton /> <DeleteButton />
        </div>
      )
    }
  }

  if (!recipe || !user) return <Loader size={10}>Loading...</Loader>

  return (
    <div>
      <Card className="shadow-none border-0">
        <CardImg
          top
          src={recipe && recipe.picture}
          max-height="300px"
          width="auto"
          alt="this-recipe-image"
          className="card-img-top"
        />
        <CardBody>
          <CardTitle>
            <h2 style={{ color: '#FD8664' }}>{recipe && <>{recipe.name}</>}</h2>
          </CardTitle>
          <Container>
            {message.fork && <div className="info mb-4">{message.fork}</div>}
            {/* <pre>{JSON.stringify(message, null, 2)}</pre> */}
            <ButtonType recipe={recipe} user={user} />
          </Container>
          <CardSubtitle>
            <strong>Created by: </strong>

            {/* <pre>{JSON.stringify(recipe._owner)}</pre> */}
            <span>{recipe && <>{recipe._owner.username}</>}</span>
            {recipe._originalRecipe && (
              <>
                {' | '}
                <strong>Forked from: </strong>
                <span>{recipe._originalRecipe._owner.username}</span>
              </>
            )}
          </CardSubtitle>
          <Container>
            {recipe &&
              recipe.categories.map((category, i) => (
                <button key={i} className="category-button">
                  {category && <>{category}</>}
                </button>
              ))}
            <ListGroupItem className="border-0">
              <h6>
                <FontAwesomeIcon icon={faUsers} className="icon fa-lg" />
                {'  '}
                {recipe && <>{recipe.personcount} people </>}
                {'  '}
                {'  '}
                <FontAwesomeIcon icon={faClock} className="icon fa-lg" />
                {'  '}
                {recipe && <>{recipe.duration} </>}
                {'  '}
              </h6>
            </ListGroupItem>

            <FormGroup>
              <Label for="personcount">For how many people?</Label>
              <Select
                id="personcount"
                options={NbrOfPeople}
                value={personcountVariable}
                onChange={changePersonCount}
              />
            </FormGroup>

            <ListGroup>
              <ListGroupItem className="border-0">
                <h5 style={{ color: '#8AB661' }}>Ingredients:</h5>
              </ListGroupItem>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                }}
              >
                {recipe &&
                  recipe.ingredients.map((ingredient, i) => (
                    <span key={i}>
                      {ingredient.qty} {ingredient.unit} {ingredient.item}
                    </span>
                  ))}
              </div>

              {message.add && <div className="info mb-4">{message.add}</div>}
              {/* <pre>{JSON.stringify(message, null, 2)}</pre> */}
              <ButtonType2 recipe={recipe} user={user} />
            </ListGroup>

            <span className="border-0">
              <h5 className="mt-2" style={{ color: '#8AB661' }}>
                Preparations:
              </h5>
              <br />
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {recipe && <>{recipe.description}</>}
              </div>
            </span>
            <div>
              {message.fork && <div className="info">{message.fork}</div>}
              {/* <pre>{JSON.stringify(message, null, 2)}</pre> */}
              <ButtonType recipe={recipe} user={user} />
            </div>
          </Container>
        </CardBody>
      </Card>
    </div>
  )
}
// hello
