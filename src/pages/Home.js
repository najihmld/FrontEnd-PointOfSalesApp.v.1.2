import React, {Component} from 'react'
import Navbar from '../components/NavBar'
import Cart from '../components/Sidebar'
import Menubar from '../components/Menubar'
import Products from '../components/Products'
import { Container, Header, Content, Footer, Sidebar, Row, Grid, Col } from 'rsuite';

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
          <Content  style={styles}>         { <Products {...this.props} />}</Content>

          {/* <Sidebar style={sidebarStyle}>     { <Cart {...this.props} />}</Sidebar> */}
        </Container>
        {/* <Footer>Footer</Footer> */}
      </Container>
      //       { <Menubar {...this.props} />}
 
    )
  }
}

export default App;