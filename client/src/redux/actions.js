import axios from 'axios';

import {
  DETAIL_CARD_CLOSE,
  DETAIL_CARD_OPEN,
  WEATHER_API_REQUEST,
  WEATHER_API_REQUEST_SUCCESS,
  WEATHER_API_REQUEST_FAILURE,
} from './actionTypes';

// helper functions
const fetchWeatherDataApi = async (url1) => {
  const url = 'https://jsonplaceholder.typicode.com/users/' + url1;
  const response = await axios.get(url);
  const { id, name, username, email } = response.data;
  return {
    id,
    name,
    username,
    email,
  };
};

// action creators
const onDetailCardClose = () => ({
  type: DETAIL_CARD_CLOSE,
});

const onDetailCardOpen = () => ({
  type: DETAIL_CARD_OPEN,
});

const onWeatherApiRequest = (id) => ({
  type: WEATHER_API_REQUEST,
  payload: id,
});

const onWeatherApiRequestSuccess = (id, response, selectedOption = {}) => ({
  type: WEATHER_API_REQUEST_SUCCESS,
  payload: {
    id,
    ...response,
    ...selectedOption,
  },
});

const onWeatherApiRequestFailure = (id, err, selectedOption) => ({
  type: WEATHER_API_REQUEST_FAILURE,
  payload: {
    id,
    selectedOption,
    errorMsg: err.Message || 'There was problem in fetching data!',
  },
});

// thunk - action creators , returns function
const fetchWeatherData = (selectedOption) => async (dispatch) => {
  // request has been send
  dispatch(onWeatherApiRequest(selectedOption.id));
  try {
    const response = await fetchWeatherDataApi(selectedOption.id);
    dispatch(onWeatherApiRequestSuccess(selectedOption.id, response, selectedOption));
  } catch (err) {
    dispatch(onWeatherApiRequestFailure(selectedOption.id, err, selectedOption));
  }
  console.log('done!!');
};

export { onDetailCardClose, onDetailCardOpen, fetchWeatherData };
