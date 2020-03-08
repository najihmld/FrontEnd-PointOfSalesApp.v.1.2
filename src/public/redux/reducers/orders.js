const initialState = {
  listOrders: [],
  isLoading: true,
  isRejected: false,
  isFulfilled: false
}

//Insert initial state
const orders = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_ORDERS_PENDING': 
    return {
      ...state,
      isLoading: true,
      isRejected: false,
      isFulfilled: false
    }

    case 'GET_ORDERS_REJECTED': 
    return {
      ...state,
      isLoading: false,
      isRejected: true
    }

    case 'GET_ORDERS_FULFILLED': 
    return {
      ...state,
      isLoading: false,
      isFulfilled: true,
      listOrders: action.payload.data.data
    }

    default: return state;
  }
}

export default orders;


