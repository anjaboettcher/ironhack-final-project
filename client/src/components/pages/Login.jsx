import React, { useState } from 'react'
import api from '../../api'
import { useForm } from '../../hooks'
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap'

export default function Login(props) {
  const { formValues, getInputProps } = useForm({ lang: 'en' })

  function handleSubmit(e) {
    e.preventDefault()
    api
      .login(formValues.email, formValues.password)
      .then(result => {
        console.log('SUCCESS!')
        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setMessage(err.toString()))
  }

  const [message, setMessage] = useState(null)

  return (
    <Container className="App">
      <h2>Log In</h2>
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
        <Button className="rounded-pill" outline color="success">
          Login
        </Button>
      </Form>
      {message && <div className="info info-danger">{message}</div>}
    </Container>
  )
}
