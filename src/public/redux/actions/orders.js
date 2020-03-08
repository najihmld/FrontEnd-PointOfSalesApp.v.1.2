import axios from 'axios'

export const getOrders = () => {
  return {
    type: 'GET_ORDERS',
    payload: axios.get(`${process.env.REACT_APP_API_HOST}/orders`)
  }
}
