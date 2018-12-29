import React, { Component } from 'react';
import TooltipIcon from "./TooltipIcon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class LocalStorageSaver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      message: 'My photo caption',
      imageName: null,
      imageSrc: null,
      tooltipX: 0,
      tooltipY: 0
    }
  }

  discardChanges = () => {
    this.setState({ selectedFile: null });
  }

  handleChange = e => {
    console.log(e.target.name, e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  getCoordsClick = (e) => {
    console.log(this.state.message);
    let x = e.nativeEvent.offsetX - 24;  
    let y = e.nativeEvent.offsetY - 24;
    this.setState({
      tooltipX: x,
      tooltipY: y
    })
  }

  previewFile = (e) => {
    let file    = e.target.files[0];
    let name    = e.target.files[0].name;
    let reader  = new FileReader();
    reader.addEventListener("load", () => {
      this.setState({
        selectedFile: file,
        imageName: name,
        imageSrc: reader.result
      })
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }    
  }

  SubmitImage = () => {
    let localStorageItem = {};
    let localStorageArray =[];
    // localStorage already exsist
    if (localStorage.getItem('TooltipMakerImageList')) { 
      localStorageArray = JSON.parse(localStorage.getItem('TooltipMakerImageList'));
      localStorageItem = {
        name: this.state.imageName,
        src: this.state.imageSrc,
        tooltipX: this.state.tooltipX,
        tooltipY: this.state.tooltipY,
        tooltipMessage: this.state.message
      }
      localStorageArray.push(localStorageItem);
      localStorage.setItem('TooltipMakerImageList', JSON.stringify(localStorageArray));
    // localStorage is empty
    } else {
      localStorageItem = {
        name: this.state.imageName,
        src: this.state.imageSrc,
        tooltipX: this.state.tooltipX,
        tooltipY: this.state.tooltipY,
        tooltipMessage: this.state.message
      }
      localStorageArray.push(localStorageItem);
      localStorage.setItem('TooltipMakerImageList', JSON.stringify(localStorageArray));
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.selectedFile
          ? <React.Fragment>
              <div className="alert">
                <strong>Hint: </strong>click on image to position a tooltip.
              </div>
              <figure className="image-preview">
                <img src={this.state.imageSrc} width="500" alt="preview" onClick={this.getCoordsClick} />
                <TooltipIcon left={this.state.tooltipX} top={this.state.tooltipY} message={this.state.message} />
              </figure>
              <div className="image-controls">
                <div className="image-controls__block">
                  <label htmlFor="message">
                    <strong>Type tooltip text here: </strong>
                  </label>
                  <input name="message" type="text" placeholder="Input tooltip text..." value={this.state.message} onChange={this.handleChange} />
                </div>
                <button onClick={this.SubmitImage} className="remove-focus-outline">Publish Photo <FontAwesomeIcon icon="camera" /></button>
                <div onClick={this.discardChanges} className="image-controls__footer">or <span className="attention">discard changes</span></div>
              </div>
            </React.Fragment>
          : <React.Fragment>
              <div className="alert"><strong>Hint: </strong>to continue, please select a photo.</div>
              <input type="file" className="image-input remove-focus-outline" onChange={this.previewFile} />
            </React.Fragment>
        }    
      </div>
    )
  }
}
