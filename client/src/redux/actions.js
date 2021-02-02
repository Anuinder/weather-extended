import {
  DETAIL_CARD_CLOSE,
  DETAIL_CARD_OPEN,
  WEATHER_API_REQUEST,
  WEATHER_API_REQUEST_SUCCESS,
  WEATHER_API_REQUEST_FAILURE,
} from './actionTypes';
import { fetchPlaceCoordinates, fetchReverseGeocode, fetchWeatherDataApi } from '../utils/apiRequests.js';

// action creators
const onDetailCardClose = () => ({
  type: DETAIL_CARD_CLOSE,
});

const onDetailCardOpen = (id) => ({
  type: DETAIL_CARD_OPEN,
  payload: id,
});

const onWeatherApiRequest = (id) => ({
  type: WEATHER_API_REQUEST,
  payload: id,
});

const onWeatherApiRequestSuccess = (id, selectedOption, weather) => ({
  type: WEATHER_API_REQUEST_SUCCESS,
  payload: {
    id,
    ...selectedOption,
    ...weather,
  },
});

const onWeatherApiRequestFailure = (id, err) => ({
  type: WEATHER_API_REQUEST_FAILURE,
  payload: {
    id,
    errorMsg: err.message || 'An error occured while fetching the data',
  },
});

// thunk function
const fetchWeatherData = (selectedOption, position) => async (dispatch) => {
  // when reverse geocode needed
  if (selectedOption === null) {
    const { id, city, state, country } = await fetchReverseGeocode(position);
    selectedOption = { id: id, city: city, state: state, country: country };
  }
  // when geocode needed
  if (position === null) {
    const { lat, lng } = await fetchPlaceCoordinates(selectedOption.id);
    position = { lat: lat, lng: lng };
  }

  dispatch(onWeatherApiRequest(selectedOption.id));
  try {
    const weather = await fetchWeatherDataApi(position);
    dispatch(onWeatherApiRequestSuccess(selectedOption.id, selectedOption, weather));
  } catch (err) {
    dispatch(onWeatherApiRequestFailure(selectedOption.id, err));
  }
};

export { onDetailCardClose, onDetailCardOpen, fetchWeatherData };
