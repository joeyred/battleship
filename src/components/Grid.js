import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Grid extends Component {
  static propTypes = {
    dimensions: PropTypes.array.isReq,
    height: PropTypes.number,
    width: PropTypes.number
  }

  getGridTemplateValue(quantity) {
    let output;
    let valueArray = [];
    for (let i = 0; i < quantity; i++) {
      valueArray.push('1fr')
    }
    return valueArray.join(' ');
  }
  render() {
    const cssGridProps = {
      display: 'grid',
      gridTemplateColumns: this.getGridTemplateValue(this.props.dimensions[0]),
      gridTemplateRows: this.getGridTemplateValue(this.props.dimensions[1]),
      height: this.props.height,
      width: this.props.width
    }
    return (
      <div className="grid" style={cssGridProps}>
        {this.props.children}
      </div>
    );
  }
}
