import React from 'react';
import className from '../css/style.css'
import {requestLogin} from '../public/redux/actions/auth'
import {getProduct} from '../public/redux/actions/product'
import {connect} from 'react-redux'
import axios from 'axios';
import qs from 'qs';

class Login extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleEmail = (event) => {
        let localEmail = event.target.value
        this.setState({
            email: localEmail
        })
    }

    handlePassword = (event) => {
        let localPassword = event.target.value
        this.setState({
            password: localPassword
        })
    }

    handleSubmitLogin = (event) => {
        event.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        if(this.state.email === '' && this.state.password === '') {
            alert("Username and password can't be empty")
        } else{
            // const {name, token, email} = this.props.auth.data
            // this.props.dispatch(requestLogin(data, token))
            axios.post('http://127.0.0.1:3001/auth/login', qs.stringify(data))
            .then(res => {
                // console.log(res);
                if(res.status === 200) {
                   this.props.setDataLogin(res.data.data)
                   this.props.history.push('/')
                } else{
                    console.log("Error")
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
 
    render() {
        return(
         <React.Fragment>          
        <div className="login-page">
        <div className="form">
            
            <form className="login-form">
            <h4 style={{marginBottom:30}}>Pikoco</h4>
            <input type='text' placeholder='username' onChange={(event) => this.handleEmail(event)} />
            <input type='password' placeholder='password' onChange={(event) => this.handlePassword(event)} />
            <button onClick={(event) => this.handleSubmitLogin(event)} type='submit'>Login</button>
            <p className="message">Not registered? <a href="http://127.0.0.1:3000/register">Create an account</a></p>
            </form>
        </div>
        </div>
        </React.Fragment> 

        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        product: state.product
    }
}

const mapDispatchToProps = dispatch => ({
    setDataLogin: payload => dispatch({
        type: 'POST_LOGIN_FULFILLED',
        payload
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)