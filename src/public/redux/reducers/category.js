const initialState = {
  listCategory: [],
  isLoading: true,
  isRejected: false,
  isFulfilled: false
}

//Insert initial state
const category = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_CATEGORY_PENDING': 
    return {
      ...state,
      isLoading: true,
      isRejected: false,
      isFulfilled: false
    }

    case 'GET_CATEGORY_REJECTED': 
    return {
      ...state,
      isLoading: false,
      isRejected: true
    }

    case 'GET_CATEGORY_FULFILLED': 
    let datas = []
    action.payload.data.data.map((item, index) => {
      datas.push({value: item.id, label: item.name})
    })
    return {
      ...state,
      isLoading: false,
      isFulfilled: true,
      listCategory: datas
    }

    case 'DELETE_CATEGORY_PENDING': 
    return {
      ...state,
      isLoading: true,
      isRejected: false,
      isFulfilled: false
    }

    case 'DELETE_CATEGORY_REJECTED': 
    return {
      ...state,
      isLoading: false,
      isRejected: true
    }

    case 'DELETE_CATEGORY_FULFILLED': 
      return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          listCategory: state.listCategory
      }
    default: return state;
  }
}

export default category;


