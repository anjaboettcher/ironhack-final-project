import React, { useState, useEffect } from 'react'
import api from '../../api'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap'

export default function RecipeDetail(props) {
  const [recipe, setRecipe] = useState(null)

  const recipeId = props.match.params.recipeId
  console.log()

  useEffect(() => {
    api
      .getRecipe(recipeId)
      .then(recipe => {
        setRecipe(recipe)
      })
      .catch(err => console.log(err))
  }, [recipeId])

  console.log('recipe', recipe)

  if (!recipe) return <Loader>Loading...</Loader>

  return (
    <div>
      <Card>
        <CardImg
          top
          width="100%"
          className=""
          src={recipe && recipe.picture}
          height="100%"
          alt="this-recipe-image"
        />

        <CardBody>
          <CardTitle>
            <h5>{recipe && <>{recipe.name}</>}</h5>
          </CardTitle>
          <CardSubtitle>
            <strong>Created by: </strong>
            <span>{recipe && <>{recipe._owner.username}</>}</span>
          </CardSubtitle>
          <CardText>
            {recipe &&
              recipe.categories.map(category => (
                <div>
                  <button className="category-button">
                    {category && <>{category}</>}
                  </button>
                </div>
              ))}
            <ListGroupItem className="border-0">
              <strong>How many people? </strong>
              {recipe && <>{recipe.personcount}</>} |{' '}
              <FontAwesomeIcon icon={faClock} size="2x" className="icon" />
              {recipe && <>{recipe.duration}</>}
            </ListGroupItem>

            <ListGroup>
              <ListGroupItem className="border-0">
                <strong>Ingredients: </strong>
              </ListGroupItem>
              {recipe &&
                recipe.ingredients.map(ingredient => (
                  <div>
                    <ListGroupItem>
                      {ingredient.qty} {ingredient.unit} {ingredient.item}
                    </ListGroupItem>
                  </div>
                ))}
            </ListGroup>
            <ListGroupItem className="border-0">
              <strong>Instructions: </strong>
              <br />
              {recipe && <>{recipe.description}</>}
            </ListGroupItem>
          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}
