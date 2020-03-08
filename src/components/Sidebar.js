import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { className } from '../css/style.css'
import { Sidenav, Nav, Icon, Button, ButtonToolbar } from 'rsuite';



const Cart = (props) => {


    const setData = props.data || []
    const panelStyles = {
        padding: '15px 20px',
        color: '#aaa'
      };
      
      const headerStyles = {
        padding: 20,
        fontSize: 16,
      
      };



                    return(
                        <div style={{ width: 250 }}>
                        <Sidenav defaultOpenKeys={['3', '4']}>
                          <Sidenav.Header>
                          </Sidenav.Header>
                          <Sidenav.Body>
                          <Nav>

                        <ButtonToolbar style={{marginLeft:10, marginTop:30}}>
                            <Button appearance='primary' block>Checkout</Button>
                            <Button  color='red' block>Cancel</Button>
                        </ButtonToolbar>
                                
                            </Nav>
                          </Sidenav.Body>
                        </Sidenav>
                      </div>
                    )
                    
}

export default Cart

