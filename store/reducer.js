import * as types from './actionTypes'

const initialState = {
  loading: false,
  name: '',
  language: 'id',
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
    case types.SET_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        language: action.language
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
