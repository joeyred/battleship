import React from 'react';
import PropTypes from 'prop-types';

import locationsToCssGrid from '../util/locationsToCssGrid';

const Marker = (props) => {
  const style = {
    gridArea: locationsToCssGrid(props.location)
  };
  return (
    <div className={props.classes} style={style}></div>
  );
}

Marker.Props = {
  type: PropTypes.string,
  classes: PropTypes.string,
  location: PropTypes.array
};

export default Marker;
