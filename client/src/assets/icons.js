// FontAwesoneIcon - Magnifying Glass, Cross in Circle, Location Pin
import { faSearch as SearchIcon } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle as CloseIcon } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt as LocationIcon } from '@fortawesome/free-solid-svg-icons';

// weather Icons
import CloudIcon from './icons/pressure.svg';
import HumidityIcon from './icons/humidity1.svg';
import PressureIcon from './icons/pressure.svg';
import SunriseIcon from './icons/sunrise.svg';
import SunsetIcon from './icons/sunset.svg';
import UviIcon from './icons/pressure.svg';
import VisibilityIcon from './icons/visible.svg';
import WindIcon from './icons/wind.svg';

// icon based on openweather api codes:https://openweathermap.org/weather-conditions#Icon-list
import ClearSky from './icons/01n@2x.png';
import FewClouds from './icons/02n@2x.png';
import ScatteredClouds from './icons/03n@2x.png';
import BrokenClouds from './icons/04n@2x.png';
import ShowerRain from './icons/09n@2x.png';
import Rain from './icons/10n@2x.png';
import Thunderstorm from './icons/11n@2x.png';
import Snow from './icons/13n@2x.png';
import Mist from './icons/50n@2x.png';

const mapCodeToIcon = {
  '01n': ClearSky,
  '01d': ClearSky,
  '02d': FewClouds,
  '02n': FewClouds,
  '03d': ScatteredClouds,
  '03n': ScatteredClouds,
  '04d': BrokenClouds,
  '04n': BrokenClouds,
  '09d': ShowerRain,
  '09n': ShowerRain,
  '10d': Rain,
  '10n': Rain,
  '11d': Thunderstorm,
  '11n': Thunderstorm,
  '13d': Snow,
  '13n': Snow,
  '50d': Mist,
  '50n': Mist,
};

// Fetch iconName based on openweather api codes
const getOpenWeatherIcons = (iconCode) => {
  return mapCodeToIcon[iconCode];
};

export {
  SearchIcon,
  CloseIcon,
  LocationIcon,
  VisibilityIcon,
  WindIcon,
  CloudIcon,
  HumidityIcon,
  PressureIcon,
  SunriseIcon,
  SunsetIcon,
  UviIcon,
  getOpenWeatherIcons,
};
