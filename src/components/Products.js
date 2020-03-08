import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { Panel, Grid, Row, Col, InputGroup, Input, Icon,  Dropdown, ButtonGroup, Modal, Button, ButtonToolbar, List } from 'rsuite';
import NumberFormat from 'react-number-format';


class Product extends Component {
    
    componentDidMount(){
        this.getListOrder()
        this.getCategory()
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
        filterCategory: '',
        show: false
    }

    
    close() {
        this.setState({ show: false });
      }
    open() {
        this.setState({ show: true });
    }
    cancel(){
        this.setState({cart:[], order:[]})
    }
    getListOrder = () => {
        let query = []
        if(this.state.search !== ''){
            query.push(`name=${this.state.search}`)
        }
        if(this.state.filterCategory !== ''){
            query.push(`category=${this.state.filterCategory}`)
        }
        if(this.state.page > 1){
            query.push(`page=${this.state.page}`)
        }
        axios.get(`${process.env.REACT_APP_API_HOST}/products?`+query.join('&'))
        .then(res => {
            this.setState({
                dataProduct: res.data.data.items,
                totalItems: res.data.data.totalItems
            })  
        })
        .catch(err => {
            console.log(err);
        })
    }
    increaseOrder = (event, price) => {
        this.setState({
            order: this.state.order.map((order) => (order.product_id == event.target.id ? 
                {...order, qty: order.qty + 1, totalPrice:price*(order.qty+1)} : order)),
            grandTotal : this.state.grandTotal + parseInt(price)
        })   
    }
    deleteListCart = (event) => {
        const list = 0
        this.state.order.map((order, index) => {
            if(order.product_id == event.target.id){ 
            }
        })

        let cartForDelete = this.state.cart.filter((data) => {
            return data.product_id != event.target.id
        })

        let orderForDelete = this.state.order.filter((data) => {
            return data.product_id != event.target.id
        })
    
        this.setState({
            cart: cartForDelete,
            order: orderForDelete,
            grandTotal: this.state.grandTotal - parseInt(list) || 0
        })
    }
    decreaseOrder = (event, price) => {
        this.setState({
            order: this.state.order.map((order)=>(order.product_id == event.target.id ? {...order, qty:order.qty - 1, totalPrice:price*(order.qty-1)} : order)),
            grandTotal : this.state.grandTotal - parseInt(price)
        })
    }
    onCheckout = () => {
        if(this.state.order.length > 0) {
            this.open()
        }
    }
    handleCheckOut = (event) => {
        event.preventDefault()
        const data ={ 
            order: this.state.order
        }
        const body = qs.stringify(data)
            axios.post(`${process.env.REACT_APP_API_HOST}/orders`, body)
            .then(res => {  
                    this.setState({
                        cart: [],
                        order: [],
                        grandTotal: 0,
                        show: false
                    })
            })
            .catch(err => {

            })
  
    }
    onSelectProduct = (event, data) => {
        let checkProduct = false
        // console.log(this.state.cart)

        this.state.cart.map((item, index) => {
            if(item.id === data.id){
                checkProduct = true
            }
            if(item.price !== data.price){
                checkProduct = false
            }

        })

        if(checkProduct === false ){
            this.setState({
                cart:[...this.state.cart, data],
                order: [...this.state.order, {
                    product_id: data.id,
                    qty: 1,
                    name: data.name,
                    price: data.price,
                    subtotal: data.price*1
                }],
                 grandTotal: this.state.grandTotal + parseInt(data.price)
            })
        }
    }
    // handleCheckOut = async (event) => {
    //     const body = {
    //         order: this.state.order
    //     }
    //     console.log(body);
        
