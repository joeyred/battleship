import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SquareCellGrid extends Component {
  static propTypes = {
    dimensions: PropTypes.array.isReq,
  }
  constructor(props) {
    super(props);
    this.state = {
      width: null
    };
  }

  measure() {
    const {clientWidth} = this.refs.squareCellGrid;

    this.setState({
      width: clientWidth
    });
  }

  componentDidMount() {
    this.measure();
  }

  componentDidUpdate() {
    this.measure();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.width !== nextState.width
    );
  }
  getGridTemplateValue(quantity) {
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
      height: this.state.width,
    }
    return (
      <div className="grid" ref="squareCellGrid" style={cssGridProps}>
        {this.props.children}
      </div>
    );
  }
}
