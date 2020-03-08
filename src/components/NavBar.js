import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Icon, Container, Header, } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import {connect} from 'react-redux'


class NavHeader extends Component {

  handlerLogout = (event) => {
    event.preventDefault()
    try{
      this.props.setDataLogout()
      this.props.history.push('/login')
    }catch(err){
      console.log(err);
    }
}

    render() {
console.log(this.props.auth.data)
        return(
            <div className="show-fake-browser navbar-page">
            <Container>
              <Header>
                <Navbar appearance="inverse" style={{paddingLeft:39, position:'fixed', zIndex:'100', top:'0', width:'100%'}}>
                  <Navbar.Body>
                    <Nav>
                      
                      <Nav.Item style={{ marginLeft:30}}>
                      <Link style={{color:'#fff'}} to='/'><h5>Pikoco</h5></Link>
                      </Nav.Item>
                       
                    </Nav>
                    <Nav pullRight style={{marginRight:30}}>
                    {this.props.auth.data.roll === 1 ?   <Nav.Item><Link to='/admin'  style={{color:'#fff'}}><h7>Admin</h7></Link> </Nav.Item> : null}
                      <Nav.Item onClick={(event) => {this.handlerLogout(event)}}>Logout</Nav.Item>
                    </Nav>
                  </Navbar.Body>
                </Navbar>
              </Header>
            </Container>
          </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => ({
  setDataLogout: payload => dispatch({
    type: 'POST_LOGOUT',
    payload
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(NavHeader)

