import React, {Component} from 'react'
import Navbar from '../components/NavBar'
import Dashboard from '../components/Dashboard'
import { Container, Header, Content } from 'rsuite';

class App extends Component {
  render() {
    const styles = {
      marginLeft: 39,
      marginRight: 39,
      marginTop: 10,
      marginBottom:10
    }

    return (
      <Container>
        <Header style={{marginleft:30}}>   { <Navbar {...this.props} />}</Header>
        <Container>
          <Content  style={styles}>         { <Dashboard {...this.props} />}</Content>
        </Container>
      </Container>
 
    )
  }
}

export default App;