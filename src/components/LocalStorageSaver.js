import React, { Component } from 'react';

export default class LocalStorageSaver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
      imageName: null,
      imageSrc: null,
      tooltipX: 0,
      tooltipY: 0
    }
  }

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  getCoordsClick = (e) => {
    let x = e.nativeEvent.offsetX;  
    let y = e.nativeEvent.offsetY;
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
        tooltipY: this.state.tooltipY
      }
      localStorageArray.push(localStorageItem);
      localStorage.setItem('TooltipMakerImageList', JSON.stringify(localStorageArray));
    // localStorage is empty
    } else {
      localStorageItem = {
        name: this.state.imageName,
        src: this.state.imageSrc,
        tooltipX: this.state.tooltipX,
        tooltipY: this.state.tooltipY
      }
      localStorageArray.push(localStorageItem);
      localStorage.setItem('TooltipMakerImageList', JSON.stringify(localStorageArray));
    }
  }

  render() {
    let tooltipStyle = {
      left: this.state.tooltipX + 'px',
      top: this.state.tooltipY + 'px'
    };
    return (
      <div className="container">
        <input type="file" onChange={this.previewFile} /><br />
        {this.state.selectedFile
          ? <React.Fragment>
              <p>Hint: Click on image to position a tooltip</p>
              <figure>
                <img src={this.state.imageSrc} width="500" alt="preview..." onClick={this.getCoordsClick} />
                <div style={tooltipStyle} className="tooltip">+</div>
              </figure>
              <br />
              <button onClick={this.SubmitImage}>Submit Image</button>
            </React.Fragment>
          : <p>To continue, please select an image.</p>
        }    
      </div>
    )
  }
}
