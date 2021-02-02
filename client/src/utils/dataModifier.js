import moment from 'moment';

import {
  TEMPERATURE,
  PRESSURE,
  HUMIDITY,
  CLOUDY,
  VISIBILITY,
  WIND_SPEED,
  UV_INDEX,
  RAIN,
  SNOW,
  PRECP_PERC,
} from './weatherparameter.js';

// extract time
const getDate = (time) => moment.unix(time).format("D MMMM'YY"); //28 January'20
const getDateTime = (time) => moment.unix(time).format("kk-dd,D MM'YY"); //19:12-Thu,28 Jan'21
const getDay = (time) => moment.unix(time).format('dddd'); // Thursday
const getTime24Hour = (time) => moment.unix(time).format('kk'); // 19:12
const getTime12Hour = (time) => moment.unix(time).format('LT'); // 8:30 PM

// if Today or Tomorrow, else Mon Tue format
const getDayThisWeek = (time) => {
  if (moment.unix(time).isSame(Date.now(), 'day')) return 'Today';
  if (moment.unix(time).isSame(moment().add(1, 'days'), 'day')) return 'Tommo';
  return moment.unix(time).format('dd');
};

// units based on api doc
const openWeatherUnitsList = {
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

export { getDate, getDateTime, getDay, getTime24Hour, getTime12Hour, getDayThisWeek, openWeatherUnitsList };
