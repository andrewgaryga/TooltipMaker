import React, { Component } from 'react'

export default class ImageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: null,
      ImageList: null
    };
  }

  componentDidMount() {
    if (localStorage.getItem('TooltipMakerImageList')) { 
      let localStorageArray = JSON.parse(localStorage.getItem('TooltipMakerImageList'));
      this.setState({
        ImageList: localStorageArray
      })
    }
  }  
  render() {
    return (
      <div className="container">
        {this.state.ImageList
          ?  this.state.ImageList.map( image => {
            const tooltipStyle = {
              left: image.tooltipX + 'px',
              top: image.tooltipY + 'px'
            };
            return (
            <figure key={image.name}>
              <img src={image.src} width="500" alt="preview..." />
              <div style={tooltipStyle} className="tooltip">+</div>
            </figure>
            )
          })
          : 'loading...'
        }    
      </div>
    )
  }
}
