// FontAwesoneIcon - Magnifying Glass, Cross in Circle, Location Pin
import { faSearch as SearchIcon } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle as CloseIcon } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt as LocationIcon } from '@fortawesome/free-solid-svg-icons';

// weather Icons
import CloudIcon from './icons/clouds.svg';
import HumidityIcon from './icons/humidity1.svg';
import PressureIcon from './icons/pressure.svg';
import SunriseIcon from './icons/sunrise.svg';
import SunsetIcon from './icons/sunset.svg';
import UviIcon from './icons/uvi.svg';
import VisibilityIcon from './icons/visible.svg';
import WindIcon from './icons/wind.png';

// icon based on openweather api codes:https://openweathermap.org/weather-conditions#Icon-list
import ClearSky from './icons/clearsky.png';
import FewClouds from './icons/fewclouds.png';
import ScatteredClouds from './icons/clouds.svg';
import BrokenClouds from './icons/brokenclouds.svg';
import ShowerRain from './icons/showerrain.png';
import Rain from './icons/rain.png';
import Thunderstorm from './icons/thunder.png';
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
