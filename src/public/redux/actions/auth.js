import axios from 'axios';
import qs from 'qs';

export const requestLogin = (body) => {
  return {
    type: 'POST_LOGIN',
    payload: axios.post(`${process.env.REACT_APP_API_HOST}/auth/login`,
    qs.stringify(body))
  }
}