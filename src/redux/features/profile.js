const initialState = {
  user:{},
  loading: false,
  error: null
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'profile/load/pending':
      return {
        ...state,
        loading: true
      };
    case 'profile/load/fulfilled':
      return {
        ...state,
        loading: false,
        user: action.payload
      }
    case 'profile/load/rejected':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export const loadProfile = (id) => {
  return async (dispatch) => {
    dispatch({type: 'profile/load/pending'});
    try {
      const res = await fetch(`http://localhost:5000/user/${id}`)
      const data = await res.json()

      dispatch({type: 'profile/load/fulfilled', payload:data})
    }catch (e){
      dispatch({type: 'profile/load/rejected', payload: e})
    }
  }
}