    //     await axios.post(`${process.env.REACT_APP_API_HOST}/orders`, body).then(
    //         res=>{
    //             this.setState({
    //                 cart: [],
    //                 order: []
    //             })
    //          })
    //         .catch(console.log)
    // }
    sortLates = async(event, value) => {
        event.preventDefault()
        if(value !== ''){
            await axios.get(`${process.env.REACT_APP_API_HOST}/products/?sortby=id DESC`)
            .then(res => {
                this.setState((prevState, currentState) => {
                    return{
                        ...prevState,
                        dataProduct: [...res.data.data.items]
                    }
                })
            })
        } 
    }
    sortHPrice = async(event, value) => {
        event.preventDefault()
        if(value !== ''){
            await axios.get(`${process.env.REACT_APP_API_HOST}/products/?sortby=price DESC`)
            .then(res => {
                this.setState((prevState, currentState) => {
                    return{
                        ...prevState,
                        dataProduct: [...res.data.data.items]
                    }
                })
            })
        } 
    }
    sortLPrice = async(event, value) => {
        event.preventDefault()
        if(value !== ''){
            await axios.get(`${process.env.REACT_APP_API_HOST}/products/?sortby=price ASC`)
            .then(res => {
                this.setState((prevState, currentState) => {
                    return{
                        ...prevState,
                        dataProduct: [...res.data.data.items]
                    }
                })
            })
        } 
    }
    getCategory = async() => {
        await axios.get(`${process.env.REACT_APP_API_HOST}/category`)
        .then(res => {
            this.setState({
                dataCategory: res.data.data
            })
            
        })
    }
    onClickCategory = async(idCategory) => {
        this.setState({
            filterCategory: idCategory
        }, this.getListOrder)
    }
    getSearch = async (event, values) => {
      this.setState({
          search: values
      }, this.getListOrder)
    }
    createPage = () => {
        let result = []
        const totalPage = Math.ceil(this.state.totalItems/6)
        for (let index = 1; index <= totalPage; index++){
            result.push(index)          
        }
        // console.log(this.state.totalItems, totalPage, result);
        
        return result
    }
    getNextPage = (page) => {
        this.setState({
            page: page
        }, this.getListOrder)
    }


