import { useForm } from '../../hooks'
import React, { useEffect, useState } from 'react'
import { Col, Input, Label, Row, CardImg, Container } from 'reactstrap'
import api from '../../api'

export default function Profile(props) {
  const [profile, setProfile] = useState(null)
  const { formValues, setFormValues, getInputProps } = useForm()

  useEffect(() => {
    api
      .getProfile()
      .then(profile => {
        setProfile(profile)
      })
      .catch(err => console.log(err))
  }, [])

  if (!profile) return null

  const getFormValue = key =>
    formValues[key] !== undefined ? formValues[key] : profile[key]

  const username = getFormValue('username')
  const email = getFormValue('email')
  const password = getFormValue('password')
  const image = getFormValue('image')

  function handleSubmit(event) {
    event.preventDefault()

    const uploadData = new FormData()
    uploadData.append('username', username)
    uploadData.append('email', email)
    uploadData.append('password', password)
    uploadData.append('image', image)

    api.editProfile(uploadData).then(profile => {
      console.log(profile)
      props.history.push('/profile')
    })
  }

  function handleFileChange(e) {
    setFormValues({
      ...formValues,
      image: e.target.files[0],
    })
  }

  return (
    <div className="mt-4">
      <Container>
        <CardImg
          top
          width="100%"
          style={{
            width: 150,
            height: 150,
            borderRadius: 150 / 2,
            overflow: 'hidden',
            borderColor: 'black',
          }}
          src={profile.image}
          alt={profile.image}
        />

        <form onSubmit={handleSubmit}>
          <Row className="my-4">
            <Col sm={3}>
              <Label for="exampleUsername">Username: </Label>
            </Col>
            <Col>
              <Input
                type="text"
                {...getInputProps('username')}
                value={username || ''}
              />
            </Col>
          </Row>

          <Row className="my-4">
            <Col sm={3}>
              <Label for="exampleEmail">Email: </Label>
            </Col>
            <Col>
              <Input
                type="text"
                {...getInputProps('email')}
                value={email || ''}
              />
            </Col>
          </Row>

          <Row className="my-4">
            <Col sm={3}>
              <Label for="exampleEmail">Password: </Label>
            </Col>
            <Col>
              <Input
                type="password"
                {...getInputProps('password')}
                value={formValues.password || ''}
              />
            </Col>
          </Row>

          <Row className="my-4">
            <Col sm={3}>
              <Label for="exampleEmail">Picture</Label>
            </Col>
            <Col>
              <Input
                className="upload-button"
                type="file"
                onChange={handleFileChange}
              />
            </Col>
          </Row>

          <button className="my-4 recipe-button" color="danger" block>
            Edit profile
          </button>
        </form>
      </Container>
    </div>
  )
}

// import React, { useEffect, useState } from 'react'
// import api from '../../api'
// import {
//   Card,
//   CardImg,
//   CardText,
//   CardBody,
//   CardTitle,
//   CardSubtitle,
//   Button,
//   ListGroup,
//   ListGroupItem,
// } from 'reactstrap'

// export default function Profile() {
//   const [profile, setProfile] = useState(null)

//   useEffect(() => {
//     api
//       .getProfile()
//       .then(profile => {
//         setProfile(profile)
//       })
//       .catch(err => console.log(err))
//   }, [])

//   //needed otherwise it is null! Same as (recipe && recipe...)
//   if (!profile) return null

//   return (
//     <div>
//       <Card>
//         <CardImg top width="100%" src="" alt="profile-img" />
//         <CardBody>
//           <CardTitle>Hello {profile.username}</CardTitle>
//           <CardSubtitle>This is your profile</CardSubtitle>
//           <CardText>
//             <ListGroup>
//               <ListGroupItem>
//                 <strong>Username: </strong>
//                 {profile.username} <br />
//               </ListGroupItem>
//               <ListGroupItem>
//                 <strong>Email: </strong>
//                 {profile.email} <br />
//               </ListGroupItem>
//               <ListGroupItem>
//                 <strong>Password: </strong>
//                 {profile.password} <br />
//               </ListGroupItem>
//             </ListGroup>
//           </CardText>
//           <button className="info info-danger">Edit</button>
//         </CardBody>
//       </Card>
//     </div>
//   )
// }
