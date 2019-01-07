import React, { Component } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Tooltip from "./Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import uuidv4 from "uuid/v4";

export default class PhotoSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      message: "My photo caption",
      imageName: null,
      imageSrc: null,
      tooltipX: 0,
      tooltipY: 0
    };
  }

  calculatePosition = (position) => {
    return window.innerWidth <= 530 
    ? position * 2 - 24
    : position - 24;
  }
  
  createStorageItem = (name, src, tooltipX, tooltipY, tooltipMessage) => {
    const key = uuidv4();
    return {
      id: key,
      name,
      src,
      tooltipX,
      tooltipY,
      tooltipMessage
    };
  };

  discardChanges = () => {
    this.setState({ selectedFile: null });
  };

  getCoordsClick = e => {
    let z = this.calculatePosition(e.nativeEvent.offsetX);
    let x = window.innerWidth <= 530 
      ? e.nativeEvent.offsetX * 2 - 24
      : e.nativeEvent.offsetX - 24;
    let y = window.innerWidth <= 530 
      ? e.nativeEvent.offsetY * 2 - 24
      : e.nativeEvent.offsetY - 24;
    console.log(x, y)
    this.setState({
      tooltipX: x,
      tooltipY: y
    });
  };
  
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  previewFile = e => {
    const file = e.target.files[0];
    const name = e.target.files[0].name;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        this.setState({
          selectedFile: file,
          imageName: name,
          imageSrc: reader.result
        });
      }, false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  saveToLocalStorage = item => {
    let array = [];
    if (localStorage.getItem("TooltipMakerImageList")) {
      array = JSON.parse(localStorage.getItem("TooltipMakerImageList"));
    }
    array.push(item);
    localStorage.setItem("TooltipMakerImageList", JSON.stringify(array));
  };

  submitImage = () => {
    const item = this.createStorageItem(
      this.state.imageName,
      this.state.imageSrc,
      this.state.tooltipX,
      this.state.tooltipY,
      this.state.message
    );
    this.saveToLocalStorage(item);
    this.props.history.push("/");
  };

  render() {
    return (
      <React.Fragment>
        <Navbar buttonLink={"/"} buttonText={"Photo Album"} />
        <div className="container">
          {this.state.selectedFile 
            ? (
                <React.Fragment>
                  <div className="alert">
                    <strong>Hint: </strong>click on image to position a tooltip.
                  </div>
                  <figure className="image-preview">
                    <img
                      src={this.state.imageSrc}
                      width="500"
                      alt="preview"
                      onClick={this.getCoordsClick}
                    />
                    <Tooltip
                      left={this.state.tooltipX}
                      top={this.state.tooltipY}
                      message={this.state.message}
                    />
                  </figure>
                  <div className="image-controls">
                    <div className="image-controls__block">
                      <label htmlFor="message">
                        <strong>Type tooltip text here: </strong>
                      </label>
                      <input
                        name="message"
                        type="text"
                        placeholder="Input tooltip text..."
                        value={this.state.message}
                        onChange={this.handleChange}
                      />
                    </div>
                    <button
                      onClick={this.submitImage}
                      className="remove-focus-outline"
                    >
                      Publish Photo <FontAwesomeIcon icon="camera" />
                    </button>
                    <div
                      onClick={this.discardChanges}
                      className="image-controls__footer"
                    >
                      or <span className="attention">discard changes</span>
                    </div>
                  </div>
                </React.Fragment>
          ) : (
                <React.Fragment>
                  <div className="alert">
                    <strong>Hint: </strong>to continue, please select a photo.
                  </div>
                  <input
                    type="file"
                    className="image-input remove-focus-outline"
                    onChange={this.previewFile}
                  />
                </React.Fragment>
              )}
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
