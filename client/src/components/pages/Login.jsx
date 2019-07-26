import React, { useState } from 'react'
import api from '../../api'
import { useForm } from '../../hooks'

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

    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        Username: <input type="text" {...getInputProps('email')} /> <br />
        Password: <input type="password" {...getInputProps('password')} />{' '}
        <br />
        <button>Login</button>
      </form>
      {message && <div className="info info-danger">{message}</div>}
    </div>
  )
}
