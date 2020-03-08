import axios from 'axios'

export const getProduct = () => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get('http://127.0.0.1:3001/products')
  }
}

export const postProduct = (form) => {
  return {
    type: 'POST_PRODUCT',
    payload: axios.post('http://127.0.0.1:3001/products', form)
  }
}

export const patchProduct = (form) => {
  return {
    type: 'PATCH_PRODUCT',
    payload: axios.patch(`http://127.0.0.1:3001/products/${form.id}`, form)
  }
}

export const deleteProduct = (event, idProduct) => {
  return {
    type: 'DELETE_PRODUCT',
    payload: axios.delete(`http://127.0.0.1:3001/products/${idProduct}`, event)
  }
}