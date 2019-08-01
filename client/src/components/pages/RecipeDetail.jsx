import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUsers } from '@fortawesome/free-solid-svg-icons'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  FormGroup,
  Label,
} from 'reactstrap'
import ReactModal from 'react-modal'
import { useModal } from 'react-modal-hook'
import Select from 'react-select'

export default function RecipeDetail(props) {
  let personcountVariable
  const recipeId = props.match.params.recipeId
  const [recipe, setRecipe] = useState(null)
  //const [ingredients, setIngredients] = useState([])
  const [user, setUser] = useState(null)
  const [showModal, hideModal] = useModal(() => (
    <ReactModal
      isOpen
      style={{
        overlay: {
          backgroundColor: 'papayawhip',
        },
        content: {
          color: 'lightsteelblue',
        },
      }}
    >
      <p>Do you want to delete this recipe?</p>
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
        console.log('done...')
      })
      .catch(err => console.log('catch: ', err))
  }

  function addRecipesToGroceryList(recipeId) {
    console.log('TEST11111111', recipeId)
    api
      .addIngredients(recipeId, recipe.personcount) // Edit here unsure
      .then(ingredients => {
        console.log('done...')
        console.log('recipeId', recipeId, ingredients)
      })
      .catch(err => console.log('catch: ', err))
  }

  const EditButton = () => (
    <Link to={`/recipes/${recipeId}/edit-recipe`}>
      <button className="my-4 recipe-button">Edit</button>
    </Link>
  )
  const AddButton = () => (
    <button
      className="my-4 recipe-button"
      onClick={() => addRecipesToGroceryList(recipe._id)}
    >
      Add to Grocery List
    </button>
  )
  const DeleteButton = props => (
    <button className="my-4 recipe-button" onClick={showModal}>
      Delete
    </button>
  )
  const AddToMyListButton = () => (
    <button className="my-4 recipe-button" onClick={forkThisRecipe}>
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

  const ButtonType = ({ recipe, user }) => {
    if (!api.isLoggedIn() || recipe._owner._id !== user._id) {
      return (
        <div>
          <AddToMyListButton />
          <AddButton />
        </div>
      )
    } else if (recipe._owner._id) {
      return (
        <div>
          <EditButton /> <AddButton /> <DeleteButton />
        </div>
      )
    }
  }

  // const ButtonType2 = ({ recipe, user }) => {
  //   if (!api.isLoggedIn() || recipe._owner._id !== user._id) {
  //     return (
  //       <div>
  //         <AddToMyListButton />
  //       </div>
  //     )
  //   }
  // }

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
          <CardSubtitle>
            <strong>Created by: </strong>

            {/* <pre>{JSON.stringify(recipe._owner)}</pre> */}
            <span>{recipe && <>{recipe._owner.username}</>}</span>
            {recipe._originalRecipe && (
              <>
                {' | '}
                {/* <strong>Original recipe: </strong>
                <span>{recipe._originalRecipe._owner.username}</span> */}
              </>
            )}
          </CardSubtitle>
          <CardText>
            {recipe &&
              recipe.categories.map(category => (
                <button className="category-button">
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
                  recipe.ingredients.map(ingredient => (
                    <span>
                      {ingredient.qty} {ingredient.unit} {ingredient.item}
                    </span>
                  ))}
              </div>
              {/* <ButtonType2 recipe={recipe} user={user} /> */}
            </ListGroup>
            <ListGroupItem className="border-0">
              <h5 style={{ color: '#8AB661' }}>Preparations:</h5>
              <br />
              <span>{recipe && <>{recipe.description}</>}</span>
            </ListGroupItem>
            <ButtonType recipe={recipe} user={user} />
          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}
