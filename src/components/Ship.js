import React from 'react';
import PropTypes from 'prop-types';
import calcPosition from '../util/calcPosition';

const Ship = (props) => {
  const offsets = calcPosition(props.cellSize, props.locations[0]);
  let height;
  let width;
  if (props.direction === 'vertical') {
    height = props.cellSize * props.size;
    width = props.cellSize;
  }
  if (props.direction === 'horizontal') {
    height = props.cellSize;
    width = props.cellSize * props.size;
  }

  const style = {
    top: offsets[0],
    left: offsets[1],
    height: height,
    width: width
  };
  return (
    <div className="ship" style={style}></div>
  );
};

Ship.propTypes = {
  name: PropTypes.string.isReq,
  size: PropTypes.number.isReq,
  direction: PropTypes.oneOf(['vertical', 'horizontal']).isReq,
  damage: PropTypes.array,
  locations: PropTypes.array,
  cellSize: PropTypes.number
};

export default Ship;
