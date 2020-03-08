import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { Panel, Grid, Row, Col, InputGroup, Input, Icon,  Dropdown, ButtonGroup, Uploader, InputPicker, Button, ButtonToolbar, List, Modal, Paragraph, Form, FormControl, FormGroup, ControlLabel, HelpBlock, InputNumber, SelectPicker } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

import {getProduct} from '../public/redux/actions/product'
import {connect} from 'react-redux'


class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        name: '',
        price: '',
        description: '',
        image: '',
        id_category: ''
      },
      show: false
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  
    // this.handleNameChange = this.handleNameChange.bind(this);
    // this.handlePriceChange = this.handlePriceChange.bind(this);
    // this.handleDesChange = this.handleDesChange.bind(this);
    // this.handleImgChange = this.handleImgChange.bind(this);
    // this.handleIdChange = this.handleIdChange.bind(this);
  }
  
  close() {
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
  }

  

  // handleChange(value) {
  //   this.setState({
  //     ...this.setState.formValue,
  //     formValue: {
  //       name: value
  //     }
  //   })
  //   console.log(value)
  // }

  handleNameChange(value) {
    this.setState({
      formValue: {
        ...this.state.formValue,
        name: value
      }
    })
    // console.log(value)
  }

  handlePriceChange(value) {
    this.setState({
      formValue: {
        ...this.state.formValue,
        price: value
      }
    })
    // console.log(value)
  }
  handleDesChange(value) {
    this.setState({
      formValue: {
        ...this.state.formValue,
        description: value
      }
    })
    // console.log(value)
  }
  handleImgChange(event) {
    this.setState({
      formValue: {
        ...this.state.formValue,
        image: event.target.files[0]
      }
    })
    // console.log(this.state.image)
  }
  handleIdChange(value) {
    this.setState({
      formValue: {
        ...this.state.formValue,
        id_category: value
      }
    })
    // console.log(value)
  }


  handleClose = (event) => {
    this.setState({ show: false });
  }



  handleSubmit = (event) => {
    event.preventDefault()
    // const data = {
    //     name: this.state.formValue.name,
    //     price: this.state.formValue.price,
    //     description: this.state.formValue.description,
    //     image: this.state.formValue.image,
    //     id_category: this.state.formValue.id_category
    // }

      // console.log(data)
   
    if(this.state.formValue.name === '') {
        alert('Requirement must be filled!')
    } else{
        const body = new FormData()
        body.append('name', this.state.formValue.name)
        body.append('price', this.state.formValue.price)
        body.append('description', this.state.formValue.description)
        body.append('image', this.state.formValue.image)
        body.append('id_category', this.state.formValue.id_category)

        // console.log(body)
        axios.post(`${process.env.REACT_APP_API_HOST}/products`, body)
          .then(res => {
            if(res.status === 200) {
              try {
                this.handleClose(event)
                this.props.dispatch(getProduct())
              } catch(error) {
                console.log(error);
                
              }
            }if(res.status === 400) {
              alert('Error')
              
            }
          })
  }
}
  render() {

    console.log(this.state.formValue)
    return (
      <div style={{textAlign: 'left'}}>
        <Modal show={this.state.show} onHide={this.close} size="xs">
          <Modal.Header>
            <Modal.Title><h6>Add Product</h6></Modal.Title>
          </Modal.Header>
     
            <Form style={{alignText:'left'}}>
              <FormGroup >
            
                <FormControl placeholder="Product Name" name="name" onChange={(event) => this.handleNameChange(event)} />
              </FormGroup>
              <FormGroup >
                <InputNumber placeholder="Price" prefix="IDR" name="price" onChange={(event) => this.handlePriceChange(event)}/>
              </FormGroup>
              <FormGroup >
                <Input placeholder="Description" componentClass="textarea"  name="description" onChange={(event) => this.handleDesChange(event)}/>
              </FormGroup>
              <FormGroup style={{textAlign: 'left'}} >
                <ControlLabel>Image</ControlLabel>
                <FormGroup style={{textAlign: 'left'}}>
                  <input type='file' onChange={(event) => this.handleImgChange(event)}></input>
                {/* <Uploader style={{textAlign: 'left', position: 'relative !important'}}
                autoUpload={false}
                onChange={(event) => this.handleImgChange(event)}
                // ref={ref => {
                //   this.uploader = ref;
                // }}
              /> */}
                </FormGroup>
               
              </FormGroup>
           
            
                    {this.props.category.isLoading ? (<p>isLoading</p>): 
                    (  <InputPicker
                      value={this.state.value}
                      onChange={(event) => this.handleIdChange(event)}
                      data={this.props.category.listCategory}
                      style={{textAlign: 'left', position: 'relative !important', width:300}}
                    />)  }
            

            </Form >
            
          <Modal.Footer style={{marginTop:30}}>
            <Button onClick={(event) => this.handleSubmit(event)}  type='submit' appearance="primary">
              Submit
            </Button>
            <Button onClick={this.close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Button onClick={this.open}>Add Product</Button>
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
      product: state.product,
      category: state.category
  }
}

// const mapDispatchToProps = dispatch => ({
//   setDataProduct: payload => dispatch({
//       type: 'GET_PRODUCT_FULFILLED',
//       payload
//   })
//   // ,
//   // getProduct: payload => dispatch(getProduct)
// })

export default connect(mapStateToProps)(AddProduct)