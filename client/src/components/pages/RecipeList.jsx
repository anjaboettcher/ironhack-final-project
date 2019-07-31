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

  function handleDeleteWholeList() {
    api
      .removeMyList()
      .then(() => {
        console.log('List deleted')
        //console.log("TCL: CrudTodos -> response", response);
        setList([])
        console.log('TCL: MyRecipes -> setRecipes', setList)
      })
      .catch(err => console.log('catch: ', err))
  }

  function handleClick(i) {
    if (list[i].checked === true) {
      list[i].checked = false
    } else {
      // list[i].checked = true
      list[i].checked = true
    }
    setList([...list])
  }

  // function sortIngredients(numbers) {
  //   let result = numbers.sort((a, b) => {
  //     if (a.checked < b.checked) {
  //       return -1
  //     } else return 1
  //   })
  //   console.log('TEST', result)
  //   return result
  // }

  if (list.length === 0) return <h5>You havent added any ingredients</h5>

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
            // sortIngredients(list)
            list.map((l, i) => (
              <tr key={i}>
                <th scope="row" className="ClickablePicture">
                  <Checkbox
                    size="3"
                    checked={l.checked}
                    color="#8ab661"
                    onChange={() => handleClick(i)}
                  />
                </th>
                <td>
                  {l.qty} {l.unit}
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
      <Button color="danger" size="sm" onClick={() => handleDeleteWholeList()}>
        Delete all
      </Button>
    </Container>
  )
}
