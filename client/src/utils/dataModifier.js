import moment from 'moment';

// weather parameters used in Application
export const TEMPERATURE = 'Temperature';
export const PRESSURE = 'Pressure';
export const HUMIDITY = 'Humidity';
export const CLOUDY = 'Cloudy';
export const VISIBILITY = 'Visibility';
export const WIND_SPEED = 'Wind';
export const UV_INDEX = 'UVI';
export const RAIN = 'Rain';
export const SNOW = 'Snow';
export const PRECP_PERC = 'Precipitation';

// extract time
export const getDate = (time) => moment.unix(time).format("D MMMM'YY"); //28 January'20
export const getDateTime = (time) => moment.unix(time).format("kk-dd,D MM'YY"); //19:12-Thu,28 Jan'21
export const getDay = (time) => moment.unix(time).format('dddd'); // Thursday
export const getTime24Hour = (time) => moment.unix(time).format('kk'); // 19:12
export const getTime12Hour = (time) => moment.unix(time).format('LT'); // 8:30 PM

// if Today or Tomorrow, else Mon Tue format
export const getDayThisWeek = (time) => {
  if (moment.unix(time).isSame(Date.now(), 'day')) return 'Today';
  if (moment.unix(time).isSame(moment().add(1, 'days'), 'day')) return 'Tomorrow';
  return moment.unix(time).format('dd');
};

// units based on api doc
export const openWeatherUnitsList = {
  TEMPERATURE: 'C',
  PRESSURE: 'hpa',
  HUMIDITY: '%',
  CLOUDY: '%',
  VISIBILITY: 'm',
  WIND_SPEED: 'm/s',
  SNOW: 'mm',
  RAIN: 'mm',
  PRECP_PERC: '%',
  UV_INDEX: '',
};
