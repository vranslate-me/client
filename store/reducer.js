import * as types from './actionTypes'

const initialState = {
  loading: false,
  name: 'a',
  language: 'id',
  languageName: 'Indonesia',
  scores: {
    Room: [],
    Beach: []
  },
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
    case types.DB_FETCH_SCORE_SUCCESS:
      return {
        ...state,
        scores: action.scores,
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
        language: action.language.code,
        languageName: action.language.name
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
