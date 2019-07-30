import React, { useState, Component } from 'react'
import api from '../../api'
import categories from '../../../src/categories.json'
import units from '../../../src/units.json'

import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap'
import Select from 'react-select'

export default function AddRecipe(props) {
  const [message, setMessage] = useState(null)
  const [state, setState] = useState({
    _owner: '',
    _originalRecipe: '',
    name: '',
    description: '',
    ingredients: [],
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
    console.log('ingredientList', ingredientList)
  }

  function handleInputChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  let categoryOptions = []
  for (let i = 0; i < categories.length; i++) {
    categoryOptions.push({ value: categories[i], label: categories[i] })
  }

  function changeCategories(e) {
    setState({
      ...state,
      categories: e,
    })
  }
  //e.target.value
  //e.target.checked

  let unitOptions = []
  for (let i = 0; i < units.length; i++) {
    unitOptions.push({ value: units[i], label: units[i] })
  }

  return (
    <div className="AddRecipe">
      <Form>
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
                value={state.personcount}
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
        <InputGroup>
          <Input
            placeholder="Item"
            name="item"
            value={ingredient.item}
            onChange={newIngredient}
          />
          <InputGroupAddon addonType="append">
            <InputGroupText
              style={{ backgroundColor: 'green', color: 'white' }}
              onClick={addIngredientList}
            >
              Create
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <Row form>
          <Col md={3}>
            {/* <Label for="quantity">Quantity</Label> */}
            <Input
              placeholder="Qty"
              name="qty"
              value={ingredient.qty}
              onChange={newIngredient}
            />
          </Col>
          <Col md={3}>
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
        </Row>

        <FormGroup row>
          <Label for="exampleText" sm={2}>
            Instruction
          </Label>
          <Col sm={10}>
            <Input type="textarea" name="text" id="exampleText" />
          </Col>
        </FormGroup>

        <Button>Save</Button>
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
