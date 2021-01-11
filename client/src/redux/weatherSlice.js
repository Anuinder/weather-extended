import { WEATHER_API_REQUEST, WEATHER_API_REQUEST_SUCCESS, WEATHER_API_REQUEST_FAILURE } from './actionTypes';

// initial state
const initialState = {};

// reducer
const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'WEATHER_API_REQUEST':
      return {
        ...state,
        [action.id]: { ...state[action.id], id: action.id, isFetching: true },
      };
    case 'WEATHER_API_REQUEST_SUCCESS':
      return {
        ...state,
        [action.response.id]: { ...state[action.response.id], ...action.response, isFetching: false },
      };
    case 'WEATHER_API_REQUEST_FAILURE':
      return {
        ...state,
        action,
      };
    default:
      return state;
  }
};

export default weatherReducer;
