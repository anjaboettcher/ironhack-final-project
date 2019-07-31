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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table,
} from 'reactstrap'
import Select from 'react-select'

export default function AddRecipe(props) {
  const [message, setMessage] = useState(null)
  const [state, setState] = useState({
    name: '',
    description: '',
    // ingredients: [],
    // [qty, unit, item ],
    // unit: null,
    picture: '',
    personcount: '',
    duration: '',
    categories: null,
  })
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
    console.log('e.target.name', e.target.name)
    console.log('ingredient', ingredient)
  }

  function changeUnits(e) {
    setIngredient({
      ...ingredient,
      unit: e,
    })
    console.log('ingredient', ingredient)
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

    console.log('ingredientList', ingredientList)
  }

  function deleteIngredient(index, e) {
    // e.preventDefault()
    // // Solution 1 with SPLICE
    // let copyIngredientList = [...ingredientList]
    // copyIngredientList.splice(index, 1) // Remove the element at position indexToRemove
    // setIngredientList(copyIngredientList) // State Update (setIngredients) MAY BE asynchronous
    // Solution 2
    let copyIngredientList = [...ingredientList]
    setIngredientList(copyIngredientList.filter((ingredient, i) => i !== index))
    console.log('TCL', ingredientList)
  }

  function saveRecipe(e) {
    e.preventDefault()
    console.log('state', state)
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
      // [qty, unit: item ],
      // picture: state.picture,
      personcount: state.personcount,
      duration: state.duration,
      categories: savedCategories,
    }
    console.log('categories', data.categories)

    if (
      data.name === '' ||
      data.description === '' ||
      data.ingredients === null
    ) {
      console.log('You have not filled in the list properly')
    }

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
      <Form>
        <h2 style={{ color: '#8AB661' }}>Create a new recipe</h2>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Recipe name"
            value={state.name}
            //checked={state.checked}
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
          <Label for="exampleCustomFileBrowser">
            File Browser with Custom Label
          </Label>
          <CustomInput
            type="file"
            id="exampleCustomFileBrowser"
            name="customFile"
            label="Yo, pick a file!"
          />
        </FormGroup>

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
            <button className="add-ingredient" onClick={addIngredientList}>
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
                <button className="delete-ingredient">x</button>
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

        <button className="recipe-button" onClick={e => saveRecipe(e)}>
          Save
        </button>
      </Form>
    </div>
  )
}

// function addCategoriesFail(e) {
//   let opts = []
//   let opt
//   for (let i = 0; i < e.target.options.length; i++) {
//     opt = e.target.options[i]
//     if (opt.selected) {
//       opts.push(opt.value)
//     }
//   }
//   setState({
//     ...state,
//     categories: opts,
//   })
//   console.log('TCL state', state.categories)
// }

// function handleClick(e) {
//   e.preventDefault()
//   console.log(state.name, state.description)
//   let data = {
//     _owner: state._owner,
//     _originalRecipe: state._originalRecipe,
//     name: state.name,
//     description: state.description,
//     ingredients: state.ingredients,
//     // [qty, unit: item ],
//     picture: state.picture,
//     personcount: state.personcount,
//     duration: state.duration,
//     categories: state.categories,
//   }
//   api
//     .addRecipe(data)
//     .then(result => {
//       console.log('SUCCESS!')
//       setState({
//         _owner: '',
//         _originalRecipe: '',
//         name: '',
//         description: '',
//         ingredients: '',
//         // [qty, unit: item ],
//         picture: '',
//         personcount: '',
//         duration: '',
//         categories: '',
//       })
//       setMessage(`Your recipe '${state.name}' has been created`)
//       setTimeout(() => {
//         setMessage(null)
//       }, 2000)
//     })
//     .catch(err => setState({ message: err.toString() }))
//}

// function addIngredient(e) {
//   e.preventDefault()
//   console.log('we are here')
//   setIngredient([
//     ...ingredient,
//     {
//       item: e.target.name,
//       qty: '',
//       unit: '',
//     },
//   ])
//   console.log('e.target.name', e.target.name)
//   console.log('ingredient', ingredient)
// }
