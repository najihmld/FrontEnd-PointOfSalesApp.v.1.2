import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { Input, Button,Modal, Form, FormGroup, ControlLabel } from 'rsuite';

import {connect} from 'react-redux'
import {getUser} from '../public/redux/actions/user'



class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        name: '',
        email: '',
        password: ''
      },
      show: false
    };

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  
  close() {
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
  }

  handleNameChange(value) {
    this.setState({
      formValue: {
        ...this.state.formValue,
        name: value
      }
    })
    // console.log(value)
  }
  handleEmailChange(value) {
    this.setState({
      formValue: {
        ...this.state.formValue,
        email: value
      }
    })
    // console.log(this.state.image)
  }
  handlePassChange(value) {
    this.setState({
      formValue: {
        ...this.state.formValue,
        password: value
      }
    })
    // console.log(value)
  }

  handleClose = (event) => {
    this.setState({ show: false });
  }




  handleSubmit = (event) => {
    event.preventDefault()
    const data = {
        name: this.state.formValue.name,
        email: this.state.formValue.email,
        password: this.state.formValue.password
    }

    if(this.state.formValue.name === '') {
        alert('Requirement must be filled!')
    } else{
        const body = qs.stringify(data)
        axios.put(`${process.env.REACT_APP_API_HOST}/users/${this.props.userId}`, body)
        .then(res => {
          if(res.status === 200) {
              try{
                this.handleClose(event)
                this.props.dispatch(getUser())
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
            <Modal.Title><h6>Edit User</h6></Modal.Title>
          </Modal.Header>
     
            <Form style={{textAlign: 'left'}}>
              <FormGroup >
                <ControlLabel>Name</ControlLabel>
                <Input defaultValue={this.props.userName} name="name" onChange={(event) => this.handleNameChange(event)}/>
              </FormGroup>
              <FormGroup >
                <ControlLabel>Email</ControlLabel>
                <Input defaultValue={this.props.userEmail} name="name" onChange={(event) => this.handleEmailChange(event)}/>
              </FormGroup>
              <FormGroup >
                <ControlLabel>Password</ControlLabel>
                <Input type="password" defaultValue={this.props.userPass} name="name" onChange={(event) => this.handlePassChange(event)}/>
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

export default connect(mapStateToProps)(EditUser)