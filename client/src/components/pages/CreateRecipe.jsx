import React, { useState, Component } from 'react'
import api from '../../api'
import categories from '../../../src/categories.json'

import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap'
import Select from 'react-select'

export default function AddRecipe(props) {
  const [state, setState] = useState({
    _owner: '',
    _originalRecipe: '',
    name: '',
    description: '',
    ingredients: '',
    // [qty, unit: item ],
    picture: '',
    personcount: '',
    duration: '',
    categories: null,
  })
  const [message, setMessage] = useState(null)

  console.log(state)

  function handleInputChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
    // console.log('TCL state', state)
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

  let categoryOptions = []
  // =[
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' },
  // ]

  for (let i = 0; i < categories.length; i++) {
    categoryOptions.push({ value: categories[i], label: categories[i] })
  }

  function changeCategories(e) {
    let event = e.map(ev => ev.value)
    console.log('map', event)
    console.log('state.categories', state.categories)

    setState({
      ...state,
      categories: e,
    })

    //e.target.value
    //e.target.checked
    console.log('TCL state', state.value)
    console.log('TCL categories', state.categories)
  }

  let element = document.getElementById('auto')

  console.log('ping', element)

  function handleClick(e) {
    e.preventDefault()
    console.log(state.name, state.description)
    let data = {
      _owner: state._owner,
      _originalRecipe: state._originalRecipe,
      name: state.name,
      description: state.description,
      ingredients: state.ingredients,
      // [qty, unit: item ],
      picture: state.picture,
      personcount: state.personcount,
      duration: state.duration,
      categories: state.categories,
    }
    api
      .addRecipe(data)
      .then(result => {
        console.log('SUCCESS!')
        setState({
          _owner: '',
          _originalRecipe: '',
          name: '',
          description: '',
          ingredients: '',
          // [qty, unit: item ],
          picture: '',
          personcount: '',
          duration: '',
          categories: '',
        })
        setMessage(`Your recipe '${state.name}' has been created`)
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      })
      .catch(err => setState({ message: err.toString() }))
  }
  return (
    <div>
      {JSON.stringify(categories)}

      <Select
        options={categoryOptions}
        value={state.categories}
        onChange={changeCategories}
        isMulti
      />

      <div className="AddRecipe" />

      <Form>
        <Row form>
          <Col md={6}>
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

        <FormGroup>
          <Label for="exampleSelectMulti">Select Multiple</Label>
          <Input
            type="select"
            name="selectMulti"
            id="exampleSelectMulti"
            multiple
            // onChange={addCategories}
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Brunch">Brunch</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snacks">Snacks</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Select Multiple</Label>
          <Input type="select" name="bob" defaultValue="" multiple>
            <option>Breakfast</option>
            <option>Brunch</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snacks</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleAddress2">Address 2</Label>
          <Input
            type="text"
            name="address2"
            id="exampleAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleCity">City</Label>
              <Input type="text" name="city" id="exampleCity" />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="exampleState">State</Label>
              <Input type="text" name="state" id="exampleState" />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleZip">Zip</Label>
              <Input type="text" name="zip" id="exampleZip" />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup check>
          <Input type="checkbox" name="check" id="exampleCheck" />
          <Label for="exampleCheck" check>
            Check me out
          </Label>
        </FormGroup>
        <Button>Sign in</Button>
      </Form>
    </div>
  )
}
