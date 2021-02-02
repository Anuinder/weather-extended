import { openWeatherUnitsList } from '../utils/dataModifier.js';

const Temperature = (props) => (
  <span className={props.styles}>
    {props.parameter}&deg;{openWeatherUnitsList.TEMPERATURE}
  </span>
);

export default Temperature;
