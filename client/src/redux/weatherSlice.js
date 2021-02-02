import { combineReducers } from 'redux';
import { WEATHER_API_REQUEST, WEATHER_API_REQUEST_SUCCESS, WEATHER_API_REQUEST_FAILURE } from './actionTypes';

// initial state
const initialState = {
  isFetching: true,
  ids: [],
  errorMsg: null,
};

/* reducer corresponding to fetching weather data */
const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case WEATHER_API_REQUEST:
      return computeState(state, action.payload);
    case WEATHER_API_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMsg: null,
        id: action.payload.id,
        [action.payload.id]: { ...state[action.payload.id], ...action.payload },
      };
    case WEATHER_API_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMsg: action.payload.errorMsg,
        id: action.payload.id,
        [action.payload.id]: { ...state[action.payload.id], ...action.payload },
      };
    default:
      return state;
  }
};

/* helper function to handle recent searches
 - keep track only 5 recent ids
 - keep weather data of only those 5 ids
  */
const computeState = (oldState, newId) => {
  let newIds = [];
  let newState = {};

  if (oldState.ids.length === 5) {
    const key = oldState[oldState.ids[0]].id;
    const { [key]: value, ...rest } = oldState;
    newState = rest;
    newIds = newState.ids.slice(1, newState.ids.length);
  } else {
    newState = oldState;
    newIds = oldState.ids;
  }

  newIds = newIds.includes(newId) ? [...newIds.filter((item) => item != newId), newId] : [...newIds, newId];

  return {
    ...newState,
    isFetching: true,
    errorMsg: null,
    ids: newIds,
    id: newId,
    [newId]: { ...newState[newId], id: newId },
  };
};

export default weatherReducer;
