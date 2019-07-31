import React, { useState } from 'react'
import api from '../../api'
import categories from '../../../src/categories.json'
import units from '../../../src/units.json'

import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Table,
} from 'reactstrap'
import Select from 'react-select'

export default function AddRecipe(props) {
  const [state, setState] = useState({
    name: '',
    description: '',
    picture: '/images/default-recipe-image.jpg',
    personcount: '',
    duration: '',
    categories: null,
    isPictureLoading: false, // TODO
  })

  const [message, setMessage] = useState(null)

  const [ingredient, setIngredient] = useState({
    item: '',
    qty: '',
    unit: null,
  })
  const [ingredientList, setIngredientList] = useState([])

  let categoryOptions = []
  for (let i = 0; i < categories.length; i++) {
    categoryOptions.push({ value: categories[i], label: categories[i] })
  }
  let unitOptions = []
  for (let i = 0; i < units.length; i++) {
    unitOptions.push({ value: units[i], label: units[i] })
  }

  function handleInputChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  function handleFileInputChange(event) {
    let pictureFile = event.target.files[0]
    api.uploadPicture(pictureFile).then(picture => {
      setState({
        ...state,
        picture,
      })
    })
  }

  function changeCategories(e) {
    setState({
      ...state,
      categories: e,
    })
  }
  //e.target.value
  //e.target.checked

  function newIngredient(e) {
    // e.preventDefault()
    console.log('we are here')
    setIngredient({
      ...ingredient,
      [e.target.name]: e.target.value,
    })
  }

  function changeUnits(e) {
    setIngredient({
      ...ingredient,
      unit: e,
    })
  }

  function addIngredientList(e) {
    e.preventDefault()
    console.log('we are here')
    setIngredientList([
      ...ingredientList,
      {
        item: ingredient.item,
        qty: ingredient.qty,
        unit: ingredient.unit.value,
      },
    ])
    // To clear input fields
    setIngredient({
      item: '',
      qty: '',
      unit: null,
    })
  }

  function deleteIngredient(index, e) {
    let copyIngredientList = [...ingredientList]
    setIngredientList(copyIngredientList.filter((ingredient, i) => i !== index))
  }

  function saveRecipe(e) {
    e.preventDefault()
    let savedCategories
    if (state.categories.length === 0) {
      savedCategories = []
    } else {
      savedCategories = state.categories.map(cat => cat.value)
    }
    let data = {
      name: state.name,
      description: state.description,
      ingredients: ingredientList,
      personcount: state.personcount,
      duration: state.duration,
      categories: savedCategories,
    }

    // if (
    //   data.name === '' ||
    //   data.description === '' ||
    //   data.ingredients === null
    // ) {
    //   console.log('You have not filled in the list properly')
    // }

    api
      .addRecipe(data)
      .then(result => {
        console.log('SUCCESS!')
        props.history.push('/recipes/my-recipes')
        // setMessage(`Your recipe has been created!`)
        // setTimeout(() => {
        //   setMessage(null)
        // }, 2000)
      })
      .catch(err => setState({ message: err.toString() }))
  }

  return (
    <div className="AddRecipe container mt-4">
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <Form>
        <h2 style={{ color: '#8AB661' }}>Create a new recipe</h2>
        <img className="recipe-picture" src={state.picture} alt="" />
        <FormGroup>
          {/* <Label for="exampleCustomFileBrowser">Picture</Label> */}
          <CustomInput
            type="file"
            id="exampleCustomFileBrowser"
            name="customFile"
            label="Upload a picture"
            onChange={handleFileInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Recipe name"
            value={state.name}
            onChange={handleInputChange}
          />
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="duration">Duration</Label>
              <Input
                type="text"
                name="duration"
                id="duration"
                placeholder="Duration"
                value={state.duration}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="personcount">Number of people</Label>
              <Input
                type="text"
                name="personcount"
                id="personcount"
                placeholder="Number of people"
                value={state.personcount}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label for="category">Categories</Label>
          <Select
            id="category"
            options={categoryOptions}
            value={state.categories}
            onChange={changeCategories}
            isMulti
          />
        </FormGroup>

        <Label for="quantity">Ingredients List</Label>
        <Row form>
          <Col md={12}>
            <Input
              placeholder="Item"
              name="item"
              value={ingredient.item}
              onChange={newIngredient}
            />
          </Col>
        </Row>
        <br />
        <Row form>
          <Col md={5}>
            {/* <Label for="quantity">Quantity</Label> */}
            <Input
              placeholder="Qty"
              name="qty"
              value={ingredient.qty}
              onChange={newIngredient}
            />
          </Col>
          <Col md={5}>
            {/* <Label for="unit">Unit</Label> */}
            <Select
              placeholder="Select unit"
              name="unit"
              id="unit"
              options={unitOptions}
              value={ingredient.unit}
              onChange={changeUnits}
            />
          </Col>
          <Col md={2}>
            <button className="add-ingredient mt-3" onClick={addIngredientList}>
              Add
            </button>
          </Col>
        </Row>

        <Table>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
            {ingredientList.map((ing, i) => (
              <tr key={i}>
                <th scope="row">{ing.item}</th>
                <td>{ing.qty}</td>
                <td>{ing.unit}</td>
                <td>
                  <input
                    type="button"
                    value="x"
                    onClick={() => deleteIngredient(i)}
                    className="delete-ingredient"
                  />
                </td>
              </tr>
            ))}
            <tr>
              <th scope="row">Example ingredient</th>
              <td>150</td>
              <td>gr</td>
              <td>
                <input type="button" value="x" className="delete-ingredient" />
              </td>
            </tr>
          </tbody>
        </Table>

        <FormGroup row>
          <Label for="description" sm={2}>
            Instructions
          </Label>
          <Col sm={10}>
            <Input
              type="textarea"
              name="description"
              id="description"
              value={state.description}
              onChange={handleInputChange}
            />
          </Col>
        </FormGroup>

        <button className="recipe-button mb-4" onClick={e => saveRecipe(e)}>
          Save
        </button>
      </Form>
      {message && <div className="info">{message}</div>}
    </div>
  )
}
