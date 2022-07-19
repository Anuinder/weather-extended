import React from 'react';

import IconCustom from './common/icons.js';
import Temperature from './temperature.js';
import { getDate } from '../utils/dataModifier.js';

const Summary = (props) => {
  const { place, temperature, date, icon, desc, styles } = props;
  return (
    <>
      <Temperature parameter={temperature} styles={styles.temperature} />
      <span className={styles.place}>{place} </span>
      <span className={styles.date}>{getDate(date)} </span>
      <IconCustom icon={icon} styles={styles.icon} />
      <span className={styles.maindesc}>{desc} </span>
    </>
  );
};

export default Summary;
