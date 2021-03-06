import React, { useState } from 'react'
import api from '../../api'
import { useForm } from '../../hooks'
import { Container, Col, Form, FormGroup, Label, Input } from 'reactstrap'

export default function Login(props) {
  const { formValues, getInputProps } = useForm({ lang: 'en' })

  function handleSubmit(e) {
    e.preventDefault()
    api
      .login(formValues.email, formValues.password)
      .then(result => {
        console.log('SUCCESS!')
        props.history.push('recipes/my-recipes') // Redirect to the home page
      })
      .catch(err => setMessage(err.toString()))
  }

  const [message, setMessage] = useState(null)

  return (
    <Container className="App mt-4">
      <Form className="form" onSubmit={handleSubmit}>
        <Col>
          <FormGroup>
            <Label>Email</Label>
            <Input
              className="rounded-pill"
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="myemail@email.com"
              {...getInputProps('email')}
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
              {...getInputProps('password')}
            />
          </FormGroup>
        </Col>

        <span className="form-text text-muted">
          {' '}
          Not a Forkify member yet?{' '}
          <a style={{ color: '#8AB661' }} href="/signup">
            Sign up
          </a>
        </span>
        <button className="my-4 recipe-button rounded-pill">Login</button>
      </Form>
      {message && <div className="info info-danger">{message}</div>}
    </Container>
  )
}
