import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { Panel, Grid, Row, Col, InputGroup, Input, Icon,  Dropdown, ButtonGroup, Uploader, Button, ButtonToolbar, List, Modal, Paragraph, Form, FormControl, FormGroup, ControlLabel, HelpBlock } from 'rsuite';

import {getCategory} from '../public/redux/actions/category'
import {connect} from 'react-redux'



class EditCategory extends React.Component {
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




  handleSubmit = (event) => {
    event.preventDefault()
    const data = {
        name: this.state.formValue
    }
    console.log(data)
    if(this.state.formValue.name === '') {
        alert('Requirement must be filled!')
    } else{
        const body = qs.stringify(data)
        axios.put(`http://127.0.0.1:3001/category/${this.props.categoryId}`, body)
        .then(res => {
          if(res.status === 200) {
              try{
                this.handleClose(event)
                this.props.dispatch(getCategory())
              } catch(err) {

              }
          }
      })
      .catch(err => {

      })
  }
}
  render() {
    
    return (
      <div style={{textAlign: 'left'}}>
        <Modal show={this.state.show} onHide={this.close} size="xs">
          <Modal.Header>
            <Modal.Title><h6>Edit Category</h6></Modal.Title>
          </Modal.Header>
     
            <Form style={{textAlign: 'left'}}>
              <FormGroup >
                <ControlLabel>Edit Category Name</ControlLabel>
                <Input defaultValue={this.props.categoryName} name="name" onChange={(event) => this.handleChange(event)}/>
              </FormGroup>

            </Form >
     
          <Modal.Footer style={{marginTop:30}}>
            <Button onClick={(event) => this.handleSubmit(event)}  appearance="primary">
              Submit
            </Button>
            <Button onClick={this.close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Button color='blue' size='xs' onClick={this.open}>Edit</Button>
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
      product: state.product,
      category: state.category,
      orders: state.orders,
      user: state.user
  }
}

export default connect(mapStateToProps)(EditCategory)


