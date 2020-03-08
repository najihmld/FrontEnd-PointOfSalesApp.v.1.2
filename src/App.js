import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import Navbar from './components/NavBar'
import Login from './pages/Login'
import Main from './pages/Main'
import Register from './pages/Register'
import Home from './pages/Home'
import Admin from './pages/Admin'

import {connect} from 'react-redux'

class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        {/* {this.props.auth.data.token} */}
      {/* {this.props.auth.data.token && <Home {...this.props} />} */}
      <Switch>
          <Route path='/' exact render={(props) => (<Main{...props}/>)} />
          <Route path='/order' render={(props) => (<Home{...props}/>)} />
          <Route path='/admin' render={(props) => (<Admin{...props}/>)} />
          <Route path='/register' render={(props) => (<Register{...props}/>)} />
          <Route path='/login' render={(props) => (<Login{...props}/>)} />
       
      </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(App)

