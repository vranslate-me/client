import * as types from './actionTypes'
import axios from 'axios'

export function dbAddScore(name, score, level) {
  return (dispatch) => {
    dispatch(loading())
    axios.post('http://localhost:3000/scores', {
      name,
      score,
      level
    })
    .then(({ data }) => {
      dispatch(dbAddScoreSuccess())
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