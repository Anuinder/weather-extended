import axios from 'axios';
const { REACT_APP_HERE_MAP_API_KEY, REACT_APP_OPEN_WEATHER_API_KEY } = process.env;

/* fetch options for place- city details for place name */
const fetchPlaceSuggestionsApi = async (place) => {
  if (place.length === 0) return [];

  const url =
    'https://autocomplete.search.hereapi.com/v1/autocomplete?q=' +
    place +
    '&limit=5&apiKey=' +
    REACT_APP_HERE_MAP_API_KEY;

  try {
    const response = await axios.get(url);
    console.log('REQUEST FOR SUGGESTION');
    const options = response.data.items.map((option) => {
      const item = {
        id: option.id,
        city:
          option.address.city ||
          option.address.district ||
          option.address.county ||
          option.address.state ||
          option.address.countryName,
        state: option.address.state || option.address.countryName,
        country: option.address.countryName,
      };
      return item;
    });
    return options;
  } catch (err) {
    return err;
  }
};

/* fetch coordinates for a place- position for id */
const fetchPlaceCoordinates = async (placeid) => {
  console.log('REQUEST FOR COORDINATES');
  const url = 'https://lookup.search.hereapi.com/v1/lookup?id=' + placeid + '&apiKey=' + REACT_APP_HERE_MAP_API_KEY;
  const response = await axios.get(url);
  const { lat, lng } = response.data.position;
  return { lat, lng };
};

/* fetch reverse geocode for a place- city details for position */
const fetchReverseGeocode = async (position) => {
  const url =
    'https://revgeocode.search.hereapi.com/v1/revgeocode?at=' +
    position.lat +
    ',' +
    position.lng +
    '&lang=en-US&apiKey=' +
    REACT_APP_HERE_MAP_API_KEY;

  const response = await axios.get(url);
  const { id, address } = response.data.items[0];
  return {
    id,
    city: address.city || address.district || address.county || address.state || address.countryName,
    state: address.state || address.countryName,
    country: address.countryName,
  };
};

/* fetch weather data for a place- weather data for position */
const fetchWeatherDataApi = async (position) => {
  console.log('REQUEST FOR DATA');
  const url =
    'https://api.openweathermap.org/data/2.5/onecall?lat=' +
    position.lat +
    '&lon=' +
    position.lng +
    '&exclude=minutely,alerts&lang=en&units=metric&appid=' +
    REACT_APP_OPEN_WEATHER_API_KEY;

  const response = await axios.get(url);

  console.log(response.data);
  const { lat, lon, current, hourly, daily } = response.data;
  if (daily.length > 5) daily.length = 5;
  if (hourly.length > 7) hourly.length = 7;
  return {
    lat,
    lon,
    current,
    hourly,
    daily,
  };
};

export { fetchPlaceSuggestionsApi, fetchPlaceCoordinates, fetchReverseGeocode, fetchWeatherDataApi };
