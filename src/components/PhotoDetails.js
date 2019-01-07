import React, { Component } from 'react';
import Footer from "./Footer";
import Navbar from "./Navbar";
import Tooltip from "./Tooltip";

export default class PhotoDetails extends Component {
  constructor(props) {
      super(props);
      this.state = {
        photo: null
      };
  }
  
  deletePhoto(id) {
    if (localStorage.getItem('TooltipMakerImageList')) { 
      const localArray = JSON.parse(localStorage.getItem('TooltipMakerImageList'));
      let newLocalArray = localArray.filter( photo => photo.id !== id);
      localStorage.setItem('TooltipMakerImageList', JSON.stringify(newLocalArray));
      this.props.history.push('/');
    }
  }

  handleChange = e => {
    this.setState({ 
      photo: {
      ...this.state.photo,
      [e.target.name]: e.target.value
      }
    });
  }

  saveToLocalStorage = (item) => {
    let array = [];
    if (localStorage.getItem('TooltipMakerImageList')) {
      array = JSON.parse(localStorage.getItem('TooltipMakerImageList')); 
    }
    array.push(item);
    localStorage.setItem('TooltipMakerImageList', JSON.stringify(array));
  }

  submitChanges(id) {
    this.deletePhoto(id);
    const item = this.state.photo;
    this.saveToLocalStorage(item);
  }

  saveToLocalStorage = (item) => {
    let array = [];
    if (localStorage.getItem('TooltipMakerImageList')) {
      array = JSON.parse(localStorage.getItem('TooltipMakerImageList')); 
    }
    array.push(item);
    localStorage.setItem('TooltipMakerImageList', JSON.stringify(array));
  }

  getCoordsClick = (e) => {
    let x = e.nativeEvent.offsetX - 24;  
    let y = e.nativeEvent.offsetY - 24;
    this.setState({
      photo: {
        ...this.state.photo,
        tooltipX: x,
        tooltipY: y
      }
    })
  }

  initItemById = (id) => {
    if (localStorage.getItem('TooltipMakerImageList')) { 
      const localStorageArray = JSON.parse(localStorage.getItem('TooltipMakerImageList'));
      const photo = localStorageArray.filter( photo => photo.id === id);
      this.setState({
        photo: photo[0]
      });
    } 
  }

  componentDidMount() {
    this.initItemById(this.props.match.params.id);
  }  
  
  render() {
    return (
      <React.Fragment>
        <Navbar buttonLink={'/'} buttonText={'Photo Album'} />
        <div className="container">
          {this.state.photo
            ? <React.Fragment>
                <div className="alert">
                  <strong>Hint: </strong>click on image to re-position a tooltip.
                </div>
                <figure className="image-preview">
                  <img
                    src={this.state.photo.src}
                    width="500"
                    alt="preview"
                    onClick={this.getCoordsClick}
                  />
                  <Tooltip
                    left={this.state.photo.tooltipX}
                    top={this.state.photo.tooltipY}
                    message={this.state.photo.tooltipMessage}
                  />
                </figure>
                <div className="image-controls">
                  <div className="image-controls__block">
                    <input
                      name="tooltipMessage"
                      type="text"
                      placeholder="Input tooltip text..."
                      value={this.state.photo.tooltipMessage}
                      onChange={this.handleChange}
                    />
                  </div>
                  <button
                    onClick={() => this.submitChanges(this.state.photo.id)}
                    className="remove-focus-outline"
                  >
                    Save changes
                  </button>
                  <div className="image-controls__footer">
                    You also can&nbsp;
                      <span className="attention" onClick={() => this.initItemById(this.props.match.params.id)}>discard changes</span>
                      &nbsp;or&nbsp;
                      <span className="attention" onClick={() => this.deletePhoto(this.state.photo.id)}>delete photo</span>
                  </div>
                </div>
              </React.Fragment>
            : <h2>Loading...</h2>
          }    
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}


