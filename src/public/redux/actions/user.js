import axios from 'axios'


export const getUser = () => {
  return {
    type: 'GET_USER',
    payload: axios.get(`${process.env.REACT_APP_API_HOST}/users`)
  }
}

// export const postCategory = (form) => {
//   return {
//     type: 'POST_USER',
//     payload: axios.post(`${process.env.REACT_APP_API_HOST}/users`, form)
//   }
// }

export const patchUser = (idUser, newValue) => {
  return {
    type: 'PATCH_USER',
    payload: axios.patch(`${process.env.REACT_APP_API_HOST}/users/${idUser}`, newValue)
  }
}

export const deleteUser = (event, idUser) => {
  return {
    type: 'DELETE_USER',
    payload: axios.delete(`${process.env.REACT_APP_API_HOST}/users/${idUser}`, event)
  }
}