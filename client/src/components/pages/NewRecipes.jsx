import React, { useState } from 'react'
import api from '../../api'

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
    categories: '',
  })
  const [message, setMessage] = useState(null)

  console.log(state)

  function handleInputChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

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
    <div className="AddRecipe">
      Nothing here yet...sorry...
      {/* <h2>Add country</h2> */}
      {/* <form>
        Name:{' '}
        <input
          type="text"
          value={state.name}
          name="name"
          onChange={handleInputChange}
        />{' '}
        <br />
        Capitals:{' '}
        <input
          type="text"
          value={state.capitals}
          name="capitals"
          onChange={handleInputChange}
        />{' '}
        <br />
        Area:{' '}
        <input
          type="number"
          value={state.area}
          name="area"
          onChange={handleInputChange}
        />{' '}
        <br />
        Description:{' '}
        <textarea
          value={state.description}
          name="description"
          cols="30"
          rows="10"
          onChange={handleInputChange}
        />{' '}
        <br />
        <button onClick={e => handleClick(e)}>Create country</button>
      </form>
      {message && <div className="info">{message}</div>} */}
    </div>
  )
}
