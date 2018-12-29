import React, { Component } from 'react';
import './App.css';
import LocalStorageSaver from "./components/LocalStorageSaver";
import Navbar from "./components/Navbar";
import ImageList from "./components/ImageList";
import Footer from "./components/Footer";
// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHandPointUp, faCamera } from '@fortawesome/free-solid-svg-icons';
library.add(faHandPointUp, faCamera);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whatToRender: 'ImageList'
    }
  }

  toggleRender = (componentName) => {
    this.setState({
      whatToRender: componentName
    })
  }

  render() {
    switch (this.state.whatToRender) {
      case 'ImageList':
        return (
          <div>
            <Navbar toggleRender={this.toggleRender} buttonLink={'LocalStorageSaver'} buttonText={'Upload New Photo'} />
            <ImageList />
            <footer></footer>
          </div>
        )
      case 'LocalStorageSaver':
      return (
        <div>
          <Navbar toggleRender={this.toggleRender} buttonLink={'ImageList'} buttonText={'Photo Album'} />
          <LocalStorageSaver />
          <Footer />
        </div>
      )
      default:
        return (
            <div className="Error">
              <h1>404</h1>
            </div>
          );
    }
  }
}

export default App;
