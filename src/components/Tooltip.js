import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipStyle: {
        top: '50%',
        left: '50%'
      }
    };
  }

  calculatePosition = (position) => {
    if (window.innerWidth <= 530) {
      return position ? (position + 24) / 2 - 24 + 'px' : '50%'
    }
    return position ? position + 'px' : '50%'
  }
  
  tooltipStyle = () => {
    this.setState({
      tooltipStyle: {
        left: this.calculatePosition(this.props.left),
        top: this.calculatePosition(this.props.top)
      }
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.tooltipStyle);
    this.tooltipStyle();
  }

  componentWillReceiveProps() {
    this.tooltipStyle();
    console.log("tooltip",this.state.tooltipStyle.left, this.state.tooltipStyle.top)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.tooltipStyle);
  }
  render() {
    return (
      <div>
        <React.Fragment>
          <button style={this.state.tooltipStyle} className="tooltip-icon" tooltip={this.props.message}>
            <FontAwesomeIcon icon="hand-point-up" />
        </button>
        </React.Fragment>
      </div>
    )
  }
}
