import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { Grid, Row, Col, Button, List, Panel} from 'rsuite';

import {getProduct} from '../public/redux/actions/product'
import {getCategory} from '../public/redux/actions/category'
import {deleteCategory} from '../public/redux/actions/category'
import {deleteProduct} from '../public/redux/actions/product'
import {deleteUser} from '../public/redux/actions/user'
import {getOrders} from '../public/redux/actions/orders'
import {getUser} from '../public/redux/actions/user'
import {connect} from 'react-redux'
import NumberFormat from 'react-number-format';

import AddProduct from './AddProduct'
import AddCategory from './AddCategory'
import EditCategory from './EditCategory'
import EditProduct from './EditProduct'
import EditUser from './EditUser'
import Charts from './Charts'

import Moment from 'moment'


class Dashboard extends React.Component {
    
    componentDidMount(){
        this.getProduct()
        this.getCategory()
        this.getOrders()
        this.getUser()
    }

    state = {
        dataProduct: [],
        cart: [],
        order: [],
        grandTotal: 0,
        totalItems: 0,
        page: 1,
        search: '',
        dataCategory: [],
        filterCategory: ''
    }
    
    getProduct = () => {
        this.props.dispatch(getProduct())
   }
    getCategory = () => {
    this.props.dispatch(getCategory())
    }
    getOrders = () => { 
        this.props.dispatch(getOrders())
    }
    getUser = () => {
        this.props.dispatch(getUser())
   }

    deleteListCategory = (event, idCategory) => { 
        event.preventDefault()
        this.props.dispatch(deleteCategory(event, idCategory)) 
        .then(res => {
            this.props.dispatch(getCategory())
         }) 
   
    }

    deleteListProduct = (event, idProduct) => { 
        event.preventDefault()
        this.props.dispatch(deleteProduct(event, idProduct)) 
        .then(res => {
            this.props.dispatch(getProduct())
         }) 
   
    }

    deleteListUser = (event, idProduct) => { 
        event.preventDefault()
        this.props.dispatch(deleteUser(event, idProduct)) 
        .then(res => {
            this.props.dispatch(getUser())
         }) 
   
    }


