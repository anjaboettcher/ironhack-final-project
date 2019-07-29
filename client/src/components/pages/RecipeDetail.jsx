import React, { useState, useEffect } from 'react'
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
} from 'reactstrap'
import ReactModal from 'react-modal'
import { useModal } from 'react-modal-hook'

export default function RecipeDetail(props) {
  const recipeId = props.match.params.recipeId
  const [recipe, setRecipe] = useState(null)
  const [user, setUser] = useState(null)
  const [showModal, hideModal] = useModal(() => (
    <ReactModal isOpen>
      <p>Do you want to delete this recipe?</p>
      <button onClick={deleteRecipe}>Yes, delete</button>
      <button onClick={hideModal}>No, keep in my cookbook</button>
    </ReactModal>
  ))

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

  const EditButton = () => <button className="my-4 recipe-button">Edit</button>
  const AddButton = () => (
    <button className="my-4 recipe-button">Add to list</button>
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
      return <AddToMyListButton />
    } else if (recipe._owner._id) {
      return (
        <div>
          <EditButton /> <AddButton /> <DeleteButton />
        </div>
      )
    }
  }

  if (!recipe) return <Loader size={10}>Loading...</Loader>

  // if recipe_owner id === logged in user id else display the other
  // button
  // console.log('recipe', recipe)
  // console.log('TEST TEST TEST recipe-owner-id', recipe._owner._id)
  // console.log('TEST TEST TEST user', user._id)

  return (
    <div>
      <Card className="shadow-none border-0">
        <CardImg
          top
          width="100%"
          src={recipe && recipe.picture}
          height="100%"
          alt="this-recipe-image"
        />
        <CardBody>
          <CardTitle>
            <h2 style={{ color: '#FD8664' }}>{recipe && <>{recipe.name}</>}</h2>
          </CardTitle>
          <CardSubtitle>
            <strong>Created by: </strong>
            <span>{recipe && <>{recipe._owner.username}</>}</span>
            {recipe._originalRecipe && recipe._originalRecipe._owner.username && (
              <>
                {' | '}
                <strong>Original recipe: </strong>
                <span>
                  {recipe && <>{recipe._originalRecipe._owner.username}</>}
                </span>
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
