import React from 'react';

import DetailTile from './detailtile.js';

const InfoCard = (props) => {
  const { heading, data, styles } = props;
  return (
    <>
      <span className={styles.heading}>{heading}</span>
      {data.map((obj, index) => (
        <DetailTile
          key={index}
          heading={obj.heading}
          data={obj.data}
          styles={styles.tile}
          handleClick={() => props.handleClick(obj.id)}
        />
      ))}
    </>
  );
};

export default InfoCard;
