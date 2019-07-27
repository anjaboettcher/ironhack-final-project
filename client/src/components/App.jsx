import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainNavbar from './MainNavbar'
import BottomNavbar from '../BottomNavBar'
import BottomNav2 from './BottomNav2'
import Home from './pages/Home'
import Countries from './pages/Countries'
import AddCountry from './pages/AddCountry'
import Secret from './pages/Secret'
import Login from './pages/Login'
import Signup from './pages/Signup'
import api from '../api'
import { withRouter } from 'react-router'

function App() {
  return (
    <div className="App">
      <MainNavbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/countries" component={Countries} />
        <Route path="/add-country" component={AddCountry} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/secret" component={Secret} />
        <Route render={() => <h2>404</h2>} />
      </Switch>
      {api.isLoggedIn() && <BottomNav2 />}
      {/* <BottomNavbar /> */}
    </div>
  )
}

//withRouter forced the app component to be rendered each time it is being called
export default withRouter(App)
