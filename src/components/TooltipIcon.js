import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TooltipIcon(props) {
  
  let tooltipStyle = {
      left: props.left? props.left + 'px' : '50%',
      top: props.top?props.top + 'px' : '50%',
  };
  return (
    <React.Fragment>
      <button style={tooltipStyle} className="tooltip-icon" tooltip={props.message}>
        <FontAwesomeIcon icon="hand-point-up" />
    </button>
    </React.Fragment>
  )
}
