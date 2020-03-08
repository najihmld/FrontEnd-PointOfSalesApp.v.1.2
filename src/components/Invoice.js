import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { Panel, Grid, Row, Col, InputGroup, Input, Icon,  Dropdown, ButtonGroup, Uploader, Button, ButtonToolbar, List, Modal, Paragraph, Form, FormControl, FormGroup, ControlLabel, HelpBlock } from 'rsuite';

import {getCategory} from '../public/redux/actions/category'
import {connect} from 'react-redux'


class Invoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        name: ''
      },
      show: false
    };

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // getCategory = () => {
  //   this.props.dispatch(getCategory())
  //   }
  
  close() {
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
  }
  handleChange(value) {
    this.setState({
      formValue: value
    });
  }

  handleClose = (event) => {
    this.setState({ show: false });
  }


  handleCheckOut = (event) => {
    event.preventDefault()
    const data ={ 
        order: this.props.order
    }
    const body = qs.stringify(data)
        axios.post(`${process.env.REACT_APP_API_HOST}/orders`, body)
        .then(res => {
            if(res.status === 200) {
              this.setState({ show: false });
                try{
                    this.setState({
                        cart: [],
                        order: [],
                        grandTotal: 0
                    })
                    
                } catch(err) {

                }
            }
        })
        .catch(err => {

        })

}
  render() {
    let subtotal = []
    let total = 0
    this.props.order.map((item, index) => {
      subtotal.push(item.subtotal*item.qty)
    })
    for(let i = 0; i <subtotal.length; i++){
       total += subtotal[i];
    }
    console.log(this.props.order)
    return (
      <div style={{textAlign: 'left'}}>
        <Modal show={this.state.show} onHide={this.close} size="xs">
          <Modal.Header>
            <Modal.Title><h6>Detai Order</h6></Modal.Title>
          </Modal.Header>
     
          <div>
                    <List>
                {this.props.order.map((item, index) => {
                  subtotal.push(item.subtotal)
                return(
                    <List.Item key={index} index={index}>
                     <span>{item.name} {' '} {item.qty}x</span>
                    <span style={{float:'right', display:'flex'}}>
                     IDR {item.price*item.qty}
                    </span>
                    </List.Item>
                )
                })}
               
                </List>
                <List>
              
                    <List.Item>
                     <span>PPN 10%</span>
                    <span style={{float:'right', display:'flex'}}>
                     IDR {(total*0.10)}
                    </span>
                    </List.Item>
        
                    <List.Item>
                     <span>TOTAL</span>
                    <span style={{float:'right', display:'flex'}}>
                     IDR {total+(total*0.10)}
                    </span>
                    </List.Item>
                   </List></div>
 
          <Modal.Footer style={{marginTop:30}}>
            <Button onClick={(event) => this.handleCheckOut(event)} type='submit'  appearance="primary">
              Checkout
            </Button>
            <Button onClick={this.close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Button onClick={this.open} type='submit' appearance='primary' block>Checkout</Button>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
      product: state.product,
      category: state.category,
      orders: state.orders
  }
}


export default connect(mapStateToProps)(Invoice)


