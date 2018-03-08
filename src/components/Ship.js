import React from 'react';
import PropTypes from 'prop-types';
// import calcPosition from '../util/calcPosition';

import locationsToCssGrid from '../util/locationsToCssGrid';

const Ship = (props) => {
  const gridProps = locationsToCssGrid(props.locations);
  const style = {
    gridArea: gridProps
  };
  return (
    <div className={`ship ${props.name}`} style={style}></div>
  );
};

Ship.propTypes = {
  name: PropTypes.string.isRequired,
  // size: PropTypes.number.isReq,
  // direction: PropTypes.oneOf(['vertical', 'horizontal']).isReq,
  // damage: PropTypes.array,
  locations: PropTypes.array,
  // cellSize: PropTypes.number
};

export default Ship;
