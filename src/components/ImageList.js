import React, { Component } from 'react';
import TooltipIcon from "./TooltipIcon";

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
      <div className="container container-flex">
        {this.state.ImageList
          ?  this.state.ImageList.map( image => {
            return (
            <figure key={image.name}>
              <img src={image.src} width="500" alt={image.name} />
              <TooltipIcon left={image.tooltipX} top={image.tooltipY} message={image.tooltipMessage} />
              <figcaption>{image.name}</figcaption>
            </figure>
            )
          })
          : <h2>Your gallery is empty</h2>
        }    
      </div>
    )
  }
}
