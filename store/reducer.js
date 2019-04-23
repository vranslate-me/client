import * as types from './actionTypes'

const initialState = {
  loading: false,
  name: '',
  error: null
}

export default chat = (state = initialState, action) => {
  switch(action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: true
      }
    case types.INPUT_NAME_SUCCESS:
      return {
        ...state,
        name: action.name,
        loading: false
      }
    case types.DB_ADD_SCORE_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case types.ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state
  }
}
