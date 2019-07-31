import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import api from '../../api.js'
import { Table, Button, Container } from 'reactstrap'
import Loader from 'react-dots-loader'
import Checkbox from 'react-simple-checkbox'

export default function MyRecipes() {
  const [list, setList] = useState([])

  useEffect(() => {
    api.getMyList().then(listItems => {
      console.log('TCL: MyRecipes -> info', listItems)
      //console.log("TCL: CrudTodos -> response", response);
      setList(listItems)
      console.log('TCL: MyRecipes -> setRecipes', setList)
    })
  }, [])

  function handleDelete(ingredientKey) {
    api
      .deleteIngredient(ingredientKey)
      .then(listItems => {
        console.log('TCL: MyRecipes -> info', listItems)
        //console.log("TCL: CrudTodos -> response", response);
        setList(listItems)
        console.log('TCL: MyRecipes -> setRecipes', setList)
      })
      .catch(err => console.log('catch: ', err))
  }

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>
              <strong>#</strong>
            </th>
            <th>
              <strong>Unit</strong>
            </th>
            <th>
              <strong>Ingredient</strong>
            </th>
            <th>
              <strong>Action</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {!list && <Loader size={10}>Loading...</Loader>}
          {list &&
            list.map((l, i) => (
              <tr key={i}>
                <th scope="row">
                  <Checkbox size="3" checked="true" color="#8ab661" />
                  {/* <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                  /> */}
                </th>
                <td>
                  {l.qty}
                  {l.unit}
                </td>
                <td>{l.item}</td>
                <td>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(i)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  )
}
