import {combineReducers} from 'redux'
import auth from './auth'
import product from './product'
import category from './category'
import orders from './orders'
import user from './user'

export default combineReducers({
  auth,
  product,
  category,
  orders,
  user
})