    render() {
        let subtotal = []
        let total = 0
        this.props.orders.listOrders.map((item, index) => {
          subtotal.push(item.total)
        })
        for(let i = 0; i <subtotal.length; i++){
           total += subtotal[i];
        }  
        return (
                <div> 

                

                <Grid fluid style={{marginTop:55}}>

                <Row>   
                <Col xs={12} xsOffset={2}>
                    <Charts />
                </Col>
                <Col xs={7}>
                <Panel style={{marginTop:40}} header="Recent Deposit" shaded>
                <h4><NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'IDR '} /></h4>
                </Panel>
                </Col>
                </Row>


                <Row>   
                <Col xs={18} xsOffset={3}>
                <Row style={{marginTop:30}}><Col xs={4} style={{marginBottom:10}}>
               </Col></Row>
                    <div>
                    <List bordered style={{display:'grid'}}>
                    <List.Item style={{backgroundColor:'#f7f7fa'}}>
                    <span style={{width:"30%", float:'left'}}><h6>Invoice</h6></span>
                    <span style={{width:"30%", float:'left'}}><h6>Cashier</h6></span>
                    <span style={{width:"30%", float:'left'}}><h6>Date</h6></span>
                    <span style={{width:"10%", float:'left'}}><h6>Amount</h6></span>
                    </List.Item>
                    

                    { this.props.orders.isLoading ? (<p>isLoading</p>) : 
                    this.props.orders.listOrders.map((item, index) => {
                        return(
                            <List.Item key={index} index={index}>
                            <span style={{width:"30%", float:'left'}}>{item.invoice}</span>
                            <span style={{width:"30%", float:'left'}}>{item.cashier}</span>
                            <span style={{width:"30%", float:'left'}}>{Moment(item.date).format('L')}</span>
                            <span style={{width:"10%", float:'left'}}><NumberFormat value={item.total} displayType={'text'} thousandSeparator={true} prefix={'IDR '} /></span>
                            </List.Item>
                        )
                        
                    })}
                    </List>
                    </div>
                </Col>
                </Row>

                <Row>
                <Col xs={18} xsOffset={3}>

                <Row style={{marginTop:30}}>
                <Col xs={4} style={{marginBottom:10}}>

                <AddCategory style={{float:'left'}}/>

                
                </Col>

                </Row>
                    <div>
                    <List bordered>
                { this.props.category.isLoading ? (<p>isLoading</p>) : 
                this.props.category.listCategory.map((item, index) => {
                return(
                    <List.Item key={index} index={index}>
                    <span>{item.label}</span>
                    <span style={{float:'right', display:'flex'}}>
                <EditCategory categoryId={item.value} categoryName={item.label}/>{' '}
                <Button style={{marginLeft:5}} color='red' size='xs'  onClick={(event) => this.deleteListCategory(event, item.value)}>Delete</Button>
                            </span>
                    </List.Item>
                )
                })}
                </List></div>

                </Col>
                </Row>

                <Row>   
                <Col xs={18} xsOffset={3}>
                <Row style={{marginTop:30}}><Col xs={4} style={{marginBottom:10}}>
                <AddProduct style={{float:'left'}} /></Col></Row>
                    <div>
                    <List bordered style={{display:'grid'}}>
                    { this.props.product.isLoading ? (<p>isLoading</p>) : 
                    this.props.product.listProduct.items.map((item, index) => {
                        return(
                            <List.Item key={index} index={index}>
                            <span style={{width:"45%", float:'left'}}>{item.name}</span>
                            <span style={{float:'left'}}><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'IDR '} /></span>
                        
                            <span style={{float:'right', display:'flex'}}>
                            <EditProduct productName={item.name} productPrice={item.price} productDes={item.description} productImg={item.image} productId={item.id} productCategory={item.id_category}/>{' '}
                            <Button style={{marginLeft:5}} color='red' size='xs'  onClick={(event) => this.deleteListProduct(event, item.id)}>Delete</Button></span>
                        
                            </List.Item>
                        )
                        
                    })}
                    </List>
                    </div>
                </Col>
                </Row>


                <Row>   
                <Col xs={18} xsOffset={3}>
                <Row style={{marginTop:30}}><Col xs={4} style={{marginBottom:10}}>
               </Col></Row>
                    <div>
                    <List bordered style={{display:'grid'}}>
                    <List.Item style={{backgroundColor:'#f7f7fa'}}>
                    <span style={{width:"45%", float:'left'}}><h6>Name</h6></span>
                    <span style={{width:"45%", float:'left'}}><h6>Username</h6></span>
                    <span style={{width:"10%", minWidth:110, float:'right'}}><h6>Action</h6></span>
                    </List.Item>
                    

                    { this.props.user.isLoading ? (<p>isLoading</p>) : 
                    this.props.user.listUser.data.map((item, index) => {
                
                        return(
                            <List.Item key={index} index={index}>
                            <span style={{width:"45%", float:'left'}}>{item.name}</span>
                            <span style={{width:"45%", float:'left'}}>{item.email}</span>
                            <span style={{width:"10%", minWidth:100, float:'right', display:'flex'}}>
                            <EditUser userId={item.id} userName={item.name} userEmail={item.email} userPass={item.password}/>{' '}
                            <Button style={{marginLeft:5}} color='red' size='xs'  onClick={(event) => this.deleteListUser(event, item.id)}>Delete</Button></span>
                            </List.Item>
                        )
                        
                    })}
                    </List>
                    </div>
                </Col>
                </Row>

                
                </Grid>
  
   </div>
  
        )
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

// const mapDispatchToProps = dispatch => ({
//   setDataProduct: payload => dispatch({
//       type: 'GET_PRODUCT_FULFILLED',
//       payload
//   })
//   // ,
//   // getProduct: payload => dispatch(getProduct)
// })

export default connect(mapStateToProps)(Dashboard)


