import React, { Component } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Tooltip from "./Tooltip";
import { Link } from "react-router-dom";
import uuidv4 from "uuid/v4";

export default class PhotosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: null,
      ImageList: null
    };
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

  fileToBase64 = async file => {
    return new Promise(resolve => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
          resolve(reader.result);
        }, false
      );
      reader.readAsDataURL(file);
    });
  };

  initLocalStorage = () => {
    if (localStorage.getItem("TooltipMakerImageList")) {
      let localStorageArray = JSON.parse(
        localStorage.getItem("TooltipMakerImageList")
      );
      this.setState({
        ImageList: localStorageArray
      });
    }
  };

  loadSimpleData = () => {
    this.urlToBase64(
      "https://dl.dropboxusercontent.com/s/iop3lv8jb4lmytz/2e45c6b5d92528c1a7f7909fbde5cd69.jpg"
    )
      .then(src => {
        const item = this.createStorageItem("fbde5cd69.jpg", src, 225, 215, "Kawai!");
        this.saveToLocalStorage(item);
        this.initLocalStorage();
      })
      .catch(reason => console.log(reason.message));
  };

  saveToLocalStorage = item => {
    let array = [];
    if (localStorage.getItem("TooltipMakerImageList")) {
      array = JSON.parse(localStorage.getItem("TooltipMakerImageList"));
    }
    array.push(item);
    localStorage.setItem("TooltipMakerImageList", JSON.stringify(array));
  };

  urlToBase64 = async url => {
    let file = await fetch(url).then(r => r.blob());
    if (file) {
      let base64 = await this.fileToBase64(file);
      return base64;
    }
  };

  componentDidMount() {
    this.initLocalStorage();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar buttonLink={"/new"} buttonText={"Upload New Photo"} />
        <div className="container container-flex">
          {this.state.ImageList && this.state.ImageList.length > 0 
            ? this.state.ImageList.map(image => {
                return (
                  <figure key={image.name}>
                    <img src={image.src} width="500" alt={image.name} />
                    <Tooltip
                      left={image.tooltipX}
                      top={image.tooltipY}
                      message={image.tooltipMessage}
                    />
                    <figcaption>
                      {image.name}
                      <Link to={`/photo/${image.id}`} className="link-normalize">
                        Edit
                      </Link>
                    </figcaption>
                  </figure>
                );
              })
            : <div>
                <h2>Your gallery is empty</h2>
                <div className="alert">
                    <strong>Hint: </strong>
                    if you do not know how this application works, you can load simple data.
                </div>
                <button onClick={this.loadSimpleData}>Load simple data</button>
              </div>
          }
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
