import axios from 'axios'

export const getProduct = () => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get(`${process.env.REACT_APP_API_HOST}/products`)
  }
}

export const postProduct = (form) => {
  return {
    type: 'POST_PRODUCT',
    payload: axios.post(`${process.env.REACT_APP_API_HOST}/products`, form)
  }
}

export const patchProduct = (form) => {
  return {
    type: 'PATCH_PRODUCT',
    payload: axios.patch(`${process.env.REACT_APP_API_HOST}/products/${form.id}`, form)
  }
}

export const deleteProduct = (event, idProduct) => {
  return {
    type: 'DELETE_PRODUCT',
    payload: axios.delete(`${process.env.REACT_APP_API_HOST}/products/${idProduct}`, event)
  }
}