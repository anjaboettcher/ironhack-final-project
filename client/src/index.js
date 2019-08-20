import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import App from './components/App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ModalProvider } from 'react-modal-hook'
//import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Router>
    <ModalProvider>
      <App />
    </ModalProvider>
  </Router>,
  document.getElementById('root')
)

// We used this to enable the ofline feature
//registerServiceWorker()
