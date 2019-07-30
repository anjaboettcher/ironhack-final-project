import React, { useState } from 'react'
import api from '../../api'
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap'

export default function Signup(props) {
  const [state, setState] = useState({
    email: '',
    username: '',
    password: '',
    message: null,
  })

  function handleInputChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  function handleClick(e) {
    e.preventDefault()
    let data = {
      email: state.email,
      username: state.username,
      password: state.password,
    }
    api
      .signup(data)
      .then(result => {
        console.log('SUCCESS!')
        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setState({ message: err.toString() }))
  }

  //Something is off with out signup, error message "please indicate email and password" - I think it might be connected to the passport?
  return (
    <Container className="App mt-4">
      <h2 style={{ color: '#8AB661' }}>SIGN UP</h2>
      <Form className="form">
        <Col>
          <FormGroup>
            <Label>Email: </Label>
            <Input
              className="rounded-pill"
              type="text"
              name="email"
              id="exampleEmail"
              placeholder="myemail@email.com"
              value={state.email}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="examplePassword">Username:</Label>
            <Input
              className="rounded-pill"
              type="text"
              name="username"
              id="username"
              placeholder="my_awesome_username"
              value={state.username}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              className="rounded-pill"
              type="password"
              name="password"
              id="examplePassword"
              placeholder="********"
              value={state.password}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Col>
        <p className="form-text text-muted mb-4">
          {' '}
          Do you already have an account?{' '}
          <a style={{ color: '#8AB661' }} href="/login">
            Login
          </a>
        </p>
        <button
          onClick={e => handleClick(e)}
          className="my-4 recipe-button rounded-pill"
        >
          Signup
        </button>
      </Form>
      {state.message && <div className="info info-danger">{state.message}</div>}
    </Container>
  )
}

//     <div className="Signup">
//       <h2>Signup</h2>
//       <form>
//         Email:{' '}
//         <input
//           type="text"
//           value={state.email}
//           name="email"
//           onChange={handleInputChange}
//         />{' '}
//         <br />
//         Username:{' '}
//         <input
//           type="text"
//           value={state.name}
//           name="name"
//           onChange={handleInputChange}
//         />{' '}
//         <br />
//         Password:{' '}
//         <input
//           type="password"
//           value={state.password}
//           name="password"
//           onChange={handleInputChange}
//         />{' '}
//         <br />
//         <button onClick={e => handleClick(e)}>Signup</button>
//       </form>
//       {state.message && <div className="info info-danger">{state.message}</div>}
//     </div>
//   )
// }
