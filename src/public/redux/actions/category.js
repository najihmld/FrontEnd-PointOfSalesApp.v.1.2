import axios from 'axios'


export const getCategory = () => {
  return {
    type: 'GET_CATEGORY',
    payload: axios.get(`${process.env.REACT_APP_API_HOST}/category`)
  }
}

export const postCategory = (form) => {
  return {
    type: 'POST_CATEGORY',
    payload: axios.post(`${process.env.REACT_APP_API_HOST}/category`, form)
  }
}

export const patchCategory = (idCategory, newValue) => {
  return {
    type: 'PATCH_CATEGORY',
    payload: axios.patch(`${process.env.REACT_APP_API_HOST}/${idCategory}`, newValue)
  }
}

export const deleteCategory = (event, idCategory) => {
  return {
    type: 'DELETE_CATEGORY',
    payload: axios.delete(`${process.env.REACT_APP_API_HOST}/category/${idCategory}`, event)
  }
}