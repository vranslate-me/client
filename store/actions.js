import * as types from './actionTypes'
import axios from 'axios'

export function dbFetchScore() {
  return async (dispatch) => {
    dispatch(loading())
    const { data } = await axios({
      url: 'https://31d06abb.ngrok.io/scores',
      method: 'get'
    })

    const Room = data.filter(e => e.level === 1);
    const Beach = data.filter(e => e.level === 2);

    const scores = {
      Room,
      Beach
    }

    dispatch(dbFetchScoreSuccess(scores))
  }
}

export function dbAddScore(data, history) {
  return (dispatch) => {
    dispatch(loading())
    axios.post('https://31d06abb.ngrok.io/scores', {
      ...data
    })
    .then(({ data }) => {
      dispatch(dbAddScoreSuccess())
      history.push('/')
    })
    .catch(err => {
      dispatch(error(err.message))
    })
  }
}

export function inputName(name) {
  return (dispatch) => {
    dispatch(loading())
    dispatch(inputNameSuccess(name))
  }
}

export function setLanguage(language) {
  return (dispatch) => {
    dispatch(loading())
    dispatch(setLanguageSuccess(language))
  }
}

function setLanguageSuccess(language) {
  return {
    type: types.SET_LANGUAGE_SUCCESS,
    language
  }
}

function loading() {
  return {
    type: types.LOADING
  }
}

function inputNameSuccess(name) {
  return {
    type: types.INPUT_NAME_SUCCESS,
    name
  }
}

function dbFetchScoreSuccess(scores) {
  return {
    type: types.DB_FETCH_SCORE_SUCCESS,
    scores
  }
}

function dbAddScoreSuccess() {
  return {
    type: types.DB_ADD_SCORE_SUCCESS
  }
}

function error(error) {
  return {
    type: types.ERROR,
    error
  }
}