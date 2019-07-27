import React, { useState } from 'react'
import api from '../../api'

export default function Signup(props) {
  const [state, setState] = useState({
    email: '',
    name: '',
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
      name: state.name,
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
  return (
    // <div className="row">
    //   <div className="col-md-10 col-lg-8 col-xl-5 mb-4">
    //     <section className="form-elegant scrollbar-light-blue">
    //       <div className="card">
    //         <div className="card-body mx-4">
    //           <div className="text-center">
    //             <h3 className="dark-grey-text mb-5">
    //               <strong>Login</strong>
    //             </h3>
    //           </div>
    //           <div className="md-form">
    //             <input type="text" id="Form-name1" className="form-control" />
    //             <label for="Form-name1">Your name</label>
    //           </div>
    //           <div className="md-form">
    //             <input
    //               type="text"
    //               id="Form-surname1"
    //               className="form-control"
    //             />
    //             <label for="Form-surname1">Your surname</label>
    //           </div>
    //           <div className="md-form">
    //             <input type="text" id="Form-email1" className="form-control" />
    //             <label for="Form-email1">Your email</label>
    //           </div>
    //           <div className="md-form pb-3">
    //             <input
    //               type="password"
    //               id="Form-pass1"
    //               className="form-control"
    //             />
    //             <label for="Form-pass1">Your password</label>
    //             <p className="font-small blue-text d-flex justify-content-end">
    //               Forgot{' '}
    //               <a href="#" className="blue-text ml-1">
    //                 Password?
    //               </a>
    //             </p>
    //           </div>
    //           <div className="text-center mb-3">
    //             <button
    //               type="button"
    //               className="btn blue-gradient btn-block btn-rounded z-depth-1a"
    //             >
    //               Sign in
    //             </button>
    //           </div>
    //         </div>
    //         <div className="modal-footer mx-5 pt-3 mb-1">
    //           <p className="font-small grey-text d-flex justify-content-end">
    //             Not a member?{' '}
    //             <a href="#" className="blue-text ml-1">
    //               Sign Up
    //             </a>
    //           </p>
    //         </div>
    //       </div>
    //     </section>
    //   </div>
    // </div>

    <div className="Signup">
      <h2>Signup</h2>
      <form>
        Email:{' '}
        <input
          type="text"
          value={state.email}
          name="email"
          onChange={handleInputChange}
        />{' '}
        <br />
        Username:{' '}
        <input
          type="text"
          value={state.name}
          name="name"
          onChange={handleInputChange}
        />{' '}
        <br />
        Password:{' '}
        <input
          type="password"
          value={state.password}
          name="password"
          onChange={handleInputChange}
        />{' '}
        <br />
        <button onClick={e => handleClick(e)}>Signup</button>
      </form>
      {state.message && <div className="info info-danger">{state.message}</div>}
    </div>
  )
}