    render() {    
        const styles= {
            marginLeft:35
        }

        let subtotal = []
        let total = 0
        this.state.order.map((item, index) => {
          subtotal.push(item.subtotal*item.qty)
        })
        for(let i = 0; i <subtotal.length; i++){
           total += subtotal[i];
        }

        return (
                <div> 
                <Grid fluid style={{marginTop:55}}>
                <Row style={styles}>
                <Col xs={18} center>
                    <Row style={{marginTop:30}}>
                <Col xs={6}>
                    <Dropdown title='Category'>
                        <Dropdown.Item onClick={(event) => this.onClickCategory('')}>All</Dropdown.Item>
                        {this.state.dataCategory.map((item, index) => {
                    return( <Dropdown.Item onClick={(event) => this.onClickCategory(item.id)}>{item.name}</Dropdown.Item> )
                        })}
                      </Dropdown>

                        <Dropdown title="Sort By">
                        <Dropdown.Item onClick={(event) => this.sortLates(event, event.target.value)}>Latest</Dropdown.Item>
                        <Dropdown.Item onClick={(event) => this.sortHPrice(event, event.target.value)}>High Price</Dropdown.Item>
                        <Dropdown.Item onClick={(event) => this.sortLPrice(event, event.target.value)}>Low Price</Dropdown.Item>
                         </Dropdown></Col>

                    <Col xs={17}>
                    <InputGroup inside style={{marginBottom:15}} onChange={(event) => this.getSearch(event, event.target.value)}>
                    <Input />
                    <InputGroup.Addon>
                        <Icon icon="search" />
                    </InputGroup.Addon>
                    </InputGroup>
                    </Col>
                      </Row>
            

                {this.state.dataProduct.map((item, index) => {
                    return(
                            <a  key={item.id} onClick={(event) => this.onSelectProduct(event, item)} href="#">      
                            <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 210, margin:5 }}>
                            <img src={`${process.env.REACT_APP_API_HOST}/`+`${item.image}`} height="210" />
                            <div style={{padding:12, fontSize:14, color:'#575757', marginTop:10}}>{item.name}</div>
                            <div style={{backgroundColor:'#3498ff', position:'absolute', paddingLeft: 15, paddingRight: 15, paddingTop:3, paddingBottom:5, color:'white', marginTop: -70, marginLeft:10, borderRadius:6}}><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'IDR '} /></div>
                            
                            </Panel>
                            </a>


                         )
                     })} 

                     
         <ButtonToolbar>
                {this.createPage().map((item, index) => {
                   return(
                    <Button  onClick={(event) => this.getNextPage(item)}>{item}
                    </Button>
                   )
                })}
         </ButtonToolbar>
                </Col>
                <Col xs={6}>
                <Panel  shaded bordered bodyFill style={{ width: '100%', minWidth: 300, margin:5, marginTop:30, padding:10, paddingTop:0, minHeight:380 }}>

                {/* <img src={require('../public/assets/emptycart.png')} style={{width:300, marginTop:50}}/> */}
                {this.state.order.length === 0 ? <img src={require('../public/assets/emptycart.png')} style={{width:300, marginTop:50}}/> : null }

                
                    <List>
                {this.state.order.map((item, index) => {
                                    let price = parseInt(item.price)
                                    let qty = parseInt(item.qty)
                                        
                    return(
        
                        <List.Item>
                           
                            <h6 style={{float: 'left'}}>{item.name}</h6>
                            
                            <h6 style={{float: 'right'}}>  <NumberFormat value={price*qty} displayType={'text'} thousandSeparator={true} prefix={'IDR '} /></h6><br/><br/>

                             <ButtonToolbar>
                                 <ButtonGroup>
                                <Button appearance="primary" id={item.product_id} disabled={item.qty == 1 } onClick={(event) =>this.decreaseOrder(event, item.price)}>-</Button>

                              
                               
                             <Button>{item.qty}</Button>
                              
                                <Button appearance="primary" id={item.product_id} onClick={(event) => this.increaseOrder(event, item.price)} >+</Button>
                                </ButtonGroup >
                                <Button color='red' id={item.product_id} onClick={(event) => {this.deleteListCart(event)}}>x</Button>
                                </ButtonToolbar>
                                </List.Item>
                         
                        
                    )  
                })}
                </List>
                </Panel>

                <Panel  shaded bordered bodyFill style={{ display: 'inline-block', width: '100%', margin:5, padding:10 }}>      <h6 style={{float: 'left'}}>Total: </h6>
                         <h6 style={{float: 'right'}}><NumberFormat value={this.state.grandTotal+(this.state.grandTotal*0.10)} displayType={'text'} thousandSeparator={true} prefix={'IDR '} /></h6><br/><br/>
                        <ButtonToolbar>

                       

        <div style={{textAlign: 'left'}}>
         <Modal show={this.state.show} onHide={()=> {this.close()}} size="xs">
          <Modal.Header>
            <Modal.Title><h6>Detai Order</h6></Modal.Title>
          </Modal.Header>
     
          <div>
                    <List>
                {this.state.order.map((item, index) => {
                  subtotal.push(item.subtotal)
                return(
                    <List.Item key={index} index={index}>
                     <span>{item.name} {' '} {item.qty}x</span>
                    <span style={{float:'right', display:'flex'}}>
                    <NumberFormat value={item.price*item.qty} displayType={'text'} thousandSeparator={true} prefix={'IDR '} />
                    </span>
                    </List.Item>
                )
                })}


               
                </List>
                <List>
              
                    <List.Item>
                     <span>PPN 10%</span>
                    <span style={{float:'right', display:'flex'}}>
                    <NumberFormat value={(total*0.10)} displayType={'text'} thousandSeparator={true} prefix={'IDR '} />
                    </span>
                    </List.Item>
        
                    <List.Item>
                     <span>TOTAL</span>
                    <span style={{float:'right', display:'flex'}}>
                    <NumberFormat value={total+(total*0.10)} displayType={'text'} thousandSeparator={true} prefix={'IDR '} />
                    </span>
                    </List.Item>
                   </List></div>
 
          <Modal.Footer style={{marginTop:30}}>
            <Button onClick={(event) => this.handleCheckOut(event)} type='submit'  appearance="primary">
              Checkout
            </Button>
            <Button onClick={()=> {this.close()}} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
        <Button onClick={()=> {this.onCheckout()}} type='submit' appearance='primary' block>Checkout</Button>

                            {/* <Button onClick={(event) => this.handleCheckOut(event)} type='submit' appearance='primary' block>Checkout</Button> */}

                            <Button style={{marginTop:8}} onClick={()=> {this.cancel()}}  color='red' block>Cancel</Button>
                        </ButtonToolbar>
                       
                </Panel> 
                </Col>
                </Row>
                </Grid>
   </div>
  
        )
    }
}


export default Product