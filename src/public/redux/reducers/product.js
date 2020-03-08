const initialState = {
  listProduct: [],
  isLoading: true,
  isRejected: false,
  isFulfilled: false
}

//Insert initial state
const product = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_PRODUCT_PENDING': 
    return {
      ...state,
      isLoading: true,
      isRejected: false,
      isFulfilled: false
    }

    case 'GET_PRODUCT_REJECTED': 
    return {
      ...state,
      isLoading: false,
      isRejected: true
    }

    case 'GET_PRODUCT_FULFILLED': 
    return {
      ...state,
      isLoading: false,
      isFulfilled: true,
      listProduct: action.payload.data.data
    }

    case 'POST_PRODUCT_PENDING': 
    return {
      ...state,
      isLoading: true,
      isRejected: false,
      isFulfilled: false
    }

    case 'POST_PRODUCT_REJECTED': 
    return {
      ...state,
      isLoading: false,
      isRejected: true
    }

    case 'POST_PRODUCT_FULFILLED': 
    if(action.payload.data.status === 200) {
      state.listProduct.push
      (action.payload.data.data)
    }
    return {
      ...state,
      isLoading: false,
      isRejected: true,
      listProduct: state.listProduct
    }

    case 'DELETE_PRODUCT_PENDING': 
    return {
      ...state,
      isLoading: true,
      isRejected: false,
      isFulfilled: false
    }

    case 'DELETE_PRODUCT_REJECTED': 
    return {
      ...state,
      isLoading: false,
      isRejected: true
    }

    case 'DELETE_PRODUCT_FULFILLED': 
    return {
      ...state,
      isLoading: false,
      isFulfilled: true,
      listProduct: state.listProduct
    }
    
    default: return state;
  }
}

export default product